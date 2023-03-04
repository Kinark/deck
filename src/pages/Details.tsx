import { useAtom } from 'jotai';
import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TbSunFilled, TbLayoutBottombarCollapse } from 'react-icons/tb';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import Card from '~/components/Card';
// import CircularButton from '~/components/CircularButton';
import CollapsibleSection from '~/components/CollapsibleSection';
import WorkdayEntry from '~/components/WorkdayEntry';
import Container from '~/components/Container';
import { navBarSelectedUserIdAtom } from '~/components/NavBar/atoms';

import { eldLogAtom } from '~/atoms/eldLog';
import { Log } from '~/types/logTypes';
import groupDatesByWeek from '~/utils/groupLogsByWeek';
import sumDurationOfLogGroup from '~/utils/sumDurationOfLogGroup';

dayjs.extend(weekOfYear);

const Details = () => {
  const [, setnavBarSelectedUserId] = useAtom(navBarSelectedUserIdAtom);
  const [eldLog] = useAtom(eldLogAtom);
  const [driverLogs, setDriverLogs] = useState<Log[]>([]);
  const navigate = useNavigate();
  const { driverId } = useParams();

  useEffect(() => {
    if (!driverId) return navigate('/');
    const driverLogs = eldLog.filter((log) => log.driver.id === driverId);
    setnavBarSelectedUserId(driverId);
    setDriverLogs(driverLogs);
  }, [driverId]);

  const groupedLogs = useMemo(() => {
    return groupDatesByWeek(driverLogs);
  }, [driverLogs]);

  const sortedLogs = useMemo(() => {
    return groupedLogs.reduce((acc, curr) => {
      return [...acc, ...curr];
    }, [] as Log[]);
  }, [groupedLogs]);

  const getSumOfTimeOfLastSevenDays = (id: string) => {
    const refIndex = sortedLogs.findIndex((log) => log.id === id);
    const lastSevenDays = sortedLogs.slice(Math.max(0, refIndex - 7), refIndex + 1);
    return sumDurationOfLogGroup(lastSevenDays);
  };

  return (
    <Container>
      <Columns>
        <Column>
          <FluidCard
            icon={<TbSunFilled />}
            title="Workdays"
            // buttons={
            //   <CircularButton>
            //     <TbLayoutBottombarCollapse />
            //   </CircularButton>
            // }
          >
            {groupedLogs.reverse().map((logGroup, i) => (
              <CollapsibleSection
                key={i}
                title={`Week ${dayjs(logGroup[0].startTime).week()} of ${dayjs(logGroup[0].startTime).year()}`}
                subTitle={`Total: ${sumDurationOfLogGroup(logGroup)}`}
              >
                {logGroup.reverse().map((log) => (
                  <WorkdayEntry
                    key={log.id}
                    sumOfLastSeven={getSumOfTimeOfLastSevenDays(log.id)!}
                    startedAt={log.startTime}
                    endedAt={log.endTime}
                  />
                ))}
              </CollapsibleSection>
            ))}
          </FluidCard>
        </Column>
        {/* <Column>
        <Card icon={<TbPigMoney />} title="Payroll">
          <SideBySide>
            <PiledInfo>
              <div>TODAY</div>
              <div>U$176.00</div>
              <div>8 hours</div>
            </PiledInfo>
            <PiledInfo>
              <div>WEEK</div>
              <div>U$880.00</div>
              <div>40 hours</div>
            </PiledInfo>
          </SideBySide>
        </Card>
        <Card icon={<TbClipboardCheck />} title="Overwork"></Card>
      </Column> */}
      </Columns>
    </Container>
  );
};

export default Details;

const FluidCard = styled(Card)`
  flex: 1;
  gap: 16px;
`;

const SideBySide = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PiledInfo = styled.div`
  & > div:nth-child(1) {
    font-weight: 700;
  }
  & > div:nth-child(2) {
    font-weight: 400;
    font-size: ${({ theme }) => theme.font.sizes.title};
  }
  & > div:nth-child(3) {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Columns = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: vertical;
  gap: 16px;
  width: 100%;
`;
