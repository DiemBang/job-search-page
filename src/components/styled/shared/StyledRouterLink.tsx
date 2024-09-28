import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledRouterLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:visited {
    color: inherit;
  }
`;

export default StyledRouterLink;
