import styled from 'styled-components';

interface IFlexContainerProps {
  align?: string;
  justify?: string;
  direction?: string;
  $gap?: string;
}

export const FlexContainer = styled.div<IFlexContainerProps>`
  display: flex;
  align-items: ${(props) => props.align || 'center'};
  justify-content: ${(props) => props.align || 'center'};
  flex-direction: ${(props) => props.align || 'row'};
  gap: ${(props) => props.$gap || '0'};
`;
