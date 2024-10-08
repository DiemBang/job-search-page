import axios from 'axios';
import { IGetCompleteResponse } from '../types/types';

export const getBase = async <T>(url: string) => {
  const response = await axios.get<T>(url);
  return response.data;
};

const BASE_URL = 'https://jobsearch.api.jobtechdev.se/complete?';
const contextual = 'contextual=true';
const limit = 'limit=10';

export const getComplete = async (searchValue: string): Promise<string[]> => {
  try {
    const completeUrl = `${BASE_URL}q=${searchValue}&${limit}&${contextual}`;
    const completeData = await getBase<IGetCompleteResponse>(completeUrl);
    const suggestions = completeData.typeahead
      .slice(0, 5)
      .map((item) => item.found_phrase);

    return suggestions;
  } catch (err) {
    console.log('error', err);
    return [];
  }
};
