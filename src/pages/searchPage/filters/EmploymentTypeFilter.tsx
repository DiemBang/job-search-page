import { DigiFormFilter } from "@digi/arbetsformedlingen-react";
import useAdvertsContext from "../../../hooks/useAdvertsContext";

export const EmploymentTypeFilter = () => {
  const { changeEmploymentType } = useAdvertsContext();

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
        onAfResetFilter={() => {changeEmploymentType([]);}}
        onAfSubmitFilter={(e) =>
          changeEmploymentType(e.detail.checked)
        }
        onAfCloseFilter={(e) =>
          changeEmploymentType(e.detail.checked)
        }
      ></DigiFormFilter>
    </>
  );
};
