import { FlexContainer } from '../../../../components/styled/shared/FlexContainer';
import { DigiButton, DigiFormCheckbox } from '@digi/arbetsformedlingen-react';
import useAdvertsContext from '../../../../hooks/useAdvertsContext';
import {
  ButtonSize,
  ButtonVariation,
  FormCheckboxVariation,
} from '@digi/arbetsformedlingen';
import useModalsContext from '../../../../hooks/useModalsContext';

const OccupationGroups = () => {
  const {
    visibleGroups,
    occupationsQueries,
    handleClickOnOccupationGroup,
    resetOccupationGroups,
    handleClickOnOccupationFilter,
  } = useAdvertsContext();
  const { closeAllDropDowns } = useModalsContext();

  const handleClickOnFilter = () => {
    handleClickOnOccupationFilter();
    closeAllDropDowns();
  };

  return (
    <FlexContainer
      $direction="column"
      $gap="24px"
      $width="300px"
      $justify="flex-start"
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
        {visibleGroups?.visibleSubcategories.map((group) => {
          const isActive = occupationsQueries.includes(group.id);

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
      <DigiButton
        afSize={ButtonSize.MEDIUM}
        afVariation={ButtonVariation.PRIMARY}
        afFullWidth={false}
        onAfOnClick={handleClickOnFilter}
      >
        Filtrera Annonser
      </DigiButton>
    </FlexContainer>
  );
};

export default OccupationGroups;
