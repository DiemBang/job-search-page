import { useState } from "react";
import { SearchResult } from "./SearchResult";

export const DisplaySearchResults = () => {
  // Add documents state variable
  // Loop through (with map) this documents list in return statement
  // and for each document have a separate Document or SearchResult component taking
  // id, annonstitel, foretag, ort etc
//   const [ads, setAds] = useState([]);
  const [ads, setAds] = useState([
    {
        "headline": "hej hej",
        "id": 0,
        "employer": "fsdf",
        "publication_date": "23234"
    }
]);


  return (
    <>
      <h3>X annonser hittades</h3>
      {ads.map((ad) => (
        <SearchResult headline={ad.headline} id={ad.id} employer={ad.employer} publication_date={ad.publication_date}/>
      ))}
    </>
  );
};
