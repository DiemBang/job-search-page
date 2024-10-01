import axios, { AxiosResponse } from "axios";
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

export const getBase = async (
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
