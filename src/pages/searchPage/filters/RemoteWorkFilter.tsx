import { DigiFormFilter } from '@digi/arbetsformedlingen-react';
import useAdvertsContext from '../../../hooks/useAdvertsContext';

export const RemoteWorkFilter = () => {
  const { changeToRemoteWorkplace } = useAdvertsContext();

  return (
    <>
      <DigiFormFilter
        afFilterButtonText="Arbetsplats"
        afSubmitButtonText="Filtrera"
        afListItems={[{ id: 'endast_distans', label: 'Endast distansarbete' }]}
        onAfChangeFilter={(e) => e.detail.isChecked}
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
