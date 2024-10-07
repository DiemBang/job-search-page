import { DigiIconStar, DigiIconStarReg } from "@digi/arbetsformedlingen-react";
import { useEffect, useState } from "react";
import { IAdProps } from "./SearchResult";

export const AddFavourite = ({ ad }: IAdProps) => {
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const savedFavourites = JSON.parse(
      localStorage.getItem("savedFavouritesList") || "[]"
    );
    setIsFavourite(savedFavourites.includes(ad.id));
  }, [ad.id]);

  const toggleFavourite = () => {
    console.log(ad.id);
    const savedFavourites = JSON.parse(
      localStorage.getItem("savedFavouritesList") || "[]"
    );

    let updatedFavourites;
    if (isFavourite) {
      updatedFavourites = savedFavourites.filter(
        (favId: string) => favId !== ad.id
      );
    } else {
      updatedFavourites = [...savedFavourites, ad.id];
    }

    localStorage.setItem(
      "savedFavouritesList",
      JSON.stringify(updatedFavourites)
    );

    setIsFavourite(!isFavourite);
  };
  return (
    <>
      <p>Spara annons</p>
      {!isFavourite && (
        <DigiIconStarReg
          afSvgAriaLabelledby="star icon symbol"
          afSvgAriaHidden={true}
          onClick={toggleFavourite}
        ></DigiIconStarReg>
      )}
      {isFavourite && (
        <DigiIconStar
          afSvgAriaLabelledby="star icon symbol clicked"
          afSvgAriaHidden
          onClick={toggleFavourite}
        ></DigiIconStar>
      )}
    </>
  );
};
