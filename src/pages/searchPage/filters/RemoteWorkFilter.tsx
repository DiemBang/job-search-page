import { DigiFormFilter } from "@digi/arbetsformedlingen-react";
import useAdvertsContext from "../../../hooks/useAdvertsContext";

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
        afListItems={[{ id: "endast_distans", label: "Endast distansarbete" }]}
        onAfChangeFilter={(e) => e.detail.isChecked}
        onAfResetFilter={() => {
          changeToRemoteWorkplace(false);
        }}
        onAfSubmitFilter={(e) =>
          changeToRemoteWorkplace(e.detail.checked.includes("endast_distans"))
        }
        onAfCloseFilter={(e) =>
          console.log("submit filter", e.detail.listItems, e.detail.checked)
        }
      ></DigiFormFilter>
    </>
  );
};
