import { DigiFormFilter } from '@digi/arbetsformedlingen-react';
import useAdvertsContext from '../../../hooks/useAdvertsContext';
import { useState, useEffect } from 'react';

export const LanguageFilter = () => {
  const { changeLanguage } = useAdvertsContext();
  const [checkedList, setCheckedList] = useState<string[]>([]);

  useEffect(() => {
    // check URL to see if needs to add to checkedList
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.split('?')[1]);
    const languageParams = urlParams.getAll('language');
    const checkedValues: string[] = [];

    if (languageParams.includes('zSLA_vw2_FXN')) {
      checkedValues.push('sv');
    } else if (languageParams.includes('NVxJ_hLg_TYS')) {
      checkedValues.push('eng');
    }

    setCheckedList(checkedValues);
  }, []);

  return (
    <>
      <DigiFormFilter
        afFilterButtonText="Språk"
        afSubmitButtonText="Filtrera"
        afListItems={[
          { id: 'sv', label: 'Svenska' },
          { id: 'eng', label: 'Engelska' },
        ]}
        onAfChangeFilter={(e) => console.log(e.detail.id, e.detail.isChecked)}
        afCheckItems={checkedList}
        onAfResetFilter={() => {
          changeLanguage([]);
        }}
        onAfSubmitFilter={(e) => changeLanguage(e.detail.checked)}
        onAfCloseFilter={(e) => changeLanguage(e.detail.checked)}
      ></DigiFormFilter>
    </>
  );
};
