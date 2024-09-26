import { DigiFormFilter } from "@digi/arbetsformedlingen-react";

export const LanguageFilter = () => {
    return (
        <>
        <DigiFormFilter
          afFilterButtonText="Språk"
          afSubmitButtonText="Filtrera"
          afListItems={[
            { id: "omr1", label: "Svenska" },
            { id: "omr2", label: "Engelska" },
            { id: "omr3", label: "Övriga" },
          ]}
          afCheckItems={["omr1"]} // optional, override internal check state of component with filter ids
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