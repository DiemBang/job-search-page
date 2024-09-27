import { useContext } from 'react';
import JobContext from '../../context/JobContext';
import { FlexContainer } from '../../components/styled/shared/FlexContainer';

const JobDescription = () => {
  const context = useContext(JobContext);

  if (!context) return;

  const { occupation } = context;

  return (
    <FlexContainer $direction="column" $align="flex-start" $gap="8px">
      <h2>Om Tjänsten</h2>
      <div className="line-breaks">{occupation.description.text}</div>
    </FlexContainer>
  );
};

export default JobDescription;
