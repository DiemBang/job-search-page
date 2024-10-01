import { FlexContainer } from '../../../../components/styled/shared/FlexContainer';
import { DigiButton } from '@digi/arbetsformedlingen-react';
import useAdsContext from '../../../../hooks/useAdsContext';

const OccupationGroups = () => {
  const {
    visibleGroups,
    activeOccupationGroups,
    handleClickOnOccupationGroup,
    resetOccupationGroups,
  } = useAdsContext();

  return (
    <FlexContainer
      $direction="column"
      $gap="24px"
      $width="300px"
      $justify="flex-start"
      $align="flex-start"
      className="subcategories-container"
      $padding="0 0 0 32px"
    >
      <FlexContainer
        $justify="space-between"
        $width="100%"
        $align="flex-start"
        $maxHeight="40px"
      >
        <h4>Yrken</h4>
        <DigiButton
          afSize="small"
          onClick={() =>
            resetOccupationGroups(
              visibleGroups ? visibleGroups?.categoryId : null
            )
          }
        >
          Rensa
        </DigiButton>
      </FlexContainer>
      <FlexContainer
        $direction="column"
        $align="flex-start"
        $gap="12px"
        $height="auto"
        $justify="flex-start"
        className="subcategories-panel"
      >
        {visibleGroups?.visibleSubcategories.map((group) => {
          const isActive = activeOccupationGroups.includes(group.id);

          return (
            <FlexContainer $align="flex-start" $gap="16px" key={group.id}>
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => handleClickOnOccupationGroup(group.id)}
              ></input>
              {group.preferred_label}
            </FlexContainer>
          );
        })}
      </FlexContainer>
    </FlexContainer>
  );
};

export default OccupationGroups;
