import { DigiTypographyTime } from '@digi/arbetsformedlingen-react';
import { FlexContainer } from '../../components/styled/shared/FlexContainer';
import { formatToTimeFromIsoDate } from '../../utils/dateUtils';

interface IJobPublicationProps {
  publicationDate: string;
}

const JobPublication = ({ publicationDate }: IJobPublicationProps) => {
  const publicationTime = formatToTimeFromIsoDate(publicationDate);

  return (
    <FlexContainer $direction="column" $align="flex-start">
      <h3>Publicerad</h3>
      <FlexContainer $gap="4px">
        <DigiTypographyTime
          afVariation="pretty"
          afDateTime={publicationDate}
        ></DigiTypographyTime>
        <div>{publicationTime}</div>
      </FlexContainer>
    </FlexContainer>
  );
};

export default JobPublication;
