/* Temporary JSON Data used before we get props from API */
import occupations from '../../data/temp-occupations.json';
import GoBackToSearch from './GoBackToSearch';
import {
  DigiLayoutBlock,
  DigiLayoutContainer,
} from '@digi/arbetsformedlingen-react';
import { DigiTypography } from '@digi/arbetsformedlingen-react';
import { FlexContainer } from '../../components/styled/shared/FlexContainer';
import { JobContextProvider } from '../../context/JobContext';
import JobOverview from './JobOverview';
import JobDetails from './JobDetails';
import JobTitleInfo from './JobTitleInfo';
import JobApply from './JobApply';

const Job = () => {
  /* const job = useLoaderData()  */

  const occupation = occupations.hits[7];
  console.log('current occupation: ', occupation);

  return (
    <JobContextProvider occupation={occupation}>
      <FlexContainer
        $direction="column"
        $align="flex-start"
        $gap="24px"
        $maxWidth="1100px"
        $justify="left"
      >
        <DigiLayoutContainer>
          <GoBackToSearch />
        </DigiLayoutContainer>
        <DigiTypography>
          <DigiLayoutBlock afMarginBottom={true}>
            <FlexContainer $justify="space-between" $align="flex-end">
              <JobTitleInfo />
              <JobApply />
            </FlexContainer>
          </DigiLayoutBlock>
          <FlexContainer $align="flex-start" $flexWrap="wrap">
            <JobOverview />
            <JobDetails />
          </FlexContainer>
        </DigiTypography>
      </FlexContainer>
    </JobContextProvider>
  );
};

export default Job;
