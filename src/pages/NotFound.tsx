import { DigiMediaImage, DigiTypography } from '@digi/arbetsformedlingen-react';
import pageNotFoundImg from "../assets/404-error.png";

export const NotFound = () => {
  return (
    <>
      <DigiTypography>
        <h1>404 - Sidan kunde inte hittas</h1>
        <p>Tyvärr, sidan du letar efter finns inte.</p>
        <DigiMediaImage
          afUnlazy={true}
          afSrc={pageNotFoundImg}
          afAlt="construction worker using a survey equipment"
        ></DigiMediaImage>{' '}
        <a href="/">Gå tillbaka till startsidan</a>
      </DigiTypography>
    </>
  );
};
