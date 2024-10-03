import { DigiButton, DigiTypography } from '@digi/arbetsformedlingen-react';
import { FlexContainer } from '../../../../components/styled/shared/FlexContainer';
import OccupationFilterDropDown from './OccupationFilterDropDown';
import useModalsContext from '../../../../hooks/useModalsContext';
import { ButtonVariation } from '@digi/arbetsformedlingen';
import { DigiIconFilter } from '@digi/arbetsformedlingen-react';

export const OccupationFilter = () => {
  const { isDropDownsOpen, toggleDropDown } = useModalsContext();

  return (
    <DigiTypography>
      <FlexContainer className="occupation-filter">
        <DigiButton
          afVariation={ButtonVariation.SECONDARY}
          onClick={() => toggleDropDown('occupationOpen')}
        >
          <span>Yrkesområde</span>
          <DigiIconFilter slot="icon-secondary" />
        </DigiButton>
        {isDropDownsOpen.occupationOpen && <OccupationFilterDropDown />}
      </FlexContainer>
    </DigiTypography>
  );
};
