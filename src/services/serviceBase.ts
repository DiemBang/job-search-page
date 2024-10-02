import axios, { AxiosResponse } from 'axios';
import { IAd } from '../pages/searchPage/SearchResult';

const BASE_URL = 'https://jobsearch.api.jobtechdev.se/search?offset=0&limit=20';
export const getBase = async <T>(url: string) => {
  const response = await axios.get<T>(url);
  return response.data;
};

interface ITotalAds {
  value: number;
}
interface IAdResponseData {
  hits: IAd[];
  total: ITotalAds;
  positions: number;
}

export const getBaseCopy = async (
  params: URLSearchParams | null
): Promise<IAdResponseData> => {
  let response: AxiosResponse;
  if (params === null) {
    response = await axios.get<IAdResponseData>(BASE_URL);
  } else {
    response = await axios.get<IAdResponseData>(`${BASE_URL}&${params}`);
  }
  return response.data;
};
