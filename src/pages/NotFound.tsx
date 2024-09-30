import { DigiLinkInternal, DigiMediaImage, DigiTypography } from '@digi/arbetsformedlingen-react';
import pageNotFoundImg from '../assets/404-error.png';
import { LinkVariation } from '@digi/arbetsformedlingen';

export const NotFound = () => {
  return (
    <>
      <DigiTypography>
        <h1>404 - Sidan kunde inte hittas</h1>
        <p>Tyvärr, sidan du letar efter finns inte.</p>
        <DigiMediaImage
          afUnlazy
          afSrc={pageNotFoundImg}
          afAlt="image of 404 error"
          className='page-not-found-img'
        ></DigiMediaImage>
        <DigiLinkInternal afHref="/" afVariation={LinkVariation.SMALL}>
          Gå tillbaka till startsidan
        </DigiLinkInternal>
      </DigiTypography>
    </>
  );
};
