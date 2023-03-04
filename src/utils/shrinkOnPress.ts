import { css } from 'styled-components';

export default css`
  transition: ${({
    theme: {
      animation: { easings },
    },
  }) => `all ${easings.quick}`};
  &:active {
    transform: scale(0.96);
  }
`;
