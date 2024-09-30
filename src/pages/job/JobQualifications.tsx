import { FlexContainer } from '../../components/styled/shared/FlexContainer';
import { DigiInfoCard } from '@digi/arbetsformedlingen-react';
import {
  InfoCardType,
  InfoCardHeadingLevel,
  InfoCardVariation,
  InfoCardSize,
} from '@digi/arbetsformedlingen';
import { IHave } from '../../types/occupation-types';

interface IJobQualificationsProps {
  mustHave: IHave;
  niceToHave: IHave;
}

const renderQualificationSection = (
  title: string,
  items: Array<{ label: string }>,
  subtitle: string
) => {
  if (items.length === 0) return null;

  return (
    <div>
      <h3>{title}</h3>
      <h4>{subtitle}</h4>
      {items.map((item, index) => (
        <div key={index}>- {item.label}</div>
      ))}
    </div>
  );
};

const JobQualifications = ({
  mustHave,
  niceToHave,
}: IJobQualificationsProps) => {
  const isAllEmpty = (obj: IHave) => {
    return Object.values(obj).every((arr) => arr.length === 0);
  };

  const bothAreEmpty = isAllEmpty(mustHave) && isAllEmpty(niceToHave);

  if (bothAreEmpty) {
    return null;
  }

  return (
    <FlexContainer $width="100%">
      <DigiInfoCard
        afHeading="Kvalifikationer"
        afHeadingLevel={InfoCardHeadingLevel.H3}
        afType={InfoCardType.TIP}
        afVariation={InfoCardVariation.SECONDARY}
        afSize={InfoCardSize.STANDARD}
      >
        <FlexContainer $direction="column" $align="flex-start" $gap="10px">
          {renderQualificationSection('Färdigheter', mustHave.skills, 'Krav')}
          {renderQualificationSection('Språk', mustHave.languages, 'Krav')}
          {renderQualificationSection(
            'Arbetserfarenhet',
            mustHave.work_experiences,
            'Krav'
          )}
          {renderQualificationSection('Utbildning', mustHave.education, 'Krav')}
          {renderQualificationSection(
            'Utbildningsnivå',
            mustHave.education_level,
            'Krav'
          )}
          {renderQualificationSection(
            'Färdigheter',
            niceToHave.skills,
            'Meriterande'
          )}
          {renderQualificationSection(
            'Språk',
            niceToHave.languages,
            'Meriterande'
          )}
          {renderQualificationSection(
            'Arbetserfarenhet',
            niceToHave.work_experiences,
            'Meriterande'
          )}
          {renderQualificationSection(
            'Utbildning',
            niceToHave.education,
            'Meriterande'
          )}
          {renderQualificationSection(
            'Utbildningsnivå',
            niceToHave.education_level,
            'Meriterande'
          )}
        </FlexContainer>
      </DigiInfoCard>
    </FlexContainer>
  );
};

export default JobQualifications;
