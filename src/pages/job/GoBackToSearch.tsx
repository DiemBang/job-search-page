import { DigiButton, DigiIconArrowLeft } from '@digi/arbetsformedlingen-react';
import { FlexContainer } from '../../components/styled/shared/FlexContainer';
import { useNavigate } from 'react-router-dom';

const GoBackToSearch = () => {
  const navigate = useNavigate();

  const handleClickOnGoBack = () => {
    navigate(-1)
  }

  return (
    <DigiButton afSize="large" onClick={handleClickOnGoBack}>
      <FlexContainer $gap="10px">
        <DigiIconArrowLeft />
        Tillbaka
      </FlexContainer>
    </DigiButton>
  );
};

export default GoBackToSearch;
