import { useEffect, useState } from "react";
import { IAd, SearchResult } from "./SearchResult";
import { searchData } from "../../data/search-data";

export const DisplaySearchResults = () => {
   const [ads, setAds] = useState<IAd[]>([]);

  useEffect(() => {
    const getData = async () => {
      let data: IAd[] = searchData.hits;
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
        <SearchResult
          headline={ad.headline}
          id={ad.id}
          employer={ad.employer}
          workplace_address={ad.workplace_address}
          working_hours_type={ad.working_hours_type}
          publication_date={ad.publication_date}
        />
      ))}
    </>
  );
};
