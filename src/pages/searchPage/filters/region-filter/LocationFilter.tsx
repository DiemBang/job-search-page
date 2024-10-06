import { DigiButton, DigiTypography } from '@digi/arbetsformedlingen-react';
import { FlexContainer } from '../../../../components/styled/shared/FlexContainer';
import LocationFilterDropdown from './LocationFilterDropdown';
import useModalsContext from '../../../../hooks/useModalsContext';
import { ButtonVariation } from '@digi/arbetsformedlingen';
import { DigiIconFilter } from '@digi/arbetsformedlingen-react';

export const LocationFilter = () => {
  const { isDropDownsOpen, toggleDropDown } = useModalsContext();

  return (
    <DigiTypography>
      <FlexContainer className="occupation-filter">
        <DigiButton
          afVariation={ButtonVariation.SECONDARY}
          onClick={() => toggleDropDown('locationOpen')}
        >
          <span>Ort</span>
          <DigiIconFilter slot="icon-secondary" />
        </DigiButton>
        {isDropDownsOpen.locationOpen && <LocationFilterDropdown />}
      </FlexContainer>
    </DigiTypography>
  );
};
