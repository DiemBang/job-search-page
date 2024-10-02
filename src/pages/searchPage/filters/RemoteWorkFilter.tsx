import { DigiFormFilter } from '@digi/arbetsformedlingen-react';
import useAdvertsContext from '../../../hooks/useAdvertsContext';

export const RemoteWorkFilter = () => {
  const { setRemoteWorkplace } = useAdvertsContext();

  const changeToRemoteWorkplace = (isChecked: boolean) => {
    setRemoteWorkplace(isChecked);
  };

  return (
    <>
      <DigiFormFilter
        afFilterButtonText="Arbetsplats"
        afSubmitButtonText="Filtrera"
        afListItems={[
          // { id: "alla", label: "Alla" },
          { id: 'endast_distans', label: 'Endast distansarbete' },
        ]}
        onAfChangeFilter={(e) => changeToRemoteWorkplace(e.detail.isChecked)}
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
