import { Filters } from "./filters/Filters";
import { SearchField } from "./SearchField";
import { DisplaySearchResults } from "./DisplaySearchResults";
import { SearchPageWrapper } from "../../components/styled/Wrappers";
import { useLoaderData } from "react-router-dom";
import { IOccupations } from '../../types/occupation-types';
import { AdvertsContextProvider } from '../../context/AdvertsContext';
import { DigiNavigationPagination } from "@digi/arbetsformedlingen-react";
import { useState } from "react";
import { ModalsContextProvider } from "../../context/ModalsContext";





export const SearchPage = () => {

  const data = useLoaderData() as IOccupations;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(data.total.value / 10);

  const handlePageChange = (e: CustomEvent<number>): void => {
    const newPage = e.detail;
    setCurrentPage(newPage);
  
    const currentUrl = new URL(window.location.href);
  
    currentUrl.searchParams.set('page', newPage.toString());
  
    window.history.replaceState({}, '', currentUrl.toString());
  
    console.log("Page number has been changed to: ", newPage);
  };

  return (
    <ModalsContextProvider>
      <AdvertsContextProvider occupations={data}>
        <SearchPageWrapper>
          <h2>Platsbanken</h2>
          <SearchField />
          <Filters />
          <DisplaySearchResults />
        <DigiNavigationPagination
	      afInitActivePage={currentPage}
        onAfOnPageChange={handlePageChange}
        afLimit={totalPages}
      ></DigiNavigationPagination>
        </SearchPageWrapper>
      </AdvertsContextProvider>
    </ModalsContextProvider>
  );
};
