import { DigiNavigationPagination } from "@digi/arbetsformedlingen-react";
import { DigiNavigationPaginationCustomEvent } from "@digi/arbetsformedlingen/dist/types/components";
import useAdvertsContext from "../../hooks/useAdvertsContext";
import { useState } from "react";

interface PaginationProps {
    totalPages: number;
    totalResults: number;
  }

export const Pagination = ({ totalPages, totalResults }: PaginationProps) => {
  const { handleClickOnPaginationButton } = useAdvertsContext();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const currentResultStart = (currentPage - 1) * 20 + 1;
  const currentResultEnd = currentPage * 20;

  const handlePageChange = (
    e: DigiNavigationPaginationCustomEvent<number>
  ): void => {
    setCurrentPage(e.detail);
    handleClickOnPaginationButton(e.detail);
  };

  return (
    <>
      <DigiNavigationPagination
        afCurrentResultStart={currentResultStart}
        afCurrentResultEnd={currentResultEnd}
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
