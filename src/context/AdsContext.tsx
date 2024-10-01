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

const AdsContext = createContext<IAdsContextValues | null>(null);

interface IAdsContextProviderProps {
  children: ReactNode;
  occupations: IOccupations;
}

interface IAdsContextValues {
  occupations: IOccupations;
  visibleMunicipalities: IVisibleSubcategories | null;
  visibleGroups: IVisibleSubcategories | null;
  regions: ICategory[];
  fields: ICategory[];
  activeOccupationGroups: string[];
  activeMunicipalities: string[];
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

export const AdsContextProvider = ({
  children,
  occupations,
}: IAdsContextProviderProps) => {
  const [visibleMunicipalities, setVisibleMunicipalities] =
    useState<IVisibleSubcategories | null>(null);
  const [visibleGroups, setVisibleGroups] =
    useState<IVisibleSubcategories | null>(null);
  const [regions, setRegions] = useState<ICategory[]>(regionsData);
  const [fields, setFields] = useState<ICategory[]>(occupationFieldData);
  const [activeMunicipalities, setActiveMunicipalities] = useState<string[]>(
    []
  );
  const [activeOccupationGroups, setActiveOccupationGroups] = useState<
    string[]
  >([]);

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
    setActiveSubCategories(taxonomyId, setActiveMunicipalities);
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
    setActiveSubCategories(taxonomyId, setActiveOccupationGroups);
    setFields((prevFields) =>
      toggleSubcategoryActiveState(prevFields, taxonomyId)
    );
  };

  const resetAllRegionsAndMunicipalities = () => {
    resetAllCategoriesAndSubCategories(
      regions,
      setRegions,
      setActiveMunicipalities
    );
  };

  const resetAllFieldsAndGroups = () => {
    resetAllCategoriesAndSubCategories(
      fields,
      setFields,
      setActiveOccupationGroups
    );
  };

  const resetMunicipalities = (regionId: string | null) => {
    resetSubCategoriesOfCategory(
      regionId,
      regions,
      setRegions,
      setActiveMunicipalities
    );
  };

  const resetOccupationGroups = (fieldId: string | null) => {
    resetSubCategoriesOfCategory(
      fieldId,
      fields,
      setFields,
      setActiveOccupationGroups
    );
  };

  useEffect(() => {
    console.log('active occupations: ', activeOccupationGroups);
    setFields(updateActiveState(fields));
  }, [activeOccupationGroups]);

  useEffect(() => {
    console.log('updated fields', fields);
  }, [fields]);

  useEffect(() => {
    console.log('active municipalites', activeMunicipalities);
    setRegions(updateActiveState(regions));
  }, [activeMunicipalities]);

  const adsValues: IAdsContextValues = {
    occupations,
    visibleMunicipalities,
    visibleGroups,
    regions,
    fields,
    activeOccupationGroups,
    activeMunicipalities,
    handleClickOnMunicipality,
    handleClickOnRegion,
    handleClickOnOccupationField,
    handleClickOnOccupationGroup,
    resetAllRegionsAndMunicipalities,
    resetAllFieldsAndGroups,
    resetMunicipalities,
    resetOccupationGroups,
  };

  return (
    <AdsContext.Provider value={adsValues}>{children}</AdsContext.Provider>
  );
};

export default AdsContext;
