import styled from 'styled-components';

interface IPositionContainerProps {
  $position?: string;
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
  $zIndex?: number;
  $translateX?: string;
  $translateY?: string;
}

export const PositionContainer = styled.div<IPositionContainerProps>`
  position: ${(props) => props.$position || 'static'};
  top: ${(props) => props.$top || 'auto'};
  bottom: ${(props) => props.$bottom || 'auto'};
  left: ${(props) => props.$left || 'auto'};
  right: ${(props) => props.$right || 'auto'};
  z-index: ${(props) => props.$zIndex || 'auto'};
  transform: translate(
    ${(props) => props.$translateX || '0px'},
    ${(props) => props.$translateY || '0px'}
  );
`;
