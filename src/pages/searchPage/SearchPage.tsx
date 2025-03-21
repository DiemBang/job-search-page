import { Filters } from './filters/Filters';
import { SearchField } from './SearchField';
import { DisplaySearchResults } from './DisplaySearchResults';
import { SearchPageWrapper } from '../../components/styled/Wrappers';
import { useLoaderData } from 'react-router-dom';
import { IOccupations } from '../../types/occupation-types';
import { AdvertsContextProvider } from '../../context/AdvertsContext';
import { ModalsContextProvider } from '../../context/ModalsContext';
import Map from './Map';
import { DigiTypography } from '@digi/arbetsformedlingen-react';
import { Pagination } from '../../components/shared/Pagination';
import { IQuery } from '../../types/types';

export const SearchPage = () => {
  const { occupationsData, initialQueries } = useLoaderData() as {
    occupationsData: IOccupations;
    initialQueries: IQuery[];
  };
  return (
    <AdvertsContextProvider
      occupations={occupationsData}
      initialQueries={initialQueries}
    >
      <ModalsContextProvider>
        <DigiTypography>
          <SearchPageWrapper className="search-page">
            <h2>Platsbanken</h2>
            <SearchField />
            <Filters />
            <DisplaySearchResults />
            <Pagination></Pagination>
            {occupationsData.hits.length > 0 && <Map />}
          </SearchPageWrapper>
        </DigiTypography>
      </ModalsContextProvider>
    </AdvertsContextProvider>
  );
};
