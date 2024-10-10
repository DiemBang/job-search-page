import { DigiNavigationPagination } from '@digi/arbetsformedlingen-react';
import { DigiNavigationPaginationCustomEvent } from '@digi/arbetsformedlingen/dist/types/components';
import useAdvertsContext from '../../hooks/useAdvertsContext';
import { useState } from 'react';

export const Pagination = () => {
  const { handleClickOnPaginationButton, adsData } = useAdvertsContext();

  let totalPages = adsData?.total.value
    ? Math.ceil(adsData?.total.value / 20)
    : 1;
  totalPages = Math.min(totalPages, 100);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const currentResultStart = (currentPage - 1) * 20 + 1;
  const currentResultEnd = currentPage * 20;

  const handlePageChange = (
    e: DigiNavigationPaginationCustomEvent<number>
  ): void => {
    setCurrentPage(e.detail);
    handleClickOnPaginationButton(e.detail);
  };

  if (adsData?.total.value === 0) return null;

  return (
    <>
      <DigiNavigationPagination
        afCurrentResultStart={currentResultStart}
        afCurrentResultEnd={currentResultEnd}
        afInitActivePage={1}
        afLimit={10}
        afTotalPages={totalPages}
        afResultName="annonser"
        afTotalResults={adsData?.total.value}
        afId="paginationComponent"
        onAfOnPageChange={handlePageChange}
      ></DigiNavigationPagination>
    </>
  );
};
