import { Filters } from "./filters/Filters";
import { SearchField } from "./SearchField";
import { DisplaySearchResults } from "./DisplaySearchResults";


export const SearchPage = () => {
  return (
    <>
      <h2>Search Page</h2>
      <SearchField />
      <Filters />
      <section>
        <DisplaySearchResults />
      </section>
      <section>
        {/* Pagination */}
      </section>
    </>
  );
};
