import { TypographyTimeVariation } from '@digi/arbetsformedlingen';
import { DigiTypographyTime } from '@digi/arbetsformedlingen-react';
import { SearchResultWrapper } from '../../components/styled/Wrappers';
import StyledRouterLink from '../../components/styled/shared/StyledRouterLink';
import { IOccupation } from '../../types/occupation-types';

export interface IAdProps {
  ad: IOccupation;
}

export const SearchResult = ({ ad }: IAdProps) => {
  return (
    <StyledRouterLink to={`/search/job/${ad.id}`}>
      <SearchResultWrapper>
        <h3>{ad.headline}</h3>
        <h4>
          {ad.employer.name}
          {ad.employer.name && ad.workplace_address.municipality && <> - </>}
          {ad.workplace_address.municipality}
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
