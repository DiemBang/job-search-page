import {
  DigiIconTwitter,
  DigiIconFacebookSquare,
  DigiIconEnvelope,
  DigiIconLinkedinIn,
  DigiInfoCard,
  DigiLink,
} from '@digi/arbetsformedlingen-react';
import {
  InfoCardType,
  InfoCardHeadingLevel,
  InfoCardVariation,
  InfoCardSize,
} from '@digi/arbetsformedlingen';

import { FlexContainer } from '../../components/styled/shared/FlexContainer';

const JobSocialMedia = () => {
  return (
    <DigiInfoCard
      afHeading="Dela Annonsen"
      afHeadingLevel={InfoCardHeadingLevel.H3}
      afType={InfoCardType.TIP}
      afVariation={InfoCardVariation.SECONDARY}
      afSize={InfoCardSize.STANDARD}
    >
      <FlexContainer $justify="space-between" $gap="6px" $flexWrap="wrap">
        <DigiLink afHref="#" hideVisitedColor={true}>
          <DigiIconEnvelope />
          Email
        </DigiLink>
        <DigiLink afHref="#" hideVisitedColor={true}>
          <DigiIconFacebookSquare />
          Facebook
        </DigiLink>
        <DigiLink afHref="#" hideVisitedColor={true}>
          <DigiIconTwitter />
          Twitter
        </DigiLink>
        <DigiLink afHref="#" hideVisitedColor={true}>
          <DigiIconLinkedinIn />
          Linkedin
        </DigiLink>
      </FlexContainer>
    </DigiInfoCard>
  );
};

export default JobSocialMedia;
