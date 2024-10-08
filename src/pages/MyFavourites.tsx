import { useEffect, useState } from "react";
import { SearchResult } from "./searchPage/SearchResult";
import { IOccupation } from "../types/occupation-types";
import { DigiTypography } from "@digi/arbetsformedlingen-react";

export const MyFavourites = () => {
  const [favourites, setFavourites] = useState<IOccupation[]>([]);

  useEffect(() => {
    const savedFavouritesList = localStorage.getItem("savedFavouritesList");

    if (savedFavouritesList) {
      setFavourites(JSON.parse(savedFavouritesList));
    }
  }, []);

  return (
    <>
      <DigiTypography>
        <h2>Mina sparade annonser</h2>
        {favourites.length === 0 ? (
          <p>Du har inga sparade annonser</p>
        ) : (
          <>
            {favourites.map((favAd) => (
              <SearchResult key={favAd.id} ad={favAd}></SearchResult>
            ))}
          </>
        )}
      </DigiTypography>
    </>
  );
};
