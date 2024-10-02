import { DigiFormFilter } from "@digi/arbetsformedlingen-react";
import { useEffect } from "react";
import useAdvertsContext from "../../../hooks/useAdvertsContext";

export const RemoteWorkFilter = () => {
  const { remoteWorkplace, setRemoteWorkplace, createFilterParams, getData } =
    useAdvertsContext();

  const changeToRemoteWorkplace = (isChecked: boolean) => {
    setRemoteWorkplace(isChecked);
  };

  // Create filter params after each change of remote workplace
  useEffect(() => {
    const filterParams = createFilterParams();
    getData(filterParams);
  }, [remoteWorkplace]);

  return (
    <>
      <DigiFormFilter
        afFilterButtonText="Arbetsplats"
        afSubmitButtonText="Filtrera"
        afListItems={[{ id: "endast_distans", label: "Endast distansarbete" }]}
        onAfChangeFilter={(e) => (e.detail.isChecked)}
        onAfResetFilter={() => console.log("reset filter")}
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
