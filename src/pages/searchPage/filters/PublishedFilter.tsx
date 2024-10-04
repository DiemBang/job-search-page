import { DigiFormFilter } from "@digi/arbetsformedlingen-react";
import useAdvertsContext from "../../../hooks/useAdvertsContext";

export const PublishedFilter = () => {
  const { changePublishedDate } = useAdvertsContext();

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
        onAfChangeFilter={(e) => console.log(e.detail.id, e.detail.isChecked)}
        onAfResetFilter={() => {changePublishedDate([]);}}
        onAfSubmitFilter={(e) =>
          changePublishedDate(e.detail.checked)
        }
        onAfCloseFilter={(e) =>
          changePublishedDate(e.detail.checked)
        }
      ></DigiFormFilter>
    </>
  );
};
