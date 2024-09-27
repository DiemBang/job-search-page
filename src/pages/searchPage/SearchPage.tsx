import { Filters } from "./filters/Filters";
import { SearchField } from "./SearchField";
import { DisplaySearchResults } from "./DisplaySearchResults";
import { SearchPageWrapper } from "../../components/styled/Wrappers";


export const SearchPage = () => {
  return (
    <SearchPageWrapper>
      <h2>Search Page</h2>
      <SearchField />
      <Filters />
      <section>
        <DisplaySearchResults />
      </section>
      <section>
        {/* Pagination */}
      </section>
    </SearchPageWrapper>
  );
};
