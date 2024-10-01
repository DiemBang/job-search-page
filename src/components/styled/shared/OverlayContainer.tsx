import styled from 'styled-components';

interface IOverlayContainerProps {
  $position?: string;
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
  $zIndex?: number;
  $translateX?: string;
  $translateY?: string;
}

export const OverlayContainer = styled.div<IOverlayContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  z-index: 10;
  margin-top: 40%;
`;
