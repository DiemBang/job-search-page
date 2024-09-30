import { Filters } from "./filters/Filters";
import { SearchField } from "./SearchField";
import { DisplaySearchResults } from "./DisplaySearchResults";
import { SearchPageWrapper } from "../../components/styled/Wrappers";
import { FilterContext } from "../../context/FilterContext";
import { useState } from "react";


export const SearchPage = () => {
  const [drivingLicense, setDrivingLicense] = useState<boolean>(false);

  return (
    <FilterContext.Provider value={{drivingLicense, setDrivingLicense}}>
    <SearchPageWrapper>
      <h2>Platsbanken</h2>
      <SearchField />
      <Filters />
      <section>
        <DisplaySearchResults />
      </section>
      <section>
        {/* Pagination */}
      </section>
    </SearchPageWrapper>
    </FilterContext.Provider>
  );
};
