import { useContext, useEffect } from "react";
import { SearchResult } from "./SearchResult";

import { AdsContext } from "../../context/AdsContext";

export const DisplaySearchResults = () => {
  const {ads, getData, totalAds, totalPositions, fetched} = useContext(AdsContext);
 
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
