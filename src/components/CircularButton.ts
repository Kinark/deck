import { darken } from 'polished';
import styled from 'styled-components'

const CircularButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.buttonBg};
  color: ${({ theme }) => theme.colors.buttonColor};
  font-size: 24px;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => darken(0.1, theme.colors.buttonBg)};
  }
`;

export default CircularButton;
