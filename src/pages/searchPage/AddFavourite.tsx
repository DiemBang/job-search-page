import { DigiIconStar, DigiIconStarReg } from "@digi/arbetsformedlingen-react";
import { useState } from "react";
import { IAdProps } from "./SearchResult";

export const AddFavourite = ({ad}: IAdProps) => {
    const [isFavourite, setIsFavourite] = useState(false);

    const toggleFavourite = () => {
        
        console.log(ad.id);
        const savedFavourites = JSON.parse(localStorage.getItem("savedFavouritesList") || "[]");

        let updatedFavourites;
        if (isFavourite) {
            // Remove ad.id from the list if it was already a favourite
            updatedFavourites = savedFavourites.filter((favId: string) => favId !== ad.id);
        } else {
            // Add ad.id to the list if it's not a favourite yet
            updatedFavourites = [...savedFavourites, ad.id];
        }

         // Update local storage with the new list
         localStorage.setItem("savedFavouritesList", JSON.stringify(updatedFavourites));

         // Toggle the favourite state
         setIsFavourite(!isFavourite);
    }
    return (
        <>
        <p>Spara annons</p>
        {!isFavourite && <DigiIconStarReg afSvgAriaLabelledby="star icon symbol" afSvgAriaHidden={true} onClick={toggleFavourite}></DigiIconStarReg>}
        {isFavourite && <DigiIconStar afSvgAriaLabelledby="star icon symbol clicked" afSvgAriaHidden onClick={toggleFavourite}></DigiIconStar>}
        </>
    );
}