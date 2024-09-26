import {
  FormInputSearchVariation,
  FormInputType,
  LayoutBlockVariation,
} from '@digi/arbetsformedlingen';
import {
  DigiFormInputSearch,
  DigiLayoutBlock,
  DigiMediaImage,
} from '@digi/arbetsformedlingen-react';

export const Home = () => {
  return (
    <>
      <DigiLayoutBlock
        afVariation={LayoutBlockVariation.PRIMARY}
        className="home-main-block"
      >
        <section className="home-top-section"></section>
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
            afUnlazy
            afSrc="https://images.unsplash.com/photo-1607134541550-2994abb8077b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            afAlt="construction worker using a survey equipment"
          ></DigiMediaImage>
          <DigiMediaImage
            afUnlazy
            afSrc="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            afAlt="office workers looking at paperwork"
          ></DigiMediaImage>
        </section>
      </DigiLayoutBlock>
    </>
  );
};
