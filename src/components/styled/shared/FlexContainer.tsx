import styled from 'styled-components';

interface IFlexContainerProps {
  $align?: string;
  $justify?: string;
  $direction?: string;
  $gap?: string;
  $maxWidth?: string;
  $width?: string;
  $padding?: string;
  $margin?: string;
  $flexWrap?: string;
}

export const FlexContainer = styled.div<IFlexContainerProps>`
  display: flex;
  align-items: ${(props) => props.$align || 'center'};
  justify-content: ${(props) => props.$justify || 'center'};
  flex-direction: ${(props) => props.$direction || 'row'};
  gap: ${(props) => props.$gap || '0'};
  width: ${(props) => props.$width || 'auto'};
  padding: ${(props) => props.$padding || '0'};
  max-width: ${(props) => props.$maxWidth || '100%'};
  flex-wrap: ${(props) => props.$flexWrap || 'nowrap'};
  margin: ${(props) => props.$margin || '0'};
`;
