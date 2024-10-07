import { createContext, ReactNode, useState, useEffect, useRef } from 'react';
import { IOccupations, ICategory } from '../types/occupation-types';
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
  queries: IQuery[];
  adsData: IAdResponseData | null;
  handleClickOnRegion: (taxonomyId: string) => void;
  handleClickOnMunicipality: (taxonomyId: string) => void;
  handleClickOnMunicipialitiesFilter: () => void;
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
  changeWorktimeExtent: (checked: string[]) => void;
  changeEmploymentType: (checked: string[]) => void;
  changeLanguage: (checked: string[]) => void;
  changePublishedDate: (checked: string[]) => void;
  handleClickOnSearch: (searchInput: string) => void;
  handleClickOnOccupationFilter: () => void;
}

const regionsData = addSelectedAndActiveKeys(locationsData.data.concepts);
const occupationFieldData = addSelectedAndActiveKeys(
  occupationsData.data.concepts
);

const BASE_URL = 'https://jobsearch.api.jobtechdev.se/search?limit=20';

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
  const [adsData, setAdsData] = useState<IAdResponseData | null>(occupations);

  // ----- QUERIES ----- //

  const [municipalitiesQueries, setmunicipalitiesQueries] = useState<string[]>(
    []
  );
  const [occupationsQueries, setoccupationsQueries] = useState<string[]>([]);
  const [queries, setQueries] = useState<IQuery[]>(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const occupationGroupParams = urlParams.getAll('occupation-group');
    const municipalitiesGroupParams = urlParams.getAll('municipality');

    return [
      { query: 'q=', value: urlParams.get('q') || '' },
      { query: 'sort=', value: urlParams.get('sort') || '' },
      {
        query: 'worktime-extent=',
        value: urlParams.get('worktime-extent') || '',
      },
      {
        query: 'employment-type=',
        value: urlParams.get('employment-type') || '',
      },
      {
        query: 'driving-license-required=',
        value: urlParams.get('driving-license-required') || '',
      },
      { query: 'remote=', value: urlParams.get('remote') || '' },
      { query: 'language=', value: urlParams.get('language') || '' },
      {
        query: 'published-after=',
        value: urlParams.get('published-after') || '',
      },
      { query: 'occupation-group=', value: occupationGroupParams },
      { query: 'municipality=', value: municipalitiesGroupParams },
      { query: 'page=', value: urlParams.get('page') || '1' }
    ];
  });

  // every time we change a query we will fetch new occupation data
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    refreshData(queries);
  }, [queries]);

  /**
   * based on search params gets the occupationdata from the AF API
   * set states for
   * @param {URLSearchParams | null} params
   * @returns
   */
  const getAdvertsData = async (params: URLSearchParams | null) => {
    console.log('these are the current params', params?.toString());
    try {
      const pageValue = params?.get('page');
      const page: number = pageValue ? parseInt(pageValue) : 1;
      const offsetValue = (page - 1) * 10; 
      
      const occupationUrl = params ? `${BASE_URL}&${params}&offset=${offsetValue}` : BASE_URL;
      const occupationData = await getBase<IAdResponseData>(occupationUrl);

      const { hits, total, positions } = occupationData;

      console.log(occupationData);

      setAdsData({
        hits: hits,
        total: total,
        positions: positions,
      });
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
        if (Array.isArray(q.value)) {
          return q.value.map((v) => `${q.query}${v}`).join('&');
        }
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

  const handleClickOnOccupationFilter = () => {
    updateQuery('occupation-group=', occupationsQueries);
  };

  const handleClickOnMunicipialitiesFilter = () => {
    updateQuery('municipality=', municipalitiesQueries);
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

  const updateQuery = (queryKey: string, value: string | string[]) => {
    setQueries((prevQueries) =>
      prevQueries.map((q) => (q.query === queryKey ? { ...q, value } : q))
    );
  };

  const changeDrivingLicenseReq = (filterValue: boolean) => {
    if (filterValue === false) {
      updateQuery('driving-license-required=', '');
    } else {
      updateQuery('driving-license-required=', filterValue.toString());
    }
  };

  const changeToRemoteWorkplace = (filterValue: boolean) => {
    if (filterValue === false) {
      updateQuery('remote=', '');
    } else {
      updateQuery('remote=', filterValue.toString());
    }
  };

  const changeWorktimeExtent = (checked: string[]) => {
    console.log('is worktime checked: ', checked);

    if (checked.length === 0) {
      updateQuery('worktime-extent=', '');
    } else if (checked.includes('alla')) {
      updateQuery('worktime-extent=', '');
    } else if (checked.includes('heltid')) {
      updateQuery('worktime-extent=', '6YE1_gAC_R2G');
    } else if (checked.includes('deltid')) {
      updateQuery('worktime-extent=', '947z_JGS_Uk2');
    }
  };

  const changeEmploymentType = (checked: string[]) => {
    console.log('is employment type checked: ', checked);

    if (checked.length === 0) {
      updateQuery('employment-type=', '');
    } else if (checked.includes('tillsvidare')) {
      updateQuery('employment-type=', 'kpPX_CNN_gDU');
    } else if (checked.includes('timanstallning')) {
      updateQuery('employment-type=', 'sTu5_NBQ_udq');
    } else if (checked.includes('vikariat')) {
      updateQuery('employment-type=', 'gro4_cWF_6D7');
    } else if (checked.includes('behov')) {
      updateQuery('employment-type=', '1paU_aCR_nGn');
    } else if (checked.includes('sasong')) {
      updateQuery('employment-type=', 'EBhX_Qm2_8eX');
    }
  };

  const changeLanguage = (checked: string[]) => {
    console.log('is language checked: ', checked);

    if (checked.length === 0) {
      updateQuery('language=', '');
    } else if (checked.includes('sv')) {
      updateQuery('language=', 'zSLA_vw2_FXN');
    } else if (checked.includes('eng')) {
      updateQuery('language=', 'NVxJ_hLg_TYS');
    }
  };

  const getTodayDateTime = (): string => {
    const now = new Date();
    return now.toISOString().split('.')[0];
  };

  const getDateFromPastDays = (days: number): string => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('.')[0];
  };

  const changePublishedDate = (checked: string[]) => {
    console.log('is published date checked', checked);

    if (checked.length === 0 || checked.includes('alla')) {
      updateQuery('published-after=', '');
    } else if (checked.includes('idag')) {
      const today = getTodayDateTime();
      console.log("today's date is:", today);

      updateQuery('published-after=', today);
    } else if (checked.includes('7dagar')) {
      const sevenDaysAgo = getDateFromPastDays(7);
      updateQuery('published-after=', sevenDaysAgo);
    } else if (checked.includes('30dagar')) {
      const thirtyDaysAgo = getDateFromPastDays(30);
      updateQuery('published-after=', thirtyDaysAgo);
    }
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
    console.log('active occupations', occupationsQueries);
  }, [occupationsQueries]);

  useEffect(() => {
    setRegions(updateActiveState(regions));
    console.log('active regions', municipalitiesQueries);
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
    adsData,
    handleClickOnMunicipialitiesFilter,
    handleClickOnMunicipality,
    handleClickOnRegion,
    handleClickOnOccupationField,
    handleClickOnOccupationGroup,
    resetAllRegionsAndMunicipalities,
    resetAllFieldsAndGroups,
    resetMunicipalities,
    resetOccupationGroups,
    changeSortingOnSelect,
    toggleAllOccupationGroups,
    changeWorktimeExtent,
    changeEmploymentType,
    changeToRemoteWorkplace,
    changeDrivingLicenseReq,
    changeLanguage,
    changePublishedDate,
    handleClickOnSearch,
    handleClickOnOccupationFilter,
  };

  return (
    <AdvertsContext.Provider value={adsValues}>
      {children}
    </AdvertsContext.Provider>
  );
};

export default AdvertsContext;
