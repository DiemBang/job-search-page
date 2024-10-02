import { DigiFormFilter } from '@digi/arbetsformedlingen-react';
import useAdvertsContext from '../../../hooks/useAdvertsContext';

export const DriversLicenseFilter = () => {
  const { setDrivingLicense } = useAdvertsContext();

  const changeDrivingLicenseReq = (value: boolean) => {
    setDrivingLicense(value);
  };

  return (
    <>
      <DigiFormFilter
        afFilterButtonText="Kvalifikationer"
        afSubmitButtonText="Filtrera"
        afListItems={[{ id: 'krav_pa_korkort', label: 'Krav på körkort' }]}
        onAfChangeFilter={(e) => changeDrivingLicenseReq(e.detail.isChecked)}
        onAfResetFilter={() => console.log('reset filter')}
        onAfSubmitFilter={(e) =>
          console.log('submit filter', e.detail.listItems, e.detail.checked)
        }
        onAfCloseFilter={(e) =>
          console.log('submit filter', e.detail.listItems, e.detail.checked)
        }
      ></DigiFormFilter>
    </>
  );
};
