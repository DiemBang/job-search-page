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
  getQueryStringFromQueries,
} from '../utils/adsUtils';
import { getTodayDateTime, getDateFromPastDays } from '../utils/dateUtils';
import { getBase } from '../services/serviceBase';
import { DigiFormSelectCustomEvent } from '@digi/arbetsformedlingen/dist/types/components';

const AdvertsContext = createContext<IAdvertsContextValues | null>(null);

interface IAdvertsContextProviderProps {
  children: ReactNode;
  occupations: IOccupations;
  initialQueries: IQuery[];
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
  handleClickOnPaginationButton: (pageNumber: number) => void;
  resetAllRegionsAndMunicipalities: () => void;
  resetAllFieldsAndGroups: () => void;
  resetMunicipalities: (regionId: string | null) => void;
  resetOccupationGroups: (fieldId: string | null) => void;
  changeSortingOnSelect: (
    e: DigiFormSelectCustomEvent<HTMLDigiFormSelectElement>
  ) => void;
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
  initialQueries,
}: IAdvertsContextProviderProps) => {
  const hash = window.location.hash;
  const urlParams = new URLSearchParams(hash.split('?')[1]);

  const occupationGroupParams = urlParams.getAll('occupation-group');
  const municipalitiesGroupParams = urlParams.getAll('municipality');

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
    municipalitiesGroupParams
  );
  const [occupationsQueries, setoccupationsQueries] = useState<string[]>(
    occupationGroupParams
  );
  const [queries, setQueries] = useState<IQuery[]>(initialQueries);

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
    try {
      const pageValue = params?.get('page');
      const page: number = pageValue ? parseInt(pageValue) : 1;
      const offsetValue = (page - 1) * 20;

      const occupationUrl = params
        ? `${BASE_URL}&${params}&offset=${offsetValue}`
        : BASE_URL;
      const occupationData = await getBase<IAdResponseData>(occupationUrl);

      const { hits, total, positions } = occupationData;

      const hash = window.location.hash;
      const urlParams = new URLSearchParams(hash.split('?')[1]);
      const occupationGroupParams = urlParams.getAll('occupation-group');
      const municipalitiesGroupParams = urlParams.getAll('municipality');

      // Update states based on the fetched data
      setFields((prevFields) =>
        updateActiveState(
          prevFields.map((occupationGroup) => {
            const updatedNarrower = occupationGroup.narrower.map(
              (narrowerItem) => {
                const matchedOccupation = hits.find(
                  (hit) => hit.occupation_group.id === narrowerItem.id
                );
                return {
                  ...narrowerItem,
                  active:
                    occupationGroupParams.includes(narrowerItem.id) ||
                    !!matchedOccupation,
                };
              }
            );
            return { ...occupationGroup, narrower: updatedNarrower };
          })
        )
      );

      setRegions((prevRegions) =>
        updateActiveState(
          prevRegions.map((region) => {
            const updatedMunicipalities = region.narrower.map(
              (municipality) => {
                const matchedMunicipality =
                  municipalitiesGroupParams.length > 0
                    ? hits.find(
                        (hit) =>
                          hit.workplace_address.municipality_concept_id ===
                          municipality.id
                      )
                    : null;

                return {
                  ...municipality,
                  active:
                    municipalitiesGroupParams.includes(municipality.id) ||
                    !!matchedMunicipality,
                };
              }
            );
            return { ...region, narrower: updatedMunicipalities };
          })
        )
      );

      setAdsData({
        hits,
        total,
        positions,
      });
    } catch (error) {
      console.log('Error occurred when fetching data', error);
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

    getAdvertsData(urlParams);

    const newUrl = `/case-af-diggi-loo-diggi-ley/#/search?${urlParams.toString()}`;
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

  const updateQuery = (queryKey: string, value: string | string[]) => {
    setQueries((prevQueries) => {
      const existingQuery = prevQueries.find((q) => q.query === queryKey);

      if (existingQuery) {
        return prevQueries.map((q) =>
          q.query === queryKey ? { ...q, value } : q
        );
      } else {
        return [...prevQueries, { query: queryKey, value }];
      }
    });
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

    const checkedValues: string[] = [];

    if (checked.includes('tillsvidare')) {
      checkedValues.push('kpPX_CNN_gDU');
    }
    if (checked.includes('timanstallning')) {
      checkedValues.push('sTu5_NBQ_udq');
    }
    if (checked.includes('vikariat')) {
      checkedValues.push('gro4_cWF_6D7');
    }
    if (checked.includes('behov')) {
      checkedValues.push('1paU_aCR_nGn');
    }
    if (checked.includes('sasong')) {
      checkedValues.push('EBhX_Qm2_8eX');
    }

    updateQuery('employment-type=', checkedValues);
  };

  const changeLanguage = (checked: string[]) => {
    console.log('is language checked: ', checked);

    const checkedValues: string[] = [];

    if (checked.includes('sv')) {
      checkedValues.push('zSLA_vw2_FXN');
    }
    if (checked.includes('eng')) {
      checkedValues.push('NVxJ_hLg_TYS');
    }

    updateQuery('language=', checkedValues);
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

    setRegions((prevRegions) => updateActiveState(prevRegions));
  };

  const handleClickOnOccupationGroup = (taxonomyId: string) => {
    setActiveSubCategories(taxonomyId, setoccupationsQueries);

    setFields((prevFields) =>
      toggleSubcategoryActiveState(prevFields, taxonomyId)
    );

    setFields((prevFields) => updateActiveState(prevFields));
  };

  const handleClickOnOccupationFilter = () => {
    updateQuery('occupation-group=', occupationsQueries);
  };

  const handleClickOnMunicipialitiesFilter = () => {
    updateQuery('municipality=', municipalitiesQueries);
  };

  const handleClickOnPaginationButton = (pageNumber: number) => {
    updateQuery('page=', pageNumber.toString());
  };

  /** --- RESET REGIONS / OCCUPATIONS  **/

  const resetAllRegionsAndMunicipalities = () => {
    resetAllCategoriesAndSubCategories(
      regions,
      setRegions,
      setmunicipalitiesQueries,
      'municipality=',
      updateQuery
    );
  };

  const resetAllFieldsAndGroups = () => {
    resetAllCategoriesAndSubCategories(
      fields,
      setFields,
      setoccupationsQueries,
      'occupation-group=',
      updateQuery
    );
  };

  const resetMunicipalities = (regionId: string | null) => {
    resetSubCategoriesOfCategory(
      regionId,
      regions,
      setRegions,
      setmunicipalitiesQueries,
      'municipality=',
      updateQuery,
      municipalitiesQueries
    );
  };

  const resetOccupationGroups = (fieldId: string | null) => {
    resetSubCategoriesOfCategory(
      fieldId,
      fields,
      setFields,
      setoccupationsQueries,
      'occupation-group=',
      updateQuery,
      occupationsQueries
    );
  };

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
    handleClickOnPaginationButton,
    resetAllRegionsAndMunicipalities,
    resetAllFieldsAndGroups,
    resetMunicipalities,
    resetOccupationGroups,
    changeSortingOnSelect,
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
