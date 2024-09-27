import { FlexContainer } from '../../components/styled/shared/FlexContainer';
import { ISalaryType } from '../../types/occupation-types';
import { DigiInfoCard } from '@digi/arbetsformedlingen-react';
import {
  InfoCardType,
  InfoCardHeadingLevel,
  InfoCardVariation,
  InfoCardSize,
} from '@digi/arbetsformedlingen';

interface IJobPayProps {
  salaryType: ISalaryType;
  salaryDesc: string | null;
}

const JobPay = ({ salaryType, salaryDesc }: IJobPayProps) => {
  return (
    <DigiInfoCard
      afHeading="Lön"
      afHeadingLevel={InfoCardHeadingLevel.H3}
      afType={InfoCardType.TIP}
      afVariation={InfoCardVariation.SECONDARY}
      afSize={InfoCardSize.STANDARD}
    >
      <FlexContainer $direction="column" $align="flex-start">
        <div>{salaryDesc}</div>
        <div>{salaryType.label}</div>
      </FlexContainer>
    </DigiInfoCard>
  );
};

export default JobPay;
