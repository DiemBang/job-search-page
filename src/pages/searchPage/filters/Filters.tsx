import { LocationFilter } from './region-filter/LocationFilter';
import { OccupationFilter } from './occupation-filter/OccupationFilter';
import { WorkTimeExtentFilter } from './WorktimeExtentFilter';
import { EmploymentTypeFilter } from './EmploymentTypeFilter';
import { RemoteWorkFilter } from './RemoteWorkFilter';
import { EducationFilter } from './EducationFilter';
import { LanguageFilter } from './LanguageFilter';
import { PublishedFilter } from './PublishedFilter';
import { FilterWrapper } from '../../../components/styled/Wrappers';
import { OverlayContainer } from '../../../components/styled/shared/OverlayContainer';
import useModalsContext from '../../../hooks/useModalsContext';
import { DriversLicenseFilter } from './DriversLicenseFilter';

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
        <DriversLicenseFilter />
        <EducationFilter />
        <LanguageFilter />
        <PublishedFilter />
      </FilterWrapper>
    </section>
  );
};
