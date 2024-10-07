import { FlexContainer } from '../../../../components/styled/shared/FlexContainer';
import { DigiButton, DigiFormCheckbox } from '@digi/arbetsformedlingen-react';
import useAdvertsContext from '../../../../hooks/useAdvertsContext';
import {
  ButtonSize,
  ButtonVariation,
  FormCheckboxVariation,
} from '@digi/arbetsformedlingen';
import useModalsContext from '../../../../hooks/useModalsContext';

const LocationMunicipalities = () => {
  const {
    visibleMunicipalities,
    municipalitiesQueries,
    handleClickOnMunicipality,
    resetMunicipalities,
    handleClickOnMunicipialitiesFilter,
  } = useAdvertsContext();
  const { closeAllDropDowns } = useModalsContext();

  const handleClickOnFilter = () => {
    handleClickOnMunicipialitiesFilter();
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
            resetMunicipalities(
              visibleMunicipalities ? visibleMunicipalities.categoryId : null
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
        $width="100%"
        $justify="flex-start"
        className="subcategories-panel"
      >
        {visibleMunicipalities?.visibleSubcategories.map((municipiality) => {
          const isActive = municipalitiesQueries.includes(municipiality.id);
          return (
            <FlexContainer
              $align="flex-start"
              $gap="10px"
              key={municipiality.id}
            >
              <DigiFormCheckbox
                afLabel=""
                afVariation={FormCheckboxVariation.PRIMARY}
                afChecked={isActive}
                onAfOnChange={() => handleClickOnMunicipality(municipiality.id)}
              ></DigiFormCheckbox>

              {municipiality.preferred_label}
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

export default LocationMunicipalities;
