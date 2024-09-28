import axios from 'axios';

export const getBase = async <T>(url: string) => {
  const response = await axios.get<T>(url);
  return response.data;
};
