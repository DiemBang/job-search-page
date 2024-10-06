import { SearchResult } from './SearchResult';
import useAdvertsContext from '../../hooks/useAdvertsContext';
import { FlexContainer } from '../../components/styled/shared/FlexContainer';
import SortAds from './SortAds';

export const DisplaySearchResults = () => {
  const { ads, totalAds, totalPositions } = useAdvertsContext();

  return (
    <>
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
    </>
  );
};
