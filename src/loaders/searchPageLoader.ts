import { getBase } from '../services/serviceBase';
import { IOccupations } from '../types/occupation-types';
import { IQuery } from '../types/types';
import { appendParams } from '../utils/urlUtils';
import {
  buildInitialQueries,
  extractSearchArrayParams,
  extractSearchParams,
} from '../utils/queryUtils';

const BASE_URL = 'https://jobsearch.api.jobtechdev.se/search?offset=0&limit=20';

/**
 * Fetches occupation data from AF API and builds initial queries.
 *
 * Constructs the full API URL for the occupations search.
 * This is done by extracting search params either if they are several (array) or single.
 * Then these are appended to the BASE_URL using appendParams
 *
 * @param param0 - Object containing the Request Object with all its values where we use request.url
 * @returns {Promise<{occupationsData: IOccupations | null, initialQueries: IQuery[]}>}
 * Returns occupation data and initial query array or just null if there is an error
 */
export const searchPageLoader = async ({
  request,
}: {
  request: Request;
}): Promise<{
  occupationsData: IOccupations | null;
  initialQueries: IQuery[];
}> => {
  // by using the URL object we get access to the searchParams get methods
  const url = new URL(request.url);

  const searchParams = extractSearchParams(url);
  const arrayParams = extractSearchArrayParams(url);

  const occupationUrl = appendParams(BASE_URL, {
    ...searchParams,
    ...arrayParams,
  });

  const initialQueries = buildInitialQueries(searchParams, arrayParams);

  try {
    const occupationsData = await getBase<IOccupations>(occupationUrl);
    return { occupationsData, initialQueries };
  } catch (err) {
    console.log('Error fetching occupations:', err);
    return { occupationsData: null, initialQueries };
  }
};
