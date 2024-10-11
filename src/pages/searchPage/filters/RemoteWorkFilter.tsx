import { DigiFormFilter } from '@digi/arbetsformedlingen-react';
import useAdvertsContext from '../../../hooks/useAdvertsContext';
import { useState, useEffect } from 'react';

export const RemoteWorkFilter = () => {
  const { changeToRemoteWorkplace } = useAdvertsContext();
  const [checkedList, setCheckedList] = useState<string[]>([]);

  useEffect(() => {
    // check URL to see if needs to add to checkedList
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.split('?')[1]);
    const remoteWorkParams = urlParams.getAll('remote');
    if (remoteWorkParams.includes('true')) {
      setCheckedList(['endast_distans']);
    }
  }, []);

  return (
    <>
      <DigiFormFilter
        afFilterButtonText="Arbetsplats"
        afSubmitButtonText="Filtrera"
        afListItems={[{ id: 'endast_distans', label: 'Endast distansarbete' }]}
        onAfChangeFilter={(e) => e.detail.isChecked}
        afCheckItems={checkedList}
        onAfResetFilter={() => {
          changeToRemoteWorkplace(false);
        }}
        onAfSubmitFilter={(e) =>
          changeToRemoteWorkplace(e.detail.checked.includes('endast_distans'))
        }
        onAfCloseFilter={(e) =>
          changeToRemoteWorkplace(e.detail.checked.includes('endast_distans'))
        }
      ></DigiFormFilter>
    </>
  );
};
