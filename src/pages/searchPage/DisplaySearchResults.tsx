import { useEffect } from 'react';
import { SearchResult } from './SearchResult';
import useAdvertsContext from '../../hooks/useAdvertsContext';

export const DisplaySearchResults = () => {
  const { ads, getData, totalAds, totalPositions, fetched } =
    useAdvertsContext();

  useEffect(() => {
    if (fetched) return;

    getData(null);
  });

  return (
    <>
      <h3>
        {totalAds} annonser med {totalPositions} jobb hittades
      </h3>
      {ads.map((ad) => (
        <SearchResult key={ad.id} ad={ad} />
      ))}
    </>
  );
};
