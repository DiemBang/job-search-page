import { useEffect, useState } from 'react';
import { IAd, SearchResult } from './SearchResult';
import { getBase } from "../../services/serviceBase";

export const DisplaySearchResults = () => {
  const [ads, setAds] = useState<IAd[]>([]);
  const [fetched, setFetched] = useState(false);
  const [totalAds, setTotalAds] = useState(0);
  const [totalPositions, setTotalPositions] = useState(0);

  useEffect(() => {
    if (fetched) return;
    const getData = async () => {
      const data = await getBase();
      setAds(data.hits);
      setTotalAds(data.total.value);
      setTotalPositions(data.positions);
      setFetched(true);
    };

    getData();
  });

  return (
    <>
      <h3>
        {totalAds} annonser med {totalPositions} jobb
        hittades
      </h3>
      {ads.map((ad) => (
        <SearchResult key={ad.id} ad={ad} />
      ))}
    </>
  );
};
