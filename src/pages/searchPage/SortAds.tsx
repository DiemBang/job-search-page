import { FormSelectVariation } from '@digi/arbetsformedlingen';
import { DigiFormSelect } from '@digi/arbetsformedlingen-react';
import useAdvertsContext from '../../hooks/useAdvertsContext';
import { useState } from 'react';
import { DigiFormSelectCustomEvent } from '@digi/arbetsformedlingen/dist/types/components';

const SortAds = () => {
  const { changeSortingOnSelect, adsData, queries } = useAdvertsContext();
  let selectValue: string;

  const initialSort = queries.find((q) => q.query === 'sort=');
  if (initialSort?.value === 'relevance') {
    selectValue = 'Relevans';
  } else if (initialSort?.value === 'applydate-desc') {
    selectValue = 'Ansökningsdatum';
  } else if (initialSort?.value === 'pubdate-desc') {
    selectValue = 'Publiceringsdatum';
  } else {
    selectValue = 'Relevans';
  }
  const [selectedOption, setSelectedOption] = useState(selectValue);

  const handleSelectChange = (
    e: DigiFormSelectCustomEvent<HTMLDigiFormSelectElement>
  ) => {
    const target = e.target as HTMLDigiFormSelectElement;
    setSelectedOption(target.value);
    changeSortingOnSelect(e);
  };

  if (adsData?.hits.length === 0) {
    return null;
  }

  return (
    <DigiFormSelect
      afLabel="Sortera efter"
      afVariation={FormSelectVariation.MEDIUM}
      afDisableValidation={true}
      afValue={selectedOption}
      onAfOnSelect={(e) => handleSelectChange(e)}
      className="sort-selector"
    >
      <option value="Relevans">Relevans</option>
      <option value="Publiceringsdatum">Publiceringsdatum</option>
      <option value="Ansökningsdatum">Ansökningsdatum</option>
    </DigiFormSelect>
  );
};

export default SortAds;
