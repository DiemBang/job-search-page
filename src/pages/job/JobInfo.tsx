import { FlexContainer } from '../../components/styled/shared/FlexContainer';
import { useContext } from 'react';
import JobContext from '../../context/JobContext';
import { numberToWords } from '../../utils/numberStringUtils';
import { formatToSwedishDate } from '../../utils/dateUtils';
import JobPostalAddress from './JobPostalAddress';
import { createInformationFields } from '../../utils/arrayUtils';
import { DigiLinkExternal } from '@digi/arbetsformedlingen-react';

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
  const publication = formatToSwedishDate(publication_date);
  const informationFields = createInformationFields(
    vacancies,
    publication,
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
                <DigiLinkExternal afHref="#">{value}</DigiLinkExternal>
              ) : (
                <div>{value}</div>
              )}
            </FlexContainer>
          )
      )}
    </FlexContainer>
  );
};

export default JobInfo;
