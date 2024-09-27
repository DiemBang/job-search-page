import { DigiButton, DigiIconArrowLeft } from '@digi/arbetsformedlingen-react';
import { FlexContainer } from '../../components/styled/shared/FlexContainer';

const GoBackToSearch = () => {
  return (
    <DigiButton afSize="large">
      <FlexContainer $gap="10px">
        <DigiIconArrowLeft />
        Tillbaka
      </FlexContainer>
    </DigiButton>
  );
};

export default GoBackToSearch;
