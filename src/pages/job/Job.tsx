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
import { useLoaderData } from 'react-router-dom';
import { IOccupation } from '../../types/occupation-types';
import ScrollToTop from '../../components/shared/ScrollToTop';

const Job = () => {
  const occupation = useLoaderData() as IOccupation;

  return (
    <JobContextProvider occupation={occupation}>
      <ScrollToTop />
      <FlexContainer
        $direction="column"
        $align="flex-start"
        $gap="24px"
        $maxWidth="1100px"
        $justify="left"
        $padding="55px 0"
      >
        <DigiLayoutContainer>
          <GoBackToSearch />
        </DigiLayoutContainer>
        <DigiTypography>
          <DigiLayoutBlock>
            <FlexContainer
              $justify="space-between"
              $align="flex-end"
              $padding="24px 0"
            >
              <JobTitleInfo />
              <JobApply />
            </FlexContainer>
          </DigiLayoutBlock>
          <FlexContainer
            $align="flex-start"
            $flexWrap="wrap"
            $gap="10px"
            $padding="10px 0 0 0"
          >
            <JobOverview />
            <JobDetails />
          </FlexContainer>
        </DigiTypography>
      </FlexContainer>
    </JobContextProvider>
  );
};

export default Job;
