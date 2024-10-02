import { createContext, ReactNode, useState, useEffect } from 'react';
import { IOccupations, ICategory } from '../types/occupation-types';
import { IVisibleSubcategories } from '../types/types';
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
  occupationsQuerys: string[];
  municipalitiesQuerys: string[];
  ads: IAd[];
  drivingLicense: boolean;
  remoteWorkplace: boolean;
  totalAds: number;
  totalPositions: number;
  fetched: boolean;
  setAds: (value: IAd[]) => void;
  createFilterParams: () => URLSearchParams;
  getData: (params: URLSearchParams | null) => void;
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
  const [municipalitiesQuerys, setmunicipalitiesQuerys] = useState<string[]>(
    []
  );
  const [occupationsQuerys, setoccupationsQuerys] = useState<string[]>([]);
  const [drivingLicense, setDrivingLicense] = useState<boolean>(false);
  const [remoteWorkplace, setRemoteWorkplace] = useState<boolean>(false);
  const [fetched, setFetched] = useState(false);
  const [ads, setAds] = useState<IAd[]>(occupations.hits);
  const [totalAds, setTotalAds] = useState(occupations.total.value);
  const [totalPositions, setTotalPositions] = useState(occupations.positions);

  const handleClickOnRegion = (taxonomyId: string) => {
    handleClickOnCategory(
      taxonomyId,
      regions,
      setRegions,
      setVisibleMunicipalities
    );
  };

  const handleClickOnOccupationField = (taxonomyId: string) => {
    console.log('this is the taxonomy id', taxonomyId);
    handleClickOnCategory(taxonomyId, fields, setFields, setVisibleGroups);
  };

  const handleClickOnMunicipality = (taxonomyId: string) => {
    setActiveSubCategories(taxonomyId, setmunicipalitiesQuerys);
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
    setActiveSubCategories(taxonomyId, setoccupationsQuerys);
    setFields((prevFields) =>
      toggleSubcategoryActiveState(prevFields, taxonomyId)
    );
  };

  const resetAllRegionsAndMunicipalities = () => {
    resetAllCategoriesAndSubCategories(
      regions,
      setRegions,
      setmunicipalitiesQuerys
    );
  };

  const getData = async (params: URLSearchParams | null) => {
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
    resetAllCategoriesAndSubCategories(fields, setFields, setoccupationsQuerys);
  };

  const resetMunicipalities = (regionId: string | null) => {
    resetSubCategoriesOfCategory(
      regionId,
      regions,
      setRegions,
      setmunicipalitiesQuerys
    );
  };

  const resetOccupationGroups = (fieldId: string | null) => {
    resetSubCategoriesOfCategory(
      fieldId,
      fields,
      setFields,
      setoccupationsQuerys
    );
  };

  useEffect(() => {
    console.log('active occupations: ', occupationsQuerys);
    setFields(updateActiveState(fields));
  }, [occupationsQuerys]);

  useEffect(() => {
    console.log('updated fields', fields);
  }, [fields]);

  useEffect(() => {
    console.log('active municipalites', municipalitiesQuerys);
    setRegions(updateActiveState(regions));
  }, [municipalitiesQuerys]);

  const adsValues: IAdvertsContextValues = {
    occupations,
    visibleMunicipalities,
    visibleGroups,
    regions,
    fields,
    occupationsQuerys,
    municipalitiesQuerys,
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
    getData,
  };

  return (
    <AdvertsContext.Provider value={adsValues}>
      {children}
    </AdvertsContext.Provider>
  );
};

export default AdvertsContext;
