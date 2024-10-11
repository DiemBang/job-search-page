import { DigiFormFilter } from '@digi/arbetsformedlingen-react';
import useAdvertsContext from '../../../hooks/useAdvertsContext';
import { useEffect, useState } from 'react';

export const DriversLicenseFilter = () => {
  const { changeDrivingLicenseReq } = useAdvertsContext();
  const [checkedList, setCheckedList] = useState<string[]>([]);

  useEffect(() => {
    // check URL to see if needs to add to checkedList
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.split('?')[1]);
    const drivingLicenseParams = urlParams.getAll('driving-license-required');
    if (drivingLicenseParams.includes('true')) {
      setCheckedList(['krav_pa_korkort']);
    }
  }, []);

  return (
    <>
      <DigiFormFilter
        afFilterButtonText="Kvalifikationer"
        afSubmitButtonText="Filtrera"
        afListItems={[{ id: 'krav_pa_korkort', label: 'Krav på körkort' }]}
        onAfChangeFilter={(e) => console.log(e.detail.isChecked)}
        afCheckItems={checkedList}
        onAfResetFilter={() => {
          changeDrivingLicenseReq(false);
        }}
        onAfSubmitFilter={(e) =>
          changeDrivingLicenseReq(e.detail.checked.includes('krav_pa_korkort'))
        }
        onAfCloseFilter={(e) =>
          changeDrivingLicenseReq(e.detail.checked.includes('krav_pa_korkort'))
        }
      ></DigiFormFilter>
    </>
  );
};
