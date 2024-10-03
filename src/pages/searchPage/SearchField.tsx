import {
  FormInputSearchVariation,
  FormInputType,
} from '@digi/arbetsformedlingen';
import { DigiFormInputSearch } from '@digi/arbetsformedlingen-react';
import useAdvertsContext from '../../hooks/useAdvertsContext';
import { useState } from 'react';

export const SearchField = () => {
  const { handleClickOnSearch } = useAdvertsContext();

  const [searchValue, setSearchValue] = useState('');

  const handleSearchInputOnChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <section>
      <DigiFormInputSearch
        afLabel="Sök på ett eller flera ord"
        afVariation={FormInputSearchVariation.MEDIUM}
        afType={FormInputType.SEARCH}
        afButtonText="Sök"
        onAfOnInput={(e) => handleSearchInputOnChange(e.target.value)}
        onAfOnClick={() => handleClickOnSearch(searchValue)}
      ></DigiFormInputSearch>
    </section>
  );
};
