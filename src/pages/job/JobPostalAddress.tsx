import { FlexContainer } from '../../components/styled/shared/FlexContainer';
import { IWorkplaceAddress, IEmployer } from '../../types/occupation-types';

interface IJobPostalAddressProps {
  address: IWorkplaceAddress;
  employer: IEmployer;
}

const JobPostalAddress = ({ address, employer }: IJobPostalAddressProps) => {
  const { street_address, city, postcode, region } = address;
  const { name } = employer;

  return (
    <FlexContainer $direction="column" $align="flex-start" $gap="2px">
      <h3>Postadress</h3>
      {name && <>{name}</>}
      {name && <div>{street_address}</div>}
      {postcode && city && (
        <div>
          {postcode} {city}
        </div>
      )}
      {region && <div>{region}</div>}
    </FlexContainer>
  );
};

export default JobPostalAddress;
