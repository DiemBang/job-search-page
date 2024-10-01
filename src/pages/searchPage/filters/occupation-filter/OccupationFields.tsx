import { FlexContainer } from '../../../../components/styled/shared/FlexContainer';
import { DigiButton } from '@digi/arbetsformedlingen-react';
import useAdsContext from '../../../../hooks/useAdsContext';

const OccupationFields = () => {
  const { fields, handleClickOnOccupationField, resetAllFieldsAndGroups } =
    useAdsContext();
  return (
    <FlexContainer
      $direction="column"
      $align="flex-start"
      $justify="flex-start"
      $gap="24px"
      $padding="0 32px 0 0"
    >
      <FlexContainer
        $justify="space-between"
        $width="100%"
        $align="flex-start"
        $maxHeight="40px"
      >
        <h4>Yrkesområden</h4>
        <DigiButton afSize="small" onClick={resetAllFieldsAndGroups}>
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
        {fields.map((field) => {
          return (
            <DigiButton
              afVariation={field.selected ? 'primary' : 'secondary'}
              afSize="small"
              key={field.id}
              afFullWidth={true}
              onClick={() => handleClickOnOccupationField(field.id)}
              className={field.active ? 'active-category' : ''}
            >
              {field.preferred_label}
            </DigiButton>
          );
        })}
      </FlexContainer>
    </FlexContainer>
  );
};

export default OccupationFields;
