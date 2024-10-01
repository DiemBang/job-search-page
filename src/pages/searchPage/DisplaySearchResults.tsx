import { useContext, useEffect, useState } from "react";
import { IAd, SearchResult } from "./SearchResult";

import { AdsContext } from "../../context/AdsContext";

export const DisplaySearchResults = () => {
  const {ads, setAds, createFilterParams, getData, totalAds, totalPositions, fetched} = useContext(AdsContext);
 
  
  //const [remoteWorkplace, setRemoteWorkplace] = useState(false);

  useEffect(() => {
    if (fetched) return;
    createFilterParams();
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
