import { DigiNavigationPagination } from "@digi/arbetsformedlingen-react";
import { DigiNavigationPaginationCustomEvent } from "@digi/arbetsformedlingen/dist/types/components";
import useAdvertsContext from "../../hooks/useAdvertsContext";

interface PaginationProps {
    totalPages: number;
    totalResults: number;
  }

export const Pagination = ({ totalPages, totalResults }: PaginationProps) => {
  const { handleClickOnPaginationButton } = useAdvertsContext();

  const handlePageChange = (
    e: DigiNavigationPaginationCustomEvent<number>
  ): void => {
    handleClickOnPaginationButton(e.detail);
  };

  return (
    <>
      <DigiNavigationPagination
        afInitActivePage={1}
        afLimit={10}
        afTotalPages={totalPages}
        afResultName="annonser"
        afTotalResults={totalResults}
        afId="paginationComponent"
        onAfOnPageChange={handlePageChange}
      ></DigiNavigationPagination>
    </>
  );
};
