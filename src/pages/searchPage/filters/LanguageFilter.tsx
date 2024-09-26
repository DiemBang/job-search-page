import { DigiFormFilter } from "@digi/arbetsformedlingen-react";

export const LanguageFilter = () => {
    return (
        <>
        <DigiFormFilter
          afFilterButtonText="Språk"
          afSubmitButtonText="Filtrera"
          afListItems={[
            { id: "sv", label: "Svenska" },
            { id: "eng", label: "Engelska" },
            { id: "ovr", label: "Övriga" },
          ]}
          afCheckItems={["sv"]} // optional, override internal check state of component with filter ids
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