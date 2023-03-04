import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }
  
  a {
    text-decoration: none;
    color: inherit;
    outline: none;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.font.families.sans};
  }

  html {
    font-size: 16px;
  }

  body {
    margin: 0;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.body};
    background: ${({ theme }) => theme.colors.bg};
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  h1 {
    font-size: ${({ theme }) => theme.font.sizes.title};
  }

  h2 {
    font-size: ${({ theme }) => theme.font.sizes.subTitle};
  }

  button {
    border: none;
    outline: none;
    cursor: pointer;
  }
`;

export default GlobalStyles;
