import { IQuery } from '../types/types';

export const extractSearchParams = (url: URL) => {
  return {
    q: url.searchParams.get('q'),
    sort: url.searchParams.get('sort'),
    'driving-license-required': url.searchParams.get(
      'driving-license-required'
    ),
    remote: url.searchParams.get('remote'),
    'published-after': url.searchParams.get('published-after'),
    language: url.searchParams.get('language'),
  };
};

export const extractSearchArrayParams = (url: URL) => {
  return {
    'occupation-group': url.searchParams.getAll('occupation-group'),
    municipality: url.searchParams.getAll('municipality'),
    'employment-type': url.searchParams.getAll('employment-type'),
    'worktime-extent': url.searchParams.getAll('worktime-extent'),
  };
};

export const buildInitialQueries = (
  searchParams: Record<string, string | null>,
  arrayParams: Record<string, string[]>
): IQuery[] => {
  return [
    { query: 'q=', value: searchParams.q || '' },
    { query: 'sort=', value: searchParams.sort || '' },
    {
      query: 'driving-license-required=',
      value: searchParams['driving-license-required'] || '',
    },
    { query: 'remote=', value: searchParams.remote || '' },
    { query: 'published-after=', value: searchParams['published-after'] || '' },
    { query: 'language=', value: searchParams.language || '' },
    { query: 'occupation-group=', value: arrayParams['occupation-group'] },
    { query: 'municipality=', value: arrayParams.municipality },
    { query: 'employment-type=', value: arrayParams['employment-type'] },
    { query: 'worktime-extent=', value: arrayParams['worktime-extent'] },
  ];
};
