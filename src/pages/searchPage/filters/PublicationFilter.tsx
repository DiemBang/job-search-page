import { FormRadiobuttonVariation } from "@digi/arbetsformedlingen";
import {
  DigiFormFilter,
  DigiFormRadiobutton,
} from "@digi/arbetsformedlingen-react";

export const PublicationFilter = () => {
  return (
    <>
      <DigiFormFilter
        afFilterButtonText="Publicerad"
        afSubmitButtonText="Filtrera"
        afListItems={[
          { id: "omr1", label: "Alla" },
          { id: "omr2", label: "Idag" },
          { id: "omr3", label: "Senaste 7 dagarna" },
          { id: "omr3", label: "Senaste 30 dagarna" },
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
      <DigiFormRadiobutton
        afLabel="Kryssruta"
        afVariation={FormRadiobuttonVariation.PRIMARY}
      ></DigiFormRadiobutton>
    </>
  );
};
