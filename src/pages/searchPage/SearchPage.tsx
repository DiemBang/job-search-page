import { Filters } from "./filters/Filters";
import { SearchField } from "./SearchField";
import { DisplaySearchResults } from "./DisplaySearchResults";
import { SearchPageWrapper } from "../../components/styled/Wrappers";
import { useLoaderData } from "react-router-dom";
import { IOccupations } from '../../types/occupation-types';
import { AdvertsContextProvider } from '../../context/AdvertsContext';
import { ModalsContextProvider } from "../../context/ModalsContext";
import Map from './Map';
import { DigiTypography } from '@digi/arbetsformedlingen-react';
import { Pagination } from "../../components/shared/Pagination";


export const SearchPage = () => {
  const occupations = useLoaderData() as IOccupations;
  const totalPages = Math.ceil(occupations.total.value / 20);

  return (
    <ModalsContextProvider>
      <AdvertsContextProvider occupations={occupations}>
        <DigiTypography>
          <SearchPageWrapper>
            <h2>Platsbanken</h2>
            <SearchField />
            <Filters />
            <DisplaySearchResults />
            <Pagination totalPages={totalPages} totalResults={occupations.total.value}></Pagination>
            {occupations.hits.length > 0 && <Map />}
          </SearchPageWrapper>
        </DigiTypography>
      </AdvertsContextProvider>
    </ModalsContextProvider>
  );
};