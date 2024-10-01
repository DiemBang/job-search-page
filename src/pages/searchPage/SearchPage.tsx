import { Filters } from "./filters/Filters";
import { SearchField } from "./SearchField";
import { DisplaySearchResults } from "./DisplaySearchResults";
import { SearchPageWrapper } from "../../components/styled/Wrappers";
import { DigiNavigationPagination } from "@digi/arbetsformedlingen-react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { IOccupations } from "../../types/occupation-types";


export const SearchPage = () => {
  const data = useLoaderData() as IOccupations;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(data.total.value / 10);

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
	      afInitActivePage={currentPage}
        onAfOnPageChange={handlePageChange}
        afLimit={totalPages}
      ></DigiNavigationPagination>
      </section>
    </SearchPageWrapper>
  );
};
