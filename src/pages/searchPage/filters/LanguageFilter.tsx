import { DigiFormFilter } from "@digi/arbetsformedlingen-react";
import useAdvertsContext from "../../../hooks/useAdvertsContext";

export const LanguageFilter = () => {
  const { changeLanguage } = useAdvertsContext();
  return (
    <>
      <DigiFormFilter
        afFilterButtonText="Språk"
        afSubmitButtonText="Filtrera"
        afListItems={[
          { id: "sv", label: "Svenska" },
          { id: "eng", label: "Engelska" },
        ]}
        onAfChangeFilter={(e) => console.log(e.detail.id, e.detail.isChecked)}
        onAfResetFilter={() => {changeLanguage([]);}}
        onAfSubmitFilter={(e) =>
          changeLanguage(e.detail.checked)
        }
        onAfCloseFilter={(e) =>
          changeLanguage(e.detail.checked)
        }
      ></DigiFormFilter>
    </>
  );
};
