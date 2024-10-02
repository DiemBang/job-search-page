import { FlexContainer } from '../../../../components/styled/shared/FlexContainer';
import { DigiButton, DigiFormCheckbox } from '@digi/arbetsformedlingen-react';
import useAdvertsContext from '../../../../hooks/useAdvertsContext';
import { FormCheckboxVariation } from '@digi/arbetsformedlingen';

const OccupationGroups = () => {
  const {
    visibleGroups,
    occupationsQuerys,
    handleClickOnOccupationGroup,
    resetOccupationGroups,
  } = useAdvertsContext();

  return (
    <FlexContainer
      $direction="column"
      $gap="24px"
      $width="300px"
      $justify="flex-start"
      $align="flex-start"
      className="subcategories-container"
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
        <DigiFormCheckbox
          afLabel="Alla yrken"
          afVariation={FormCheckboxVariation.PRIMARY}
          onAfOnChange={() => console.log('click')}
        ></DigiFormCheckbox>
        {visibleGroups?.visibleSubcategories.map((group) => {
          const isActive = occupationsQuerys.includes(group.id);

          return (
            <FlexContainer $align="flex-start" $gap="10px" key={group.id}>
              <DigiFormCheckbox
                afLabel=""
                afVariation={FormCheckboxVariation.PRIMARY}
                afChecked={isActive}
                onAfOnChange={() => handleClickOnOccupationGroup(group.id)}
              ></DigiFormCheckbox>
              {group.preferred_label}
            </FlexContainer>
          );
        })}
      </FlexContainer>
    </FlexContainer>
  );
};

export default OccupationGroups;
