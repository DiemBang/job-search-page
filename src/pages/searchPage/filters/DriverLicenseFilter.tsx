import { DigiFormFilter } from "@digi/arbetsformedlingen-react";

export const DriverLicenseFilter = () => {
    return (
        <>
        <DigiFormFilter
          afFilterButtonText="Kvalifikationer"
          afSubmitButtonText="Filtrera"
          afListItems={[
            { id: "krav_pa_korkort", label: "Krav på körkort" }
          ]}
          afCheckItems={["krav_pa_korkort"]} // optional, override internal check state of component with filter ids
          onAfChangeFilter={(e) => console.log(e.detail.id, e.detail.isChecked)}
          onAfResetFilter={() => console.log("reset filter")}
          onAfSubmitFilter={(e) =>
            console.log("submit filter", e.detail.listItems, e.detail.checked)
          }
          onAfCloseFilter={(e) =>
            console.log("submit filter", e.detail.listItems, e.detail.checked)
          }
        ></DigiFormFilter>
        
        </>
    )
}