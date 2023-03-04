import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TbUsers, TbUserSearch } from 'react-icons/tb';

import Container from '~/components/Container';
import { navBarSelectedUserIdAtom } from '~/components/NavBar/atoms';
import Card from '~/components/Card';

import { Driver } from '~/types/logTypes';
import { eldLogAtom } from '~/atoms/eldLog';

const Home = () => {
  const [, setnavBarSelectedUserId] = useAtom(navBarSelectedUserIdAtom);
  const [eldLog] = useAtom(eldLogAtom);
  const drivers = eldLog.reduce<Driver[]>((acc, log) => {
    if (!acc.find((driver) => driver.id === log.driver.id)) {
      acc.push(log.driver);
    }
    return acc;
  }, []);

  useEffect(() => {
    setnavBarSelectedUserId(null);
  }, []);

  return (
    <Container>
      <Card title="Drivers" icon={<TbUsers />}>
        <DriversWrapper>
          {drivers.map((driver) => (
            <Link to={`/details/${driver.id}`} key={driver.id}>
              <TbUserSearch />
              {driver.name}
            </Link>
          ))}
        </DriversWrapper>
      </Card>
    </Container>
  );
};

export default Home;

const DriversWrapper = styled.div`
  display: block;
  padding: 0 8px;
  & > a {
    display: inline-flex;
    gap: 6px;
    align-items: center;
    padding: 8px 16px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.bg};
    margin: 4px;
  }
`;
