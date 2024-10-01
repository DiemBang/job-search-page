import { Filters } from "./filters/Filters";
import { SearchField } from "./SearchField";
import { DisplaySearchResults } from "./DisplaySearchResults";
import { SearchPageWrapper } from "../../components/styled/Wrappers";
import { DigiNavigationPagination } from "@digi/arbetsformedlingen-react";
import { useState } from "react";


export const SearchPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (e: CustomEvent<number>): void => {
    const newPage = e.detail;
    setCurrentPage(newPage);
    console.log("Page number has been changed to: ", newPage);
  }

  return (
    <SearchPageWrapper>
      <h2>Platsbanken</h2>
      <SearchField />
      <Filters />
      <section>
        <DisplaySearchResults />
      </section>
      <section>
      <DigiNavigationPagination
        afTotalPages={6}
	      afInitActivePage={currentPage}
        onAfOnPageChange={handlePageChange}
      ></DigiNavigationPagination>
      </section>
    </SearchPageWrapper>
  );
};
