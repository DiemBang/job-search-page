import { LocationFilter } from "./LocationFilter";
import { OccupationFilter } from ".//OccupationFilter";
import { WorkTimeExtentFilter } from "./WorktimeExtentFilter";
import { EmploymentTypeFilter } from "./EmploymentTypeFilter";
import { RemoteWorkFilter } from "./RemoteWorkFilter";
import { DriverLicenseFilter } from "./DriverLicenseFilter";
import { EducationFilter } from "./EducationFilter";
import { LanguageFilter } from "./LanguageFilter";
import { PublicationFilter } from "./PublicationFilter";
import { FilterWrapper } from "../../../components/styled/Wrappers";

export const Filters = () => {
  return (
    <section>
        <h3>Filtrera din sökning</h3>
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
