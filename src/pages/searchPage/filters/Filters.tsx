import { LocationFilter } from './region-filter/LocationFilter';
import { OccupationFilter } from './occupation-filter/OccupationFilter';
import { WorkTimeExtentFilter } from './WorktimeExtentFilter';
import { EmploymentTypeFilter } from './EmploymentTypeFilter';
import { RemoteWorkFilter } from './RemoteWorkFilter';
import { DriverLicenseFilter } from './DriverLicenseFilter';
import { EducationFilter } from './EducationFilter';
import { LanguageFilter } from './LanguageFilter';
import { PublicationFilter } from './PublicationFilter';
import { FilterWrapper } from '../../../components/styled/Wrappers';
import { OverlayContainer } from '../../../components/styled/shared/OverlayContainer';
import useModalsContext from '../../../hooks/useModalsContext';

export const Filters = () => {
  const { isDropDownsOpen, closeAllDropDowns } = useModalsContext();

  return (
    <section>
      <h3>Filtrera din sökning</h3>
      {isDropDownsOpen.overlay && (
        <OverlayContainer onClick={closeAllDropDowns} />
      )}
      <FilterWrapper>
        <LocationFilter />
        <OccupationFilter />
        <WorkTimeExtentFilter />
        <EmploymentTypeFilter />
        <RemoteWorkFilter />
        <DriverLicenseFilter />
        <EducationFilter />
        <LanguageFilter />
        <PublicationFilter />
      </FilterWrapper>
    </section>
  );
};
