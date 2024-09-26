import { useContext } from 'react';
import JobContext from '../../context/JobContext';
import { FlexContainer } from '../../components/styled/shared/FlexContainer';

const JobTitleInfo = () => {
  const context = useContext(JobContext);

  if (!context) return;

  const {
    occupation: { headline, logo_url, employer, working_hours_type, duration },
  } = context;

  const { name } = employer;

  return (
    <FlexContainer $direction="column" $align="start">
      <FlexContainer>
        <h1>{headline}</h1>
        {logo_url && (
          <img
            src={logo_url}
            alt="employer logo"
            width="24px"
            height="24px"
          ></img>
        )}
      </FlexContainer>
      <FlexContainer $direction="column" $align="flex-start">
        {name && <div>{name}</div>}
        <div>
          {working_hours_type.label} - {duration.label}
        </div>
      </FlexContainer>
    </FlexContainer>
  );
};

export default JobTitleInfo;
