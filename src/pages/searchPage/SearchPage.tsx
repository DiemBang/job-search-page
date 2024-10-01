import { Filters } from "./filters/Filters";
import { SearchField } from "./SearchField";
import { DisplaySearchResults } from "./DisplaySearchResults";
import { SearchPageWrapper } from "../../components/styled/Wrappers";
import { FilterContext } from "../../context/FilterContext";
import { useState } from "react";
import { IAd } from "./SearchResult";
import { AdsContext } from "../../context/AdsContext";
import { getBase } from "../../services/serviceBase";


export const SearchPage = () => {
  const [drivingLicense, setDrivingLicense] = useState<boolean>(false);
  const [ads, setAds] = useState<IAd[]>([]);
  const [fetched, setFetched] = useState(false);
  const [totalAds, setTotalAds] = useState(0);
  const [totalPositions, setTotalPositions] = useState(0);

  const getData = async () => {
    try {
      const data = await getBase();
      setAds(data.hits);
      setTotalAds(data.total.value);
      setTotalPositions(data.positions);
      setFetched(true);
    } catch (error) {
      console.log("Error occured when fetching data", error);
      return;
    }
  };

  const createFilterParams = () => {
    const params = new URLSearchParams();

    if (drivingLicense) params.append("drivingLicense", "true");

    return params.toString();
  } 

  return (
    <AdsContext.Provider value={{ads, setAds, createFilterParams, getData, totalAds, totalPositions, fetched}}>
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
