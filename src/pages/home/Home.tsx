import {
  FormInputSearchVariation,
  FormInputType,
  LayoutBlockVariation,
} from '@digi/arbetsformedlingen';
import {
  DigiFormInputSearch,
  DigiLayoutBlock,
  DigiLayoutContainer,
  DigiMediaImage,
  DigiTypography,
} from '@digi/arbetsformedlingen-react';
import { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleClickOnSearch = () => {
    navigate(`/search?q=${searchQuery}&page=1`);
  };

  const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <DigiLayoutBlock
        afVariation={LayoutBlockVariation.PRIMARY}
        className="home-main-block"
      >
        <DigiLayoutContainer afNoGutter className="home-top-section">
          <DigiTypography>
            <span className="motivational-span">Sök jobb här hos Diggilo!</span>
            <h2>... Jobs listed</h2>
            <p>
              Är du redo att ta nästa stora steg i din karriär? Sök bland
              hundratals lediga tjänster från olika branscher och hitta den roll
              som passar dina färdigheter och ambitioner. Vi är här för att
              hjälpa dig att nå dina mål och ta din karriär till nya höjder.
              Sätt igång och upptäck ditt drömjobb idag!
            </p>
          </DigiTypography>
        </DigiLayoutContainer>
        <DigiLayoutContainer afNoGutter className="home-middle-section">
          <DigiFormInputSearch
            afLabel="Sök Här"
            afVariation={FormInputSearchVariation.MEDIUM}
            afType={FormInputType.SEARCH}
            afButtonText="Sök"
            className="home-search-container"
            onAfOnClick={handleClickOnSearch}
            onAfOnInput={handleInputChange}
          ></DigiFormInputSearch>
        </DigiLayoutContainer>
        <DigiLayoutContainer afNoGutter className="home-bottom-section">
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
        </DigiLayoutContainer>
      </DigiLayoutBlock>
    </>
  );
};


