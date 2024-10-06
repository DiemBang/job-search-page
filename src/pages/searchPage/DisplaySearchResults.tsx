import { SearchResult } from './SearchResult';
import useAdvertsContext from '../../hooks/useAdvertsContext';
import { FlexContainer } from '../../components/styled/shared/FlexContainer';
import SortAds from './SortAds';
import { DigiTypography } from '@digi/arbetsformedlingen-react';

export const DisplaySearchResults = () => {
  const { ads, totalAds, totalPositions } = useAdvertsContext();

  return (
    <>
      <DigiTypography>
        <FlexContainer
          $justify="space-between"
          $padding="32px 0"
          $align="flex-start"
        >
          <h3>
            {totalAds} annonser med {totalPositions} jobb hittades
          </h3>
          <SortAds />
        </FlexContainer>
        {ads.map((ad) => (
          <SearchResult key={ad.id} ad={ad} />
        ))}
      </DigiTypography>
    </>
  );
};
