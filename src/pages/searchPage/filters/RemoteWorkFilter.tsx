import { DigiFormFilter } from "@digi/arbetsformedlingen-react";

export const RemoteWorkFilter = () => {
    return (
        <>
        <DigiFormFilter
          afFilterButtonText="Arbetsplats"
          afSubmitButtonText="Filtrera"
          afListItems={[
            { id: "alla", label: "Alla" },
            { id: "endast_distans", label: "Endast distansarbete" },

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