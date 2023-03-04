import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { TbChevronRight } from 'react-icons/tb';

import CircularButton from '~/components/CircularButton';

interface CollapsibleSectionProps {
  title: string;
  subTitle?: string;
  children: ReactNode;
}

const hiddenContentStyle = {
  height: 0,
  opacity: 0,
};

const shownContentStyle = {
  height: 'auto',
  opacity: 1,
};

const CollapsibleSection = ({ title, subTitle, children }: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Wrapper isOpen={isOpen}>
      <TitleBar>
        <div>
          <h3>{title}</h3>
          {!!subTitle && <div>{subTitle}</div>}
        </div>
        <StyledCircularButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
          <TbChevronRight />
        </StyledCircularButton>
      </TitleBar>
      <AnimatePresence>
        {isOpen && (
          <Content initial={hiddenContentStyle} exit={hiddenContentStyle} animate={shownContentStyle}>
            {children}
          </Content>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default CollapsibleSection;

const TitleBar = styled.div`
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.font.sizes.subTitle};
  h3 {
    font-size: ${({ theme }) => theme.font.sizes.title};
    color: ${({ theme }) => theme.colors.body};
    font-weight: 700;
  }
  position: sticky;
  top: 0px;
`;

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Wrapper = styled.div<{ isOpen: boolean }>`
  display: block;
  ${TitleBar} {
    margin-bottom: ${({ isOpen }) => (isOpen ? '16px' : '0px')};
    transition: margin-bottom 0.2s ease-in-out;
  }
  background-color: ${({ theme }) => theme.colors.cardSection};
  border-radius: 40px;
  padding: 20px 16px;
  overflow: hidden;
`;

const StyledCircularButton = styled(CircularButton)<{ isOpen: boolean }>`
  & > svg {
    transform: rotate(${({ isOpen }) => (isOpen ? '90deg' : '0deg')});
    transition: transform ${({ theme }) => theme.animation.easings.quick};
  }
`;
