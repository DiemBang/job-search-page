import { DigiFormFilter } from "@digi/arbetsformedlingen-react";

export const WorkTimeExtentFilter = () => {
    return (
        <>
        <DigiFormFilter
          afFilterButtonText="Omfattning"
          afSubmitButtonText="Filtrera"
          afListItems={[
            { id: "omr1", label: "Alla" },
            { id: "omr2", label: "Heltid" },
            { id: "omr3", label: "Deltid" },
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
        >
        </DigiFormFilter>
        
        </>
    )
}