import { DigiFormFilter } from "@digi/arbetsformedlingen-react";
import { FilterContext } from "../../../context/FilterContext";
import { useContext, useEffect } from "react";
import { AdsContext } from "../../../context/AdsContext";

export const DriversLicenseFilter = () => {
  const { drivingLicense, setDrivingLicense } = useContext(FilterContext);
  const { createFilterParams, getData } = useContext(AdsContext);

  const changeDrivingLicenseReq = (value:boolean) => {
    setDrivingLicense(value);
  }

  // Create filter params after each change of driving license
  useEffect(() => {
    let filterParams = createFilterParams();
    getData(filterParams);
  }, [drivingLicense])
  
  return (
    <>
      <DigiFormFilter
        afFilterButtonText="Kvalifikationer"
        afSubmitButtonText="Filtrera"
        afListItems={[{ id: "krav_pa_korkort", label: "Krav på körkort" }]}
        // afCheckItems={["krav_pa_korkort"]} // optional, override internal check state of component with filter ids
        onAfChangeFilter={(e) => changeDrivingLicenseReq(e.detail.isChecked)}
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
