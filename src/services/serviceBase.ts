import axios from 'axios';
import { IAd } from "../pages/searchPage/SearchResult";

const BASE_URL = "https://jobsearch.api.jobtechdev.se/search?offset=0&limit=20";

interface ITotalAds {
  value: number;
}
interface IAdResponseData {
  hits: IAd[];
  total: ITotalAds;
  positions: number;
}

export const getBase = async <T>(url: string): Promise<T> => {
  const response = await axios.get<T>(url);
  return response.data;
};
