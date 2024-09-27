import { DigiInfoCard, DigiLink } from '@digi/arbetsformedlingen-react';
import { FlexContainer } from '../../components/styled/shared/FlexContainer';
import {
  InfoCardType,
  InfoCardHeadingLevel,
  InfoCardVariation,
  InfoCardSize,
} from '@digi/arbetsformedlingen';
import { DigiIconUserAlt } from '@digi/arbetsformedlingen-react';
import { IApplicationContact } from '../../types/occupation-types';

interface IJobContactProps {
  contacts: IApplicationContact[];
}

const JobContact = ({ contacts }: IJobContactProps) => {
  return (
    <DigiInfoCard
      afHeading="Kontakt"
      afHeadingLevel={InfoCardHeadingLevel.H6}
      afType={InfoCardType.TIP}
      afVariation={InfoCardVariation.SECONDARY}
      afSize={InfoCardSize.STANDARD}
    >
      <FlexContainer $align="flex-start" $direction="column" $gap="10px">
        {contacts.length > 0 &&
          contacts.map((contact, index) => {
            const { name, contact_type, email, telephone } = contact;
            return (
              <FlexContainer
                key={index}
                $justify="flex-start"
                $align="flex-start"
                $gap="8px"
                $width="100%"
              >
                <DigiIconUserAlt />
                <FlexContainer
                  $direction="column"
                  $gap="10px"
                  $align="flex-start"
                  $padding="0 0 0 10px"
                >
                  <div>
                    {`${name ? `${name}, ${contact_type}` : `${contact_type}`}`}
                  </div>
                  <DigiLink afHref="#" hideVisitedColor={true}>
                    {email}
                  </DigiLink>
                  <div>{telephone}</div>
                </FlexContainer>
              </FlexContainer>
            );
          })}
      </FlexContainer>
    </DigiInfoCard>
  );
};

export default JobContact;
