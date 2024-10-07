import { useEffect, useState } from "react";
import { IAd, SearchResult } from "./searchPage/SearchResult";

export const MyFavourites = () => {
  const [favourites, setFavourites] = useState<IAd[]>([]);

  useEffect(() => {
    const savedFavouritesList = localStorage.getItem("savedFavouritesList");

    if (savedFavouritesList) {
      setFavourites(JSON.parse(savedFavouritesList));
    }
  }, []);

  return (
    <>
      <h2>Mina Sparade Annonser</h2>
      {favourites.length === 0 ? (
        <p>Du har inga sparade annonser</p>
      ) : (
        <>
          {favourites.map((favAd) => (
            <SearchResult key={favAd.id} ad={favAd}></SearchResult>
          ))}
        </>
      )}
    </>
  );
};
