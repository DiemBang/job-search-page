import { FlexContainer } from '../../components/styled/shared/FlexContainer';
import { useContext } from 'react';
import JobContext from '../../context/JobContext';
import { numberToWords } from '../../utils/numberStringUtils';
import JobPostalAddress from './JobPostalAddress';
import { createInformationFields } from '../../utils/arrayUtils';
import { DigiLinkExternal } from '@digi/arbetsformedlingen-react';
import JobPublication from './JobPublication';

const JobInfo = () => {
  const context = useContext(JobContext);

  if (!context) return;

  const {
    occupation: {
      number_of_vacancies,
      id,
      workplace_address,
      publication_date,
      employer,
    },
  } = context;

  const vacancies = numberToWords(number_of_vacancies);
  const informationFields = createInformationFields(
    vacancies,
    id,
    employer.url
  );

  return (
    <FlexContainer $direction="column" $align="flex-start" $gap="20px">
      <JobPostalAddress address={workplace_address} employer={employer} />
      {informationFields.map(
        ({ label, value, element: Element }, index) =>
          value && (
            <FlexContainer key={index} $direction="column" $align="flex-start">
              <Element>{label}</Element>
              {value === employer.url ? (
                <DigiLinkExternal afHref="#" hideVisitedColor={true}>
                  {value}
                </DigiLinkExternal>
              ) : (
                <div>{value}</div>
              )}
            </FlexContainer>
          )
      )}
      <JobPublication publicationDate={publication_date} />
    </FlexContainer>
  );
};

export default JobInfo;
