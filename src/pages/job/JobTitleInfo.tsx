import { useContext } from 'react';
import JobContext from '../../context/JobContext';
import { FlexContainer } from '../../components/styled/shared/FlexContainer';

const JobTitleInfo = () => {
  const context = useContext(JobContext);

  if (!context) return;

  const {
    occupation: {
      headline,
      logo_url,
      employer,
      working_hours_type,
      duration,
      workplace_address,
      occupation_group,
    },
  } = context;

  const { name } = employer;
  const { municipality } = workplace_address;
  const { preferred_label } = occupation_group;

  return (
    <FlexContainer $direction="column" $align="flex-start">
      <FlexContainer $gap="16px" $direction="column" $align="flex-start">
        {logo_url && (
          <img
            src={logo_url}
            alt="employer logo"
            width="92px"
            height="64px"
          ></img>
        )}
        <h1>{headline}</h1>
      </FlexContainer>
      <FlexContainer $direction="column" $align="flex-start">
        <h2>{preferred_label}</h2>
        <h3>{municipality}</h3>
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
