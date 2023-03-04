import styled from 'styled-components';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';

import Container from '~/components/Container';
import { eldLogAtom } from '~/atoms/eldLog';

import deck from '~/assets/images/deck-logo.svg';
import johnAvatar from '~/assets/images/john-smith-avatar.png';

import { navBarSelectedUserIdAtom } from './atoms';

const NavBar = () => {
  const [selectedUserId] = useAtom(navBarSelectedUserIdAtom);
  const [eldLog] = useAtom(eldLogAtom);
  const user = !!selectedUserId ? eldLog.find((log) => log.driver.id === selectedUserId)?.driver : null;
  return (
    <Wrapper>
      <StyledContainer as="ul">
        <Link to="/">
          <LogoWrapper>
            <img src={deck} />
            <div>Deck</div>
          </LogoWrapper>
        </Link>
        <SelectedDriverWrapper>
          {!!user && (
            <>
              <Phrase>
                <span>Showing information of</span>
                <div>{user.name}</div>
              </Phrase>
              <img src={johnAvatar} />
            </>
          )}
        </SelectedDriverWrapper>
      </StyledContainer>
    </Wrapper>
  );
};

export default NavBar;

const Wrapper = styled.nav`
  display: block;
  position: sticky;
  background-color: ${({ theme }) => theme.colors.bg};
  margin-bottom: 24px;
  top: 0;
  z-index: 1;
  padding: 8px;
`;

const LogoWrapper = styled.li`
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: ${({ theme }) => theme.font.sizes.logo};
  font-weight: 600;
  width: 100%;
  padding: 12px 0;
`;

const SelectedDriverWrapper = styled.li`
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: ${({ theme }) => theme.font.sizes.logo};
  font-weight: 600;
  flex-shrink: 0;
  img {
    height: 54px;
    width: 54px;
    border-radius: 50%;
  }
`;

const Phrase = styled.div`
  display: flex;
  gap: 5px;
  align-items: baseline;
  font-size: ${({ theme }) => theme.font.sizes.subTitle};
  font-weight: 600;
  span {
    opacity: 0.5;
    font-size: ${({ theme }) => theme.font.sizes.body};
    font-weight: 400;
  }
`;

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  list-style: none;
  li {
    list-style: none;
  }
`;
