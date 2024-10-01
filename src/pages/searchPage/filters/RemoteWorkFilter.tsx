import { DigiFormFilter } from "@digi/arbetsformedlingen-react";
import { useContext, useEffect } from "react";
import { AdsContext } from "../../../context/AdsContext";
import { FilterContext } from "../../../context/FilterContext";

export const RemoteWorkFilter = () => {
  const { remoteWorkplace, setRemoteWorkplace } = useContext(FilterContext);
  const { createFilterParams, getData } = useContext(AdsContext);

  const changeToRemoteWorkplace = (isChecked: boolean) => {
    setRemoteWorkplace(isChecked);
  };

  // Create filter params after each change of remote workplace
  useEffect(() => {
    let filterParams = createFilterParams();
    getData(filterParams);
  }, [remoteWorkplace]);

  return (
    <>
      <DigiFormFilter
        afFilterButtonText="Arbetsplats"
        afSubmitButtonText="Filtrera"
        afListItems={[
          // { id: "alla", label: "Alla" },
          { id: "endast_distans", label: "Endast distansarbete" },
        ]}
        onAfChangeFilter={(e) => changeToRemoteWorkplace(e.detail.isChecked)}
        onAfResetFilter={() => console.log("reset filter")}
        onAfSubmitFilter={(e) =>
          console.log("submit filter", e.detail.listItems, e.detail.checked)
        }
        onAfCloseFilter={(e) =>
          console.log("submit filter", e.detail.listItems, e.detail.checked)
        }
      ></DigiFormFilter>
    </>
  );
};
