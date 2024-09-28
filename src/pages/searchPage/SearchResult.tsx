import { TypographyTimeVariation } from '@digi/arbetsformedlingen';
import { DigiTypographyTime } from '@digi/arbetsformedlingen-react';
import { SearchResultWrapper } from '../../components/styled/Wrappers';
import StyledRouterLink from '../../components/styled/shared/StyledRouterLink';

interface IEmployer {
  name: string;
}

interface IWorkplaceAddress {
  city: string | null;
}

interface IWorkinghoursType {
  label: string;
}

export interface IAd {
  id: string;
  headline: string;
  working_hours_type: IWorkinghoursType;
  employer: IEmployer;
  workplace_address: IWorkplaceAddress;
  publication_date: string;
}

export interface IAdProps {
  ad: IAd;
}

export const SearchResult = ({ ad }: IAdProps) => {
  return (
    <StyledRouterLink to={`/search/job/${ad.id}`}>
      <SearchResultWrapper>
        <h4>
          {ad.employer.name}
          {ad.employer.name && ad.workplace_address.city && <> - </>}
          {ad.workplace_address.city}
        </h4>
        <p>{ad.working_hours_type.label}</p>
        <p>
          Publicerad{' '}
          <DigiTypographyTime
            afVariation={TypographyTimeVariation.PRETTY}
            afDateTime={ad.publication_date}
          ></DigiTypographyTime>
        </p>
      </SearchResultWrapper>
    </StyledRouterLink>
  );
};
