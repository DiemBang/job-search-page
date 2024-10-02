import { DigiFormFilter } from "@digi/arbetsformedlingen-react";
import useAdvertsContext from "../../../hooks/useAdvertsContext";

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
        afListItems={[{ id: "krav_pa_korkort", label: "Krav på körkort" }]}
        onAfChangeFilter={(e) => console.log(e.detail.isChecked)}
        onAfResetFilter={() => {
          changeDrivingLicenseReq(false);
        }}
        onAfSubmitFilter={(e) =>
          changeDrivingLicenseReq(e.detail.checked.includes("krav_pa_korkort"))
        }
        onAfCloseFilter={(e) =>
          console.log("submit filter", e.detail.listItems, e.detail.checked)
        }
      ></DigiFormFilter>
    </>
  );
};
