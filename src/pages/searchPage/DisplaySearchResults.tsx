import { useEffect, useState } from "react";
import { IAd, SearchResult } from "./SearchResult";
import { searchData } from "../../data/search-data";

export const DisplaySearchResults = () => {
  // Add documents state variable
  // In useEffect set this variable to search data which will be change to api at later stage.
  // Loop through (with map) this documents list in return statement
  // and for each document have a separate Document or SearchResult component taking
  // id, annonstitel, foretag, ort etc
  const [ads, setAds] = useState<IAd[]>([]);


  useEffect(() => {
    const getData = async () => {
        let data: IAd[] = searchData.hits;
      setAds(data);
    };
    getData();
  });


  console.log(searchData["positions"]);
  console.log(searchData["hits"].length);

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
