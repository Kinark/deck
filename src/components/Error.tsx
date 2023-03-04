import styled from 'styled-components';

const Error = () => {
  return (
    <Wrapper>
      <div>Something went wrong 😥</div>
      <div>Please refresh the page.</div>
    </Wrapper>
  );
};

export default Error;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  font-size: ${({ theme }) => theme.font.sizes.subTitle};
`;
