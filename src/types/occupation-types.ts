export interface IOccupations {
  total: ITotal;
  positions: number;
  hits: IOccupation[];
}

export interface IOccupation {
  relevance: number;
  id: string;
  external_id: null | string;
  original_id: null;
  label: string;
  webpage_url: string;
  logo_url: string | null;
  headline: string;
  application_deadline: string;
  number_of_vacancies: number;
  description: IDescription;
  employment_type: IDuration;
  salary_type: ISalaryType;
  salary_description: null | string;
  duration: IDuration;
  working_hours_type: IDuration;
  scope_of_work: IScopeOfWork;
  access: null;
  employer: IEmployer;
  application_details: IApplicationDetails;
  experience_required: boolean;
  access_to_own_car: boolean;
  driving_license_required: boolean;
  driving_license: IDuration[] | null;
  occupation: IDuration;
  occupation_group: IOccupationGroup;
  occupation_field: IOccupationField;
  workplace_address: IWorkplaceAddress;
  must_have: IHave;
  nice_to_have: IHave;
  application_contacts: IApplicationContact[];
  publication_date: string;
  last_publication_date: string;
  removed: boolean;
  removed_date: null;
  source_type: string;
  timestamp: number;
}

export interface IApplicationContact {
  name: null | string;
  description: null | string;
  email: null | string;
  telephone: null | string;
  contact_type: null | string;
}

export interface IApplicationDetails {
  information: null;
  reference: null | string;
  email: null | string;
  via_af: boolean;
  url: null | string;
  other: null;
}

export interface IDescription {
  text: string;
  text_formatted: string;
  company_information: null;
  needs: null;
  requirements: null;
  conditions: null | string;
}

export interface IDuration {
  concept_id: string;
  label: string;
  legacy_ams_taxonomy_id: string;
  weight?: number;
}

export interface ISalaryType {
  concept_id: string;
  label: string;
  legacy_ams_taxonomy_id: string;
}

export interface IEmployer {
  phone_number: null;
  email: null;
  url: null | string;
  organization_number: string;
  name: string;
  workplace: string;
}

export interface IOccupationField {
  id: string;
  narrower: IOccupationGroup[];
  preferred_label: string;
  active?: boolean;
  selected?: boolean;
}

export interface IOccupationGroup {
  id: string;
  preferred_label: string;
  active?: boolean;
  selected?: boolean;
}

export interface IHave {
  skills: IDuration[];
  languages: IDuration[];
  work_experiences: IDuration[];
  education: IDuration[];
  education_level: IDuration[];
}

export interface IScopeOfWork {
  min: number;
  max: number;
}

export interface IWorkplaceAddress {
  municipality: string;
  municipality_code: string;
  municipality_concept_id: string;
  region: string;
  region_code: string;
  region_concept_id: string;
  country: string | null;
  country_code: string;
  country_concept_id: string;
  street_address: null | string;
  postcode: null | string;
  city: null | string;
  coordinates: number[];
}

export interface ITotal {
  value: number;
}
