import { DigiFormFilter } from "@digi/arbetsformedlingen-react";
import useAdvertsContext from "../../../hooks/useAdvertsContext";
import { useEffect, useState } from "react";

export const EmploymentTypeFilter = () => {
  const { changeEmploymentType } = useAdvertsContext();
  const [checkedList, setCheckedList] = useState<string[]>([]);

  useEffect(() => {
    // check URL to see if needs to add to checkedList
    const urlParams = new URLSearchParams(window.location.search);
    const employmentTypeParams = urlParams.getAll("employment-type");
    const checkedValues: string[] = [];

    if (employmentTypeParams.includes("kpPX_CNN_gDU")) {
      checkedValues.push("tillsvidare");
    }
    
    if (employmentTypeParams.includes("sTu5_NBQ_udq")) {
      checkedValues.push("timanstallning");
    }
    if (employmentTypeParams.includes("gro4_cWF_6D7")) {
      checkedValues.push("vikariat");
    }
    if (employmentTypeParams.includes("1paU_aCR_nGn")) {
      checkedValues.push("behov");
    }
    if (employmentTypeParams.includes("EBhX_Qm2_8eX")) {
      checkedValues.push("sasong");
    }

    setCheckedList(checkedValues);
  }, []);

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
        afCheckItems={checkedList}
        onAfResetFilter={() => {
          changeEmploymentType([]);
        }}
        onAfSubmitFilter={(e) => changeEmploymentType(e.detail.checked)}
        onAfCloseFilter={(e) => changeEmploymentType(e.detail.checked)}
      ></DigiFormFilter>
    </>
  );
};
