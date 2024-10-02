import { PositionContainer } from '../../../../components/styled/shared/PositionContainer';
import { FlexContainer } from '../../../../components/styled/shared/FlexContainer';
import OccupationFields from './OccupationFields';
import OccupationGroups from './OccupationGroups';
import useModalsContext from '../../../../hooks/useModalsContext';
import useAdvertsContext from '../../../../hooks/useAdvertsContext';

const OccupationFilterDropDown = () => {
  const { occupationRef } = useModalsContext();
  const { visibleGroups } = useAdvertsContext();

  return (
    <PositionContainer
      $position="absolute"
      $zIndex={12}
      $top="48px"
      $left="0"
      ref={occupationRef}
    >
      <FlexContainer
        $padding="24px 16px"
        $maxWidth="800px"
        className="filter-dropdown"
        $align="flex-start"
        $height="925px"
      >
        <OccupationFields />

        {visibleGroups && visibleGroups.visibleSubcategories.length > 0 && (
          <OccupationGroups />
        )}
      </FlexContainer>
    </PositionContainer>
  );
};

export default OccupationFilterDropDown;
