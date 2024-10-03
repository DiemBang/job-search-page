import axios from 'axios';

export const getBase = async <T>(url: string) => {
  console.log('this is the url recievied in service base: ', url);
  const response = await axios.get<T>(url);
  return response.data;
};
