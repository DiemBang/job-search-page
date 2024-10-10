import { FlexContainer } from '../../../../components/styled/shared/FlexContainer';
import { DigiButton } from '@digi/arbetsformedlingen-react';
import useAdvertsContext from '../../../../hooks/useAdvertsContext';

const LocationRegions = () => {
  const { regions, handleClickOnRegion, resetAllRegionsAndMunicipalities } =
    useAdvertsContext();

  return (
    <FlexContainer
      $direction="column"
      $align="flex-start"
      $justify="flex-start"
      $gap="24px"
      $padding="0 24px"
    >
      <FlexContainer
        $justify="space-between"
        $width="100%"
        $align="flex-start"
        $maxHeight="40px"
        $padding="0 0 10px 0"
        className="filter-title"
      >
        <h4>Län</h4>
        <DigiButton afSize="small" onClick={resetAllRegionsAndMunicipalities}>
          Rensa
        </DigiButton>
      </FlexContainer>
      <FlexContainer
        $direction="column"
        $align="flex-start"
        $justify="space-between"
        $maxHeight="850px"
        $padding="0 0 16px 0"
      >
        {regions.map((region) => {
          return (
            <DigiButton
              afVariation={region.selected ? 'primary' : 'secondary'}
              afSize="small"
              key={region.id}
              afFullWidth={true}
              onClick={() => handleClickOnRegion(region.id)}
              className={region.active ? 'active-category' : ''}
            >
              {region.preferred_label}
            </DigiButton>
          );
        })}
      </FlexContainer>
    </FlexContainer>
  );
};

export default LocationRegions;
