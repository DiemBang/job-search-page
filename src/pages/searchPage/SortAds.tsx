import { FormSelectVariation } from '@digi/arbetsformedlingen';
import { DigiFormSelect } from '@digi/arbetsformedlingen-react';
import useAdvertsContext from '../../hooks/useAdvertsContext';
import { useEffect, useState } from 'react';
import { DigiFormSelectCustomEvent } from '@digi/arbetsformedlingen/dist/types/components';

const SortAds = () => {
  const { changeSortingOnSelect, adsData } = useAdvertsContext();
  const [selectedOption, setSelectedOption] = useState('Relevans');

  useEffect(() => {
    // check URL to see if needs to add to checkedList
    const urlParams = new URLSearchParams(window.location.search);
    const sortParam = urlParams.get("sort");
    if (sortParam) {
      setSelectedOption(sortParam);
    }
    console.log(selectedOption, "test");

  }, []);
  
  useEffect(() => {
    console.log("Updated selected option:", selectedOption);
  }, [selectedOption]);

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
