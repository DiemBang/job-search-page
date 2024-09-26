import { IInformationField } from '../types/types';

export const createInformationFields = (
  vacancies: string | null,
  publication: string | null,
  id: string | null,
  url: string | null
): IInformationField[] => [
  {
    label: 'Antal Jobb',
    value: vacancies
      ? `Just nu finns det ${vacancies} jobb${
          vacancies === 'ett' ? ' tillgängligt' : ' tillgängliga'
        }`
      : null,
    element: 'h3',
  },
  {
    label: 'Publicerad',
    value: publication,
    element: 'h3',
  },
  {
    label: 'Annons-sida',
    value: id,
    element: 'h3',
  },
  {
    label: 'Hemsida',
    value: url,
    element: 'h3',
  },
];
