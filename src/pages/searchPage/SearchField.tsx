import {
  FormInputSearchVariation,
  FormInputType,
} from "@digi/arbetsformedlingen";
import { DigiFormInputSearch } from "@digi/arbetsformedlingen-react";
import { useState } from "react";
import useAdvertsContext from '../../hooks/useAdvertsContext';


export const SearchField = () => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const { getData } = useAdvertsContext();

  const handleSearch = () => {
    
    const params = new URLSearchParams();    

    if(searchQuery) {
      params.append("q", searchQuery);
    }

    getData(params);

    console.log("search button works, search query:", searchQuery);  
  }

  return (
    <section>
      <DigiFormInputSearch
        afLabel="Sök på ett eller flera ord"
        afVariation={FormInputSearchVariation.MEDIUM}
        afType={FormInputType.SEARCH}
        afButtonText="Sök"
        onAfOnInput={(e) => setSearchQuery(e.target.value)}
        onAfOnClick={handleSearch}
      ></DigiFormInputSearch>
    </section>
  );
};

