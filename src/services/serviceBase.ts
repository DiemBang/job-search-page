import axios from 'axios';

const BASE_URL = "https://jobsearch.api.jobtechdev.se/search?offset=0&limit=20";

interface ITotalAds {
  value: number;
}
interface IAdResponseData {
  hits: number;
  total: ITotalAds;
  positions: number;
}

export const getBase = async (): Promise<IAdResponseData> => {
  const response = await axios.get<IAdResponseData>(BASE_URL);
  return response.data;
};
