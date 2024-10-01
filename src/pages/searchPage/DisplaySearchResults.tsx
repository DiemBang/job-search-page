import { useEffect, useState } from "react";
import { IAd, SearchResult } from "./SearchResult";
import { useLoaderData } from "react-router-dom";
import { IOccupations } from "../../types/occupation-types";

export const DisplaySearchResults = () => {
  const [ads, setAds] = useState<IAd[]>([]);
  const [fetched, setFetched] = useState(false);
  const [totalAds, setTotalAds] = useState(0);
  const [totalPositions, setTotalPositions] = useState(0);

  const data = useLoaderData() as IOccupations;
  useEffect(() => {
    if (fetched) return;
    const getData = async () => {
      try {
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
