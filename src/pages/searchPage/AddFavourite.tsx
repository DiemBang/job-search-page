import { DigiIconStar, DigiIconStarReg } from '@digi/arbetsformedlingen-react';
import { useEffect, useState } from 'react';
import { IAdProps } from './SearchResult';
import { IOccupation } from '../../types/occupation-types';
import { FavWrapper } from '../../components/styled/Wrappers';

export const AddFavourite = ({ ad }: IAdProps) => {
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const savedFavourites = JSON.parse(
      localStorage.getItem('savedFavouritesList') || '[]'
    );
    const savedFavouriteIds: string[] = [];

    savedFavourites.forEach((element: IOccupation) => {
      savedFavouriteIds.push(element.id);
    });
    const isAdAlreadyFavourite = savedFavouriteIds.includes(ad.id);
    setIsFavourite(isAdAlreadyFavourite);
  }, [ad]);

  const toggleFavourite = () => {
    const savedFavourites = JSON.parse(
      localStorage.getItem('savedFavouritesList') || '[]'
    );

    let updatedFavourites;
    if (isFavourite) {
      updatedFavourites = savedFavourites.filter(
        (favAd: IOccupation) => favAd.id !== ad.id
      );
    } else {
      updatedFavourites = [...savedFavourites, ad];
    }

    localStorage.setItem(
      'savedFavouritesList',
      JSON.stringify(updatedFavourites)
    );

    setIsFavourite(!isFavourite);
  };
  return (
    <>
      <FavWrapper>
        <span style={{ marginRight: '8px' }}>Spara</span>
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
      </FavWrapper>
    </>
  );
};
