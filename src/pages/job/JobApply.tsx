import { FlexContainer } from '../../components/styled/shared/FlexContainer';
import { DigiButton, DigiLinkExternal } from '@digi/arbetsformedlingen-react';
import {
  getDaysLeft,
  getDayAndMonthFromIsoString,
} from '../../utils/dateUtils';
import { useContext } from 'react';
import JobContext from '../../context/JobContext';
import { ButtonSize } from '@digi/arbetsformedlingen';

const JobApply = () => {
  const context = useContext(JobContext);

  if (!context) return;

  const {
    occupation: { application_deadline, publication_date },
  } = context;

  const daysLeft = getDaysLeft(application_deadline);
  const deadlineDay = getDayAndMonthFromIsoString(publication_date);

  return (
    <FlexContainer $direction="column" $align="flex-end" $gap="10px">
      <DigiButton afSize={ButtonSize.LARGE}>
        <span className="apply">
          <DigiLinkExternal afHref="#" hideVisitedColor={true}>
            Ansök Nu
          </DigiLinkExternal>
        </span>
      </DigiButton>
      {daysLeft > 0 ? (
        <div>
          Ansök senast {deadlineDay} ({daysLeft} dagar kvar)
        </div>
      ) : (
        <div>Tiden har gått ut</div>
      )}
    </FlexContainer>
  );
};

export default JobApply;
