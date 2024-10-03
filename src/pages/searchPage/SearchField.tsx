import {
  FormInputSearchVariation,
  FormInputType,
} from "@digi/arbetsformedlingen";
import { DigiFormInputSearch } from "@digi/arbetsformedlingen-react";
import useAdvertsContext from '../../hooks/useAdvertsContext';


export const SearchField = () => {
  
  const { getData, createFilterParams, searchQuery, setSearchQuery } = useAdvertsContext();

  const handleSearch = () => {
    
    // const params = new URLSearchParams();  
    const params = createFilterParams();  

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

