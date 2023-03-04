import styled from 'styled-components';

import spinner from '~/assets/images/three-dots.svg';

const LoaderSuspense = () => {
  return (
    <Wrapper>
      <img src={spinner} width="50" />
    </Wrapper>
  );
};

export default LoaderSuspense;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  font-size: ${({ theme }) => theme.font.sizes.subTitle};
`;
