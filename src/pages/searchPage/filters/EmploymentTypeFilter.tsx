import { DigiFormFilter } from "@digi/arbetsformedlingen-react";

export const EmploymentTypeFilter = () => {
    return (
        <>
        <DigiFormFilter
          afFilterButtonText="Anställningsform"
          afSubmitButtonText="Filtrera"
          afListItems={[
            { id: "tillsvidare", label: "Tillsvidare" },
            { id: "timanstallning", label: "Tidsbegränsad anställning" },
            { id: "vikariat", label: "Vikariat" },
            { id: "behov", label: "Behovsanställning" },
            { id: "sasong", label: "Säsongsanställning" },
          ]}
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