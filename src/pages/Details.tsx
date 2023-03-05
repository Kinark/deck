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
import sumDurationOfDays, {showSumOfDurations} from '~/utils/sumDurationOfDays';
import groupLogsByWeekAndDays from '~/utils/groupLogsByWeekAndDays';

dayjs.extend(weekOfYear);

const Details = () => {
  const [, setnavBarSelectedUserId] = useAtom(navBarSelectedUserIdAtom);
  const [eldLog] = useAtom(eldLogAtom);
  const [driverLogs, setDriverLogs] = useState<Log[]>([]);
  const navigate = useNavigate();
  const { driverId } = useParams();

  useEffect(() => {
    if (!driverId) return navigate('/');
    const newDriverLogs = eldLog.filter((log) => log.driver.id === driverId);
    setnavBarSelectedUserId(driverId);
    setDriverLogs(newDriverLogs);
  }, [driverId]);

  const groupedLogs = useMemo(() => {
    return groupLogsByWeekAndDays(driverLogs);
  }, [driverLogs]);

  const plainLogs = useMemo(() => {
    return groupedLogs.flat()
  }, [groupedLogs]);

  const getSumOfTimeOfLastSevenDays = (id: string) => {
    const refIndex = plainLogs.findIndex((log) => log.id === id);
    const lastSevenDays = plainLogs.slice(Math.max(0, refIndex - 6), refIndex + 1);
    return sumDurationOfDays(lastSevenDays);
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
            {groupedLogs.reverse().map((days, i) => {
              const firstLog = days[0].logs[0];
              return (
              <CollapsibleSection
                key={i}
                title={`Week ${dayjs(firstLog.startTime).week()} of ${dayjs(firstLog.startTime).year()}`}
                subTitle={`Total: ${showSumOfDurations(sumDurationOfDays(days))}`}
              >
                {days.reverse().map((day) => (
                  <WorkdayEntry
                    key={day.id}
                    logs={day.logs}
                    sumOfLastSeven={getSumOfTimeOfLastSevenDays(day.id)}
                  />
                ))}
              </CollapsibleSection>
            )})}
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
