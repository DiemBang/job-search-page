import { Filters } from "./filters/Filters";
import { SearchField } from "./SearchField";
import { DisplaySearchResults } from "./DisplaySearchResults";
import { SearchPageWrapper } from "../../components/styled/Wrappers";
import { FilterContext } from "../../context/FilterContext";
import { useState } from "react";
import { IAd } from "./SearchResult";
import { AdsContext } from "../../context/AdsContext";


export const SearchPage = () => {
  const [drivingLicense, setDrivingLicense] = useState<boolean>(false);
  const [ads, setAds] = useState<IAd[]>([]);

  return (
    <AdsContext.Provider value={{ads, setAds}}>
    <FilterContext.Provider value={{drivingLicense, setDrivingLicense}}>
    <SearchPageWrapper>
      <h2>Platsbanken</h2>
      <SearchField />
      <Filters />
      <DisplaySearchResults />
    </SearchPageWrapper>
    </FilterContext.Provider>
    </AdsContext.Provider>
  );
};
