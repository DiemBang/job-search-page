import { DigiFormFilter } from "@digi/arbetsformedlingen-react";

export const EducationFilter = () => {
    return (
        <>
        <DigiFormFilter
          afFilterButtonText="Utbildning"
          afSubmitButtonText="Filtrera"
          afListItems={[
            { id: "alla", label: "Alla" },
            { id: "utan_krav", label: "Utan krav på utbildning" },
            { id: "med_krav", label: "Med krav på utbildning" },
          ]}
          afCheckItems={["alla"]} // optional, override internal check state of component with filter ids
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