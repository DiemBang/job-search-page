import { DigiFormFilter } from "@digi/arbetsformedlingen-react";
import useAdvertsContext from "../../../hooks/useAdvertsContext";

export const WorkTimeExtentFilter = () => {
  const { changeWorktimeExtent } = useAdvertsContext();

  return (
    <>
      <DigiFormFilter
        afFilterButtonText="Omfattning"
        afSubmitButtonText="Filtrera"
        afListItems={[
          { id: "alla", label: "Alla" },
          { id: "heltid", label: "Heltid" },
          { id: "deltid", label: "Deltid" },
        ]}
        onAfChangeFilter={(e) => console.log(e.detail.id, e.detail.isChecked)}
        onAfResetFilter={() => {
          changeWorktimeExtent([]);
        }}
        onAfSubmitFilter={(e) => changeWorktimeExtent(e.detail.checked)}
        onAfCloseFilter={(e) => changeWorktimeExtent(e.detail.checked)}
      ></DigiFormFilter>
    </>
  );
};
