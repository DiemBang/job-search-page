import { ISubCategory } from './occupation-types';
import { IAd } from '../pages/searchPage/SearchResult';

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
  value: string;
}

export interface ITotalAds {
  value: number;
}
export interface IAdResponseData {
  hits: IAd[];
  total: ITotalAds;
  positions: number;
}
