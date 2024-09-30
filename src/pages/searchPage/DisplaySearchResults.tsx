import { useContext, useEffect, useState } from "react";
import { IAd, SearchResult } from "./SearchResult";
import { getBase } from "../../services/serviceBase";
import { AdsContext } from "../../context/AdsContext";

export const DisplaySearchResults = () => {
  const {ads, setAds} = useContext(AdsContext);
  const [fetched, setFetched] = useState(false);
  const [totalAds, setTotalAds] = useState(0);
  const [totalPositions, setTotalPositions] = useState(0);
  //const [remoteWorkplace, setRemoteWorkplace] = useState(false);

  useEffect(() => {
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
