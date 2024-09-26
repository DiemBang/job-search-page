import { SearchField } from "./SearchField";
import { LocationFilter } from "./filters/LocationFilter";
import { OccupationFilter } from "./filters/OccupationFilter";
import { WorkTimeExtentFilter } from "./filters/WorktimeExtentFilter";

export const SearchPage = () => {
  return (
    <>
      <h2>Search Page</h2>
      <SearchField />
      <section>
        <h3>Filtrera din sökning</h3>
        <LocationFilter />
        <OccupationFilter />
        <WorkTimeExtentFilter />
      </section>
      <section>
        {/* Result section */}
      </section>
      <section>
        {/* Pagination */}
      </section>
    </>
  );
};
