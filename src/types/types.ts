import { IOccupation, ISubCategory } from './occupation-types';

export interface IInformationField {
  label: string;
  value: string | null | undefined;
  element: React.ElementType;
}

export interface IVisibleSubcategories {
  categoryId: string;
  visibleSubcategories: ISubCategory[];
}

export interface IQuery {
  query: string;
  value: string | string[];
}

export interface ITotalAds {
  value: number;
}
export interface IAdResponseData {
  hits: IOccupation[];
  total: ITotalAds;
  positions: number;
}

export interface IComplete {
  value: string;
  found_phrase: string;
  type: string;
  occurences: number;
}

export interface IGetCompleteResponse {
  result_time_in_millis: number;
  time_in_millis: number;
  typeahead: IComplete[];
}
