import { FormSelectVariation } from '@digi/arbetsformedlingen';
import { DigiFormSelect } from '@digi/arbetsformedlingen-react';
import useAdvertsContext from '../../hooks/useAdvertsContext';
import { useState } from 'react';
import { DigiFormSelectCustomEvent } from '@digi/arbetsformedlingen/dist/types/components';

const SortAds = () => {
  const { changeSortingOnSelect } = useAdvertsContext();
  const [selectedOption, setSelectedOption] = useState('Relevans');

  const handleSelectChange = (
    e: DigiFormSelectCustomEvent<HTMLDigiFormSelectElement>
  ) => {
    const target = e.target as HTMLDigiFormSelectElement;
    setSelectedOption(target.value);
    changeSortingOnSelect(e);
  };

  return (
    <DigiFormSelect
      afLabel="Sortera efter"
      afVariation={FormSelectVariation.MEDIUM}
      afDisableValidation={true}
      afValue={selectedOption}
      onAfOnSelect={(e) => handleSelectChange(e)}
      style={{ width: '200px' }}
    >
      <option value="Relevans">Relevans</option>
      <option value="Publiceringsdatum">Rubliceringsdatum</option>
      <option value="Ansökningsdatum">Ansökningsdatum</option>
    </DigiFormSelect>
  );
};

export default SortAds;
