import { ReactNode } from 'react';
import styled from 'styled-components';

interface CardProps {
  title: string;
  buttons?: ReactNode;
  children?: ReactNode;
  icon: ReactNode;
  className?: string;
}

const Card = ({ title, buttons, children, icon, className }: CardProps) => {
  return (
    <CardWrapper className={className}>
      <TitleBar>
        <TitleWrapper>
          {icon}
          <h1>{title}</h1>
        </TitleWrapper>
        {buttons}
      </TitleBar>
      {children}
    </CardWrapper>
  );
};

export default Card;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 40px;
  padding: 24px 16px;
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  display: flex;
  gap: 6px;
  padding: 0 16px;
  align-items: center;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 700;
  font-size: ${({ theme }) => theme.font.sizes.title};
`;
