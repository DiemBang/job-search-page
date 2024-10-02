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
  const isAllFieldsEmpty = (obj: IApplicationContact): boolean => {
    return Object.values(obj).every((value) => value === null || value === '');
  };

  const validContacts = contacts.filter(
    (contact) => !isAllFieldsEmpty(contact)
  );

  if (validContacts.length === 0) {
    return null;
  }

  return (
    <DigiInfoCard
      afHeading="Kontakt"
      afHeadingLevel={InfoCardHeadingLevel.H6}
      afType={InfoCardType.TIP}
      afVariation={InfoCardVariation.SECONDARY}
      afSize={InfoCardSize.STANDARD}
    >
      <FlexContainer $align="flex-start" $direction="column" $gap="10px">
        {validContacts.map((contact, index) => {
          const { name, contact_type, email, telephone } = contact;

          const hasContactInfo = name || contact_type || email || telephone;

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
                {hasContactInfo ? (
                  <>
                    {(name || contact_type) && (
                      <div>
                        {name && name}
                        {name && contact_type
                          ? `, ${contact_type}`
                          : contact_type}
                      </div>
                    )}
                    {email && (
                      <DigiLink afHref="#" hideVisitedColor={true}>
                        {email}
                      </DigiLink>
                    )}
                    {telephone && <div>{telephone}</div>}
                  </>
                ) : (
                  <div>Uppgifter saknas</div>
                )}
              </FlexContainer>
            </FlexContainer>
          );
        })}
      </FlexContainer>
    </DigiInfoCard>
  );
};

export default JobContact;
