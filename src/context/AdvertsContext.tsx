import { createContext, ReactNode, useState, useEffect } from 'react';
import { IOccupations, ICategory } from '../types/occupation-types';
import { IVisibleSubcategories, IQuery } from '../types/types';
import locationsData from '../data/regions-municipalities.json';
import occupationsData from '../data/occupation-groups.json';
import {
  addSelectedAndActiveKeys,
  updateActiveState,
  resetAllCategoriesAndSubCategories,
  resetSubCategoriesOfCategory,
  handleClickOnCategory,
  toggleSubcategoryActiveState,
} from '../utils/adsUtils';
import { getBaseCopy } from '../services/serviceBase';
import { IAd } from '../pages/searchPage/SearchResult';
import { DigiFormSelectCustomEvent } from '@digi/arbetsformedlingen/dist/types/components';

const AdvertsContext = createContext<IAdvertsContextValues | null>(null);

interface IAdvertsContextProviderProps {
  children: ReactNode;
  occupations: IOccupations;
}

interface IAdvertsContextValues {
  occupations: IOccupations;
  visibleMunicipalities: IVisibleSubcategories | null;
  visibleGroups: IVisibleSubcategories | null;
  regions: ICategory[];
  fields: ICategory[];
  occupationsQueries: string[];
  municipalitiesQueries: string[];
  ads: IAd[];
  drivingLicense: boolean;
  remoteWorkplace: boolean;
  totalAds: number;
  totalPositions: number;
  fetched: boolean;
  queries: IQuery[];
  setAds: (value: IAd[]) => void;
  createFilterParams: () => URLSearchParams;
  setDrivingLicense: (value: boolean) => void;
  setRemoteWorkplace: (value: boolean) => void;
  handleClickOnRegion: (taxonomyId: string) => void;
  handleClickOnMunicipality: (taxonomyId: string) => void;
  handleClickOnOccupationField: (taxonomyId: string) => void;
  handleClickOnOccupationGroup: (taxonomyId: string) => void;
  resetAllRegionsAndMunicipalities: () => void;
  resetAllFieldsAndGroups: () => void;
  resetMunicipalities: (regionId: string | null) => void;
  resetOccupationGroups: (fieldId: string | null) => void;
  changeSortingOnSelect: (
    e: DigiFormSelectCustomEvent<HTMLDigiFormSelectElement>
  ) => void;
}

const regionsData = addSelectedAndActiveKeys(locationsData.data.concepts);
const occupationFieldData = addSelectedAndActiveKeys(
  occupationsData.data.concepts
);

export const AdvertsContextProvider = ({
  children,
  occupations,
}: IAdvertsContextProviderProps) => {
  const [visibleMunicipalities, setVisibleMunicipalities] =
    useState<IVisibleSubcategories | null>(null);
  const [visibleGroups, setVisibleGroups] =
    useState<IVisibleSubcategories | null>(null);
  const [regions, setRegions] = useState<ICategory[]>(regionsData);
  const [fields, setFields] = useState<ICategory[]>(occupationFieldData);
  const [drivingLicense, setDrivingLicense] = useState<boolean>(false);
  const [remoteWorkplace, setRemoteWorkplace] = useState<boolean>(false);
  const [fetched, setFetched] = useState(false);
  const [ads, setAds] = useState<IAd[]>(occupations.hits);
  const [totalAds, setTotalAds] = useState(occupations.total.value);
  const [totalPositions, setTotalPositions] = useState(occupations.positions);

  // ----- QUERIES ----- //

  const [municipalitiesQueries, setmunicipalitiesQueries] = useState<string[]>(
    []
  );
  const [occupationsQueries, setoccupationsQueries] = useState<string[]>([]);
  const [queries, setQueries] = useState<IQuery[]>([
    { query: 'q=', value: '' },
    { query: 'sort=', value: '' },
  ]);

  /**
   * sets query value for the selected option when we sort occupations
   * refreshes and fetches new occupation data by using the new querystring
   * @param {DigiFormSelectCustomEvent<HTMLDigiFormSelectElement>} e
   */
  const changeSortingOnSelect = (
    e: DigiFormSelectCustomEvent<HTMLDigiFormSelectElement>
  ) => {
    const target = e.target as HTMLDigiFormSelectElement;
    const pickedOption = target.value;
    let sortValue = '';
    switch (pickedOption) {
      case 'Publiceringsdatum':
        sortValue = 'pubdate-desc';
        break;
      case 'Ansökningsdatum':
        sortValue = 'applydate-desc';
        break;
      case 'Relevans':
        sortValue = 'relevance';
        break;
    }

    const updatedQueries = queries.map((q) => {
      return q.query === 'sort=' ? { ...q, value: sortValue } : q;
    });

    const queryString = getQueryStringFromQueries(updatedQueries);
    setQueries(updatedQueries);
    refreshData(queryString);
  };

  /**
   * takes queries and puts them together to one query url string
   * @param {IQuery[]} queries
   * @returns {string} - url query endpoint
   */
  const getQueryStringFromQueries = (queries: IQuery[]): string => {
    return queries
      .map((q) => {
        return q.value ? `${q.query}${q.value}` : '';
      })
      .filter(Boolean)
      .join('&');
  };

  /**
   * uses query url and sends these as params and gets new occupation data
   * replaces old url history in browser with the new one using window.location
   * @param {string} queryString
   */
  const refreshData = (queryString: string) => {
    if (queryString) {
      const params = new URLSearchParams(queryString);
      getData(params);

      const newUrl = `${window.location.pathname}?${queryString}`;
      window.history.replaceState(null, '', newUrl);
    }
  };

  const handleClickOnRegion = (taxonomyId: string) => {
    handleClickOnCategory(
      taxonomyId,
      regions,
      setRegions,
      setVisibleMunicipalities
    );
  };

  const handleClickOnOccupationField = (taxonomyId: string) => {
    handleClickOnCategory(taxonomyId, fields, setFields, setVisibleGroups);
  };

  const handleClickOnMunicipality = (taxonomyId: string) => {
    setActiveSubCategories(taxonomyId, setmunicipalitiesQueries);
    setRegions((prevRegions) =>
      toggleSubcategoryActiveState(prevRegions, taxonomyId)
    );
  };

  const setActiveSubCategories = (
    taxonomyId: string,
    setSubCategories: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSubCategories((prevSubC) => {
      if (prevSubC.includes(taxonomyId)) {
        return prevSubC.filter((id) => id !== taxonomyId);
      } else {
        return [...prevSubC, taxonomyId];
      }
    });
  };

  const handleClickOnOccupationGroup = (taxonomyId: string) => {
    setActiveSubCategories(taxonomyId, setoccupationsQueries);
    setFields((prevFields) =>
      toggleSubcategoryActiveState(prevFields, taxonomyId)
    );
  };

  const resetAllRegionsAndMunicipalities = () => {
    resetAllCategoriesAndSubCategories(
      regions,
      setRegions,
      setmunicipalitiesQueries
    );
  };

  const getData = async (params: URLSearchParams | null) => {
    console.log('this is the params', params?.toString());

    try {
      const data = await getBaseCopy(params);
      setAds(data.hits);
      setTotalAds(data.total.value);
      setTotalPositions(data.positions);
      setFetched(true);
    } catch (error) {
      console.log('Error occured when fetching data', error);
      return;
    }
  };

  const createFilterParams = () => {
    const params = new URLSearchParams();

    if (drivingLicense) params.append('driving-license-required', 'true');
    if (remoteWorkplace) params.append('remote', 'true');

    return params;
  };

  const resetAllFieldsAndGroups = () => {
    resetAllCategoriesAndSubCategories(
      fields,
      setFields,
      setoccupationsQueries
    );
  };

  const resetMunicipalities = (regionId: string | null) => {
    resetSubCategoriesOfCategory(
      regionId,
      regions,
      setRegions,
      setmunicipalitiesQueries
    );
  };

  const resetOccupationGroups = (fieldId: string | null) => {
    resetSubCategoriesOfCategory(
      fieldId,
      fields,
      setFields,
      setoccupationsQueries
    );
  };

  // Create filter params after each change of remote workplace
  /*   useEffect(() => {
    const filterParams = createFilterParams();
    getData(filterParams);
  }, [remoteWorkplace]); */

  // Create filter params after each change of driving license
  /*  useEffect(() => {
    const filterParams = createFilterParams();
    getData(filterParams);
  }, [drivingLicense]);  */

  useEffect(() => {
    setFields(updateActiveState(fields));
    console.log('these are the queries for occupations: ', occupationsQueries);
  }, [occupationsQueries]);

  useEffect(() => {
    setRegions(updateActiveState(regions));
    console.log(
      'these are the queries for municipalities: ',
      municipalitiesQueries
    );
  }, [municipalitiesQueries]);

  const adsValues: IAdvertsContextValues = {
    queries,
    occupations,
    visibleMunicipalities,
    visibleGroups,
    regions,
    fields,
    occupationsQueries,
    municipalitiesQueries,
    totalAds,
    totalPositions,
    fetched,
    ads,
    drivingLicense,
    remoteWorkplace,
    setRemoteWorkplace,
    setDrivingLicense,
    handleClickOnMunicipality,
    handleClickOnRegion,
    handleClickOnOccupationField,
    handleClickOnOccupationGroup,
    resetAllRegionsAndMunicipalities,
    resetAllFieldsAndGroups,
    resetMunicipalities,
    resetOccupationGroups,
    setAds,
    createFilterParams,
    changeSortingOnSelect,
  };

  return (
    <AdvertsContext.Provider value={adsValues}>
      {children}
    </AdvertsContext.Provider>
  );
};

export default AdvertsContext;
