import { Filters } from './filters/Filters';
import { SearchField } from './SearchField';
import { DisplaySearchResults } from './DisplaySearchResults';
import { SearchPageWrapper } from '../../components/styled/Wrappers';
import { useLoaderData } from 'react-router-dom';
import { AdvertsContextProvider } from '../../context/AdvertsContext';
import { IOccupations } from '../../types/occupation-types';
import { ModalsContextProvider } from '../../context/ModalsContext';

export const SearchPage = () => {
  const occupations = useLoaderData() as IOccupations;

  return (
    <ModalsContextProvider>
      <AdvertsContextProvider occupations={occupations}>
        <SearchPageWrapper>
          <h2>Platsbanken</h2>
          <SearchField />
          <Filters />
          <DisplaySearchResults />
          {/* Pagination */}
        </SearchPageWrapper>
      </AdvertsContextProvider>
    </ModalsContextProvider>
  );
};
