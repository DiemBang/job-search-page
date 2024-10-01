import { PositionContainer } from '../../../../components/styled/shared/PositionContainer';
import { FlexContainer } from '../../../../components/styled/shared/FlexContainer';
import LocationRegions from './LocationRegions';
import LocationMunicipalities from './LocationMunicipalities';
import useModalsContext from '../../../../hooks/useModalsContext';
import useAdsContext from '../../../../hooks/useAdsContext';

const OccupationFilterDropDown = () => {
  const { locationRef } = useModalsContext();
  const { visibleMunicipalities } = useAdsContext();

  return (
    <PositionContainer
      $position="absolute"
      $zIndex={12}
      $top="48px"
      $left="0"
      ref={locationRef}
    >
      <FlexContainer
        $padding="24px 16px"
        $maxWidth="800px"
        className="filter-dropdown"
        $align="flex-start"
        $height="925px"
      >
        <LocationRegions />
        {visibleMunicipalities &&
          visibleMunicipalities.visibleSubcategories.length > 0 && (
            <LocationMunicipalities />
          )}
      </FlexContainer>
    </PositionContainer>
  );
};

export default OccupationFilterDropDown;
