import { DigiLayoutBlock } from '@digi/arbetsformedlingen-react';
import JobSocialMedia from './JobSocialMedia';
import JobContact from './JobContact';
import JobQualifications from './JobQualifications';
import { FlexContainer } from '../../components/styled/shared/FlexContainer';
import JobPay from './JobPay';
import { useContext } from 'react';
import JobContext from '../../context/JobContext';

const JobDetails = () => {
  const context = useContext(JobContext);

  if (!context) return;

  const {
    occupation: {
      application_contacts,
      salary_type,
      salary_description,
      must_have,
      nice_to_have,
    },
  } = context;

  return (
    <FlexContainer $width="100%" $maxWidth="350px">
      <DigiLayoutBlock afVerticalPadding={true}>
        <FlexContainer $direction="column" $align="flex-start" $gap="30px">
          <JobQualifications mustHave={must_have} niceToHave={nice_to_have} />
          <JobPay salaryType={salary_type} salaryDesc={salary_description} />
          <JobContact contacts={application_contacts} />
          <JobSocialMedia />
        </FlexContainer>
      </DigiLayoutBlock>
    </FlexContainer>
  );
};

export default JobDetails;
