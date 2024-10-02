import { useEffect, useState } from 'react';
import { IAd, SearchResult } from './SearchResult';
import { getBase } from '../../services/serviceBase';
import useAdvertsContext from '../../hooks/useAdvertsContext';

export const DisplaySearchResults = () => {
  const { occupations } = useAdvertsContext();

  const [ads, setAds] = useState<IAd[]>(occupations.hits);
  const [totalAds, setTotalAds] = useState(occupations.total.value);
  const [totalPositions, setTotalPositions] = useState(occupations.positions);

  /*   useEffect(() => {
    if (fetched) return;
    const getData = async () => {
      try {
        const data = await getBase();
        setAds(data.hits);
        setTotalAds(data.total.value);
        setTotalPositions(data.positions);
        setFetched(true);
      } catch (error) {
        console.log("Error occured when fetching data", error);
        return;
      }
    };

    getData();
  });
 */
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
