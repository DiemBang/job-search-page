import { DigiFormFilter } from "@digi/arbetsformedlingen-react";

export const PublicationFilter = () => {
  return (
    <>
      <DigiFormFilter
        afFilterButtonText="Publicerad"
        afSubmitButtonText="Filtrera"
        afListItems={[
          { id: "alla", label: "Alla" },
          { id: "idag", label: "Idag" },
          { id: "7dagar", label: "Senaste 7 dagarna" },
          { id: "30dagar", label: "Senaste 30 dagarna" },
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
  );
};
