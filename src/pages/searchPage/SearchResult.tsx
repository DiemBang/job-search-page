import { TypographyTimeVariation } from "@digi/arbetsformedlingen";
import { DigiTypographyTime } from "@digi/arbetsformedlingen-react";
import { SearchResultWrapper } from "../../components/styled/Wrappers";

interface IEmployer {
  name: string;
}

interface IWorkplaceAddress {
  city: string | null;
}

interface IWorkinghoursType {
  label: string;
}

export interface IAd {
  id: string;
  headline: string;
  working_hours_type: IWorkinghoursType;
  employer: IEmployer;
  workplace_address: IWorkplaceAddress;
  publication_date: string;
}

export const SearchResult = (props: IAd) => {
  return (
    <SearchResultWrapper>
      <h3>{props.headline}</h3>
      <h4>
        {props.employer.name} - {props.workplace_address.city}
      </h4>
      <p>{props.working_hours_type.label}</p>
      <p>Publicerad <DigiTypographyTime
        afVariation={TypographyTimeVariation.PRETTY}
        afDateTime={props.publication_date}
      ></DigiTypographyTime></p>
    </SearchResultWrapper>
  );
};
