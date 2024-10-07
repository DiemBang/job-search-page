import { DigiIconStar, DigiIconStarReg } from "@digi/arbetsformedlingen-react";

export const AddFavourite = () => {
    return (
        <>
        <p>Spara annons</p>
        <DigiIconStarReg afSvgAriaLabelledby="star icon symbol" afSvgAriaHidden="false"></DigiIconStarReg>
        <DigiIconStar afSvgAriaLabelledby="star icon symbol clicked" afSvgAriaHidden></DigiIconStar>
        </>
    );
}