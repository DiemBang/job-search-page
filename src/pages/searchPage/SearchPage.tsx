import { Filters } from './filters/Filters';
import { SearchField } from './SearchField';
import { DisplaySearchResults } from './DisplaySearchResults';
import { SearchPageWrapper } from '../../components/styled/Wrappers';
import { useLoaderData } from 'react-router-dom';
import { AdvertsContextProvider } from '../../context/AdvertsContext';
import { IOccupations } from '../../types/occupation-types';
import { ModalsContextProvider } from '../../context/ModalsContext';
import Map from './Map';
import { DigiTypography } from '@digi/arbetsformedlingen-react';

export const SearchPage = () => {
  const occupations = useLoaderData() as IOccupations;

  return (
    <ModalsContextProvider>
      <AdvertsContextProvider occupations={occupations}>
        <DigiTypography>
          <SearchPageWrapper className='search-page'>
            <h2>Platsbanken</h2>
            <SearchField />
            <Filters />
            <DisplaySearchResults />
            {/* Pagination */}
            {occupations.hits.length > 0 && <Map />}
        </SearchPageWrapper>
        </DigiTypography>
      </AdvertsContextProvider>
    </ModalsContextProvider>
  );
};
