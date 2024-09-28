import { useEffect, useState } from 'react';
import { IAd, SearchResult } from './SearchResult';
import { searchData } from '../../data/search-data';

export const DisplaySearchResults = () => {
  const [ads, setAds] = useState<IAd[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data: IAd[] = searchData.hits;
      setAds(data);
    };
    getData();
  });

  return (
    <>
      <h3>
        {searchData.total.value} annonser med {searchData.positions} jobb
        hittades
      </h3>
      {ads.map((ad) => (
        <SearchResult key={ad.id} ad={ad} />
      ))}
    </>
  );
};
