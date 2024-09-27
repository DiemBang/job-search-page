import { DigiLayoutBlock } from '@digi/arbetsformedlingen-react';
import JobDescription from './JobDescription';
import JobInfo from './JobInfo';
import { FlexContainer } from '../../components/styled/shared/FlexContainer';

const JobOverview = () => {
  return (
    <FlexContainer $maxWidth="720px" $width="100%">
      <DigiLayoutBlock afVerticalPadding={true}>
        <FlexContainer $direction="column" $align="flex-start" $gap="20px">
          <JobDescription />
          <JobInfo />
        </FlexContainer>
      </DigiLayoutBlock>
    </FlexContainer>
  );
};

export default JobOverview;
