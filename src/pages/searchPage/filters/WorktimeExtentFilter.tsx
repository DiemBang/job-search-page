import { DigiFormFilter } from "@digi/arbetsformedlingen-react";
import useAdvertsContext from "../../../hooks/useAdvertsContext";
import { useState, useEffect } from "react";

export const WorkTimeExtentFilter = () => {
  const { changeWorktimeExtent } = useAdvertsContext();
  const [checkedList, setCheckedList] = useState<string[]>([]);

  useEffect(() => {
    // check URL to see if needs to add to checkedList
    const urlParams = new URLSearchParams(window.location.search);
    const worktimeParams = urlParams.getAll("worktime-extent");
    if (worktimeParams.includes("")) {
      setCheckedList(["alla"]);
    } else if (worktimeParams.includes("6YE1_gAC_R2G")) {
      setCheckedList(["heltid"]);
    } else if (worktimeParams.includes("947z_JGS_Uk2")) {
      setCheckedList(["deltid"]);
    } 
  }, []);

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
        afCheckItems={checkedList}
        onAfResetFilter={() => {
          changeWorktimeExtent([]);
        }}
        onAfSubmitFilter={(e) => changeWorktimeExtent(e.detail.checked)}
        onAfCloseFilter={(e) => changeWorktimeExtent(e.detail.checked)}
      ></DigiFormFilter>
    </>
  );
};
