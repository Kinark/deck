import styled from 'styled-components';

import spinner from '~/assets/images/three-dots.svg';

const LoaderOverlay = () => {
  return (
    <LoaderOverlayWrapper>
      <img src={spinner} width="50" />
    </LoaderOverlayWrapper>
  );
};

export default LoaderOverlay;

const LoaderOverlayWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
`;
