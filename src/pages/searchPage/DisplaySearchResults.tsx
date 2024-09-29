import { useEffect, useState } from 'react';
import { IAd, SearchResult } from './SearchResult';
import axios from "axios";

export const DisplaySearchResults = () => {
  const [ads, setAds] = useState<IAd[]>([]);
  const [fetched, setFetched] = useState(false);
  const [totalAds, setTotalAds] = useState(0);
  const [totalPositions, setTotalPositions] = useState(0);

  useEffect(() => {
    if (fetched) return;
    const getData = async () => {
      let response = await axios.get(
        "https://jobsearch.api.jobtechdev.se/search?offset=0&limit=20"
      );
      setAds(response.data.hits);
      setTotalAds(response.data.total.value);
      setTotalPositions(response.data.positions);
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
