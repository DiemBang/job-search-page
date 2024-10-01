import { FlexContainer } from '../../../../components/styled/shared/FlexContainer';
import { DigiButton } from '@digi/arbetsformedlingen-react';
import useAdsContext from '../../../../hooks/useAdsContext';

const LocationMunicipalities = () => {
  const {
    visibleMunicipalities,
    activeMunicipalities,
    handleClickOnMunicipality,
    resetMunicipalities,
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
        {visibleMunicipalities?.visibleSubcategories.map((municipiality) => {
          const isActive = activeMunicipalities.includes(municipiality.id);

          return (
            <FlexContainer
              $align="flex-start"
              $gap="16px"
              key={municipiality.id}
            >
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => handleClickOnMunicipality(municipiality.id)}
              ></input>
              {/*     <DigiFormCheckbox
                afLabel=""
                onClick={(e) => handleClick(municipiality.id, e)}
                afVariation={FormCheckboxVariation.SECONDARY}
              /> */}
              {municipiality.preferred_label}
            </FlexContainer>
          );
        })}
      </FlexContainer>
    </FlexContainer>
  );
};

export default LocationMunicipalities;
