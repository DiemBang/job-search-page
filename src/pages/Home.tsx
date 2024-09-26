import {
  FormInputSearchVariation,
  FormInputType,
  LayoutBlockVariation,
} from '@digi/arbetsformedlingen';
import {
  DigiFormInputSearch,
  DigiLayoutBlock,
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
        <section className="home-bottom-section"></section>
      </DigiLayoutBlock>
    </>
  );
};
