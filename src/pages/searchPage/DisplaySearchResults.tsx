import { SearchResult } from './SearchResult';
import useAdvertsContext from '../../hooks/useAdvertsContext';
import { FlexContainer } from '../../components/styled/shared/FlexContainer';
import SortAds from './SortAds';

export const DisplaySearchResults = () => {
  const { adsData } = useAdvertsContext();

  return (
    <>
      <FlexContainer
        $justify="space-between"
        $padding="32px 0"
        $align="flex-start"
      >
        {adsData?.total.value && adsData.positions ? (
          <h3>
            {adsData?.total.value} annonser med {adsData?.positions} jobb
            hittades
          </h3>
        ) : null}
        <SortAds />
      </FlexContainer>

      {adsData?.hits.map((ad) => (
        <SearchResult key={ad.id} ad={ad} />
      ))}
    </>
  );
};
