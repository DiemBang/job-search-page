import {
  FormInputSearchVariation,
  FormInputType,
  LayoutBlockVariation,
} from '@digi/arbetsformedlingen';
import {
  DigiFormInputSearch,
  DigiLayoutBlock,
  DigiMediaImage,
  DigiTypography,
} from '@digi/arbetsformedlingen-react';

export const Home = () => {
  return (
    <>
      <DigiLayoutBlock
        afVariation={LayoutBlockVariation.PRIMARY}
        className="home-main-block"
      >
        <section className="home-top-section">
          <DigiTypography>
            <span className="motivational-span">Sök jobb här hos Diggilo!</span>
            <h2>... Jobs listed</h2>
            <p>
              Är du redo att ta nästa stora steg i din karriär? Sök
              bland hundratals lediga tjänster från olika branscher och hitta
              den roll som passar dina färdigheter och ambitioner. Vi är här för
              att hjälpa dig att nå dina mål och ta din karriär till nya höjder.
              Sätt igång och upptäck ditt drömjobb idag!
            </p>
          </DigiTypography>
        </section>
        <section className="home-middle-section">
          <DigiFormInputSearch
            afLabel="Sök Här"
            afVariation={FormInputSearchVariation.MEDIUM}
            afType={FormInputType.SEARCH}
            afButtonText="Knapptext"
            className="home-search-container"
          ></DigiFormInputSearch>
        </section>
        <section className="home-bottom-section">
          <DigiMediaImage
            afUnlazy={true}
            afSrc="https://images.unsplash.com/photo-1607134541550-2994abb8077b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            afAlt="construction worker using a survey equipment"
          ></DigiMediaImage>
          <DigiMediaImage
            afUnlazy={true}
            afSrc="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            afAlt="office workers looking at paperwork"
          ></DigiMediaImage>
        </section>
      </DigiLayoutBlock>
    </>
  );
};
