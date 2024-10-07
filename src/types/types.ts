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
