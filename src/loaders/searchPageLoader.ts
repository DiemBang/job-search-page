import { getBase } from '../services/serviceBase';
import { IOccupations } from '../types/occupation-types';
import { IQuery } from '../types/types';

const BASE_URL = 'https://jobsearch.api.jobtechdev.se/search?&limit=20';

export const searchPageLoader = async ({
  request,
}: {
  request: Request;
}): Promise<{
  occupationsData: IOccupations | null;
  initialQueries: IQuery[];
}> => {
  const url = new URL(request.url);

  const freeSearch = url.searchParams.get('q') || '';
  const sort = url.searchParams.get('sort') || '';
  const drivingLicense = url.searchParams.get('driving-license-required') || '';
  const remote = url.searchParams.get('remote') || '';
  const occupationGroupParams = url.searchParams.getAll('occupation-group');
  const municipalitiesGroupParams = url.searchParams.getAll('municipality');
  const employmentTypeParams = url.searchParams.getAll('employment-type') || '';
  const worktimeExtent = url.searchParams.getAll('worktime-extent') || '';
  const publishedAfter = url.searchParams.get('published-after') || '';
  const language = url.searchParams.get('language') || '';

  const pageValue = url.searchParams.get('page') || '';

  const page: number = pageValue ? parseInt(pageValue) : 1;    
  const offsetValue = (page - 1) * 20;

  

  console.log(drivingLicense, remote);
  let occupationUrl = BASE_URL;

  if (freeSearch) {
    occupationUrl += `&q=${freeSearch}`;
  }
  if (sort) {
    occupationUrl += `&sort=${sort}`;
  }
  if (drivingLicense) {
    occupationUrl += `&driving-license-required=${drivingLicense}`;
  }
  if (remote) {
    occupationUrl += `&remote=${remote}`;
  }
  // Kolla kanske length istället
  if (worktimeExtent.length > 0) {
    occupationUrl += `&worktime-extent=${worktimeExtent}`;
  }
  if (publishedAfter) {
    occupationUrl += `&published-after=${publishedAfter}`;
  }
  if (language) {
    occupationUrl += `&language=${language}`;
  }
  if (worktimeExtent.length) {
    occupationUrl += worktimeExtent
      .map((param) => `&worktime-extent=${param}`)
      .join('');
  }
  if (employmentTypeParams.length) {
    occupationUrl += employmentTypeParams
      .map((param) => `&employment-type=${param}`)
      .join('');
  }
  if (occupationGroupParams.length) {
    occupationUrl += occupationGroupParams
      .map((param) => `&occupation-group=${param}`)
      .join('');
  }
  if (municipalitiesGroupParams.length) {
    occupationUrl += municipalitiesGroupParams
      .map((param) => `&municipality=${param}`)
      .join('');
  }

  if (page) {
    occupationUrl += `&offset=${offsetValue}`
  }

  const initialQueries: IQuery[] = [
    { query: 'q=', value: freeSearch },
    { query: 'sort=', value: sort },
    { query: 'worktime-extent=', value: worktimeExtent },
    { query: 'employment-type=', value: employmentTypeParams },
    { query: 'driving-license-required=', value: drivingLicense },
    { query: 'remote=', value: remote },
    { query: 'language=', value: language },
    { query: 'published-after=', value: publishedAfter },
    { query: 'occupation-group=', value: occupationGroupParams },
    { query: 'municipality=', value: municipalitiesGroupParams },
    { query: 'page=', value: pageValue || '1' }
  ];

  try {
    console.log("this", offsetValue)
    const occupationsData = await getBase<IOccupations>(occupationUrl);
    return { occupationsData, initialQueries };
  } catch (err) {
    console.log('Error fetching occupations:', err);
    return { occupationsData: null, initialQueries };
  }
};
