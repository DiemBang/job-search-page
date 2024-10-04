import { createContext, ReactNode, useState, useEffect, useRef } from 'react';
import {
  IOccupations,
  ICategory,
  IOccupation,
} from '../types/occupation-types';
import { IVisibleSubcategories, IQuery, IAdResponseData } from '../types/types';
import locationsData from '../data/regions-municipalities.json';
import occupationsData from '../data/occupation-groups.json';
import {
  addSelectedAndActiveKeys,
  updateActiveState,
  resetAllCategoriesAndSubCategories,
  resetSubCategoriesOfCategory,
  handleClickOnCategory,
  toggleSubcategoryActiveState,
  setActiveSubCategories,
} from '../utils/adsUtils';
import { getBase } from '../services/serviceBase';
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
  ads: IOccupation[];
  totalAds: number;
  totalPositions: number;
  queries: IQuery[];
  setAds: (value: IOccupation[]) => void;
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
  toggleAllOccupationGroups: (fieldId: string | null) => void;
  changeDrivingLicenseReq: (filterValue: boolean) => void;
  changeToRemoteWorkplace: (filterValue: boolean) => void;
  handleClickOnSearch: (searchInput: string) => void;
}

const regionsData = addSelectedAndActiveKeys(locationsData.data.concepts);
const occupationFieldData = addSelectedAndActiveKeys(
  occupationsData.data.concepts
);

const BASE_URL = 'https://jobsearch.api.jobtechdev.se/search?offset=0&limit=20';

export const AdvertsContextProvider = ({
  children,
  occupations,
}: IAdvertsContextProviderProps) => {
  const initialRender = useRef(true);
  const [visibleMunicipalities, setVisibleMunicipalities] =
    useState<IVisibleSubcategories | null>(null);
  const [visibleGroups, setVisibleGroups] =
    useState<IVisibleSubcategories | null>(null);
  const [regions, setRegions] = useState<ICategory[]>(regionsData);
  const [fields, setFields] = useState<ICategory[]>(occupationFieldData);
  const [ads, setAds] = useState<IOccupation[]>(occupations.hits);
  const [totalAds, setTotalAds] = useState(occupations.total.value);
  const [totalPositions, setTotalPositions] = useState(occupations.positions);

  // ----- QUERIES ----- //

  const [municipalitiesQueries, setmunicipalitiesQueries] = useState<string[]>(
    []
  );
  const [occupationsQueries, setoccupationsQueries] = useState<string[]>([]);
  const [queries, setQueries] = useState<IQuery[]>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return [
      { query: 'q=', value: urlParams.get('q') || '' },
      { query: 'sort=', value: urlParams.get('sort') || '' },
      {
        query: 'driving-license-required=',
        value: urlParams.get('driving-license-required') || '',
      },
      { query: 'remote=', value: urlParams.get('remote') || '' },
      /*    { query: 'page', value: urlParams.get('page') || '1' }, */
    ];
  });

  const getAdvertsData = async (params: URLSearchParams | null) => {
    console.log('these are the current params', params?.toString());
    try {
      const occupationUrl = params ? `${BASE_URL}&${params}` : BASE_URL;
      const occupationData = await getBase<IAdResponseData>(occupationUrl);

      const { hits, total, positions } = occupationData;

      setAds(hits);
      setTotalAds(total.value);
      setTotalPositions(positions);
    } catch (error) {
      console.log('Error occured when fetching data', error);
      return;
    }
  };

  /**
   * combines both queries and filter params
   * uses the combined params and fetches new occupation data
   * replaces old url history in browser with the new one using window.location
   * @param {IQuery[]} queries
   */
  const refreshData = (queries: IQuery[]) => {
    const queryUrl = getQueryStringFromQueries(queries);
    const urlParams = new URLSearchParams(queryUrl);

    console.log('url params', urlParams);

    getAdvertsData(urlParams);

    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.replaceState(null, '', newUrl);
  };

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

    updateQuery('sort=', sortValue);
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

  // everytime we change a query we will fetch new occupation data
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    refreshData(queries);
  }, [queries]);

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

  const updateQuery = (queryKey: string, value: string) => {
    setQueries((prevQueries) =>
      prevQueries.map((q) => (q.query === queryKey ? { ...q, value } : q))
    );
  };

  const changeDrivingLicenseReq = (filterValue: boolean) => {
    updateQuery('driving-license-required=', filterValue.toString());
  };

  const changeToRemoteWorkplace = (filterValue: boolean) => {
    updateQuery('remote=', filterValue.toString());
  };

  const handleClickOnSearch = (searchInput: string) => {
    updateQuery('q=', searchInput);
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

  const toggleAllOccupationGroups = () => {
    // LOGIC FOR TOGGLING HERE!!!
  };

  useEffect(() => {
    setFields(updateActiveState(fields));
  }, [occupationsQueries]);

  useEffect(() => {
    setRegions(updateActiveState(regions));
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
    ads,
    handleClickOnMunicipality,
    handleClickOnRegion,
    handleClickOnOccupationField,
    handleClickOnOccupationGroup,
    resetAllRegionsAndMunicipalities,
    resetAllFieldsAndGroups,
    resetMunicipalities,
    resetOccupationGroups,
    setAds,
    changeSortingOnSelect,
    toggleAllOccupationGroups,
    changeToRemoteWorkplace,
    changeDrivingLicenseReq,
    handleClickOnSearch,
  };

  return (
    <AdvertsContext.Provider value={adsValues}>
      {children}
    </AdvertsContext.Provider>
  );
};

export default AdvertsContext;
