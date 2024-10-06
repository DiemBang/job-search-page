import { FlexContainer } from '../../../../components/styled/shared/FlexContainer';
import { DigiButton, DigiFormCheckbox } from '@digi/arbetsformedlingen-react';
import useAdvertsContext from '../../../../hooks/useAdvertsContext';
import { FormCheckboxVariation } from '@digi/arbetsformedlingen';

const LocationMunicipalities = () => {
  const {
    visibleMunicipalities,
    municipalitiesQueries,
    handleClickOnMunicipality,
    resetMunicipalities,
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
        $justify="flex-start"
        className="subcategories-panel"
      >
        <DigiFormCheckbox
          afLabel="Alla kommuner"
          afVariation={FormCheckboxVariation.PRIMARY}
          onAfOnChange={() => console.log('click')}
        ></DigiFormCheckbox>
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
    </FlexContainer>
  );
};

export default LocationMunicipalities;
