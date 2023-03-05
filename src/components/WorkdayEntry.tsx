import styled from 'styled-components';
import dayjs from 'dayjs';
import duration, { Duration } from 'dayjs/plugin/duration';
import { nanoid } from 'nanoid';
import {
  TbClockPlay,
  TbClockStop,
  TbAlertTriangleFilled,
  TbClipboardCheck,
  TbMoodSadDizzy,
  TbInfoCircleFilled,
} from 'react-icons/tb';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import { Interval } from '~/types/logTypes';
import { showSumOfDurations, sumDurationOfLogs } from '~/utils/sumDurationOfDays';

dayjs.extend(duration);

const OVERWORKED_THRESHOLD = 70;
const OVERWORKED_WARNING_PERCENTAGE = 80;

const overworkedThresholdInSeconds = OVERWORKED_THRESHOLD * 60 * 60;

interface WorkdayEntryProps {
  logs: Interval[];
  sumOfLastSeven: Duration;
}

const WorkdayEntry = ({ logs, sumOfLastSeven }: WorkdayEntryProps) => {
  const firstEntry = logs[0].startTime;

  const isOverworked = sumOfLastSeven.asSeconds() > overworkedThresholdInSeconds;
  const overworkedPercentage = Math.round((sumOfLastSeven.asSeconds() / overworkedThresholdInSeconds) * 100);
  const overworkedWarning = overworkedPercentage > OVERWORKED_WARNING_PERCENTAGE;
  return (
    <Wrapper>
      <Card>
        <WeekDayTag>
          <span>{firstEntry.format('ddd')}</span>
        </WeekDayTag>
        <DateWrapper>
          <div>{firstEntry.format('DD')}</div>
          <div>{firstEntry.format('MMM')}</div>
        </DateWrapper>
        <TimeItem
          label="Overwork"
          tooltip={
            overworkedWarning
              ? isOverworked
                ? `You exceeded the limit of ${OVERWORKED_THRESHOLD} working hours in the last 7 days.`
                : `You worked ${overworkedPercentage}% of the allowed limit (${OVERWORKED_THRESHOLD} hours) in the last 7 days`
              : undefined
          }
          warning={overworkedWarning}
          icon={
            overworkedWarning ? isOverworked ? <TbMoodSadDizzy /> : <TbAlertTriangleFilled /> : <TbClipboardCheck />
          }
          time={showSumOfDurations(sumOfLastSeven)}
        />
        <div>
          {logs.map(({ startTime }) => (
            <TimeItem
              key={startTime.millisecond()}
              label="Started at"
              icon={<TbClockPlay />}
              time={startTime.format('HH:mm')}
            />
          ))}
        </div>
        <div>
          {logs.map(({ endTime }) => (
            <TimeItem
              key={endTime.millisecond()}
              label="Ended at"
              icon={<TbClockStop />}
              time={endTime.format('HH:mm')}
            />
          ))}
        </div>
      </Card>
      <div>
        Total
        <IconTime>{showSumOfDurations(sumDurationOfLogs(logs))}</IconTime>
      </div>
    </Wrapper>
  );
};

export default WorkdayEntry;

const TimeItem = ({
  warning,
  label,
  icon,
  time,
  tooltip,
}: {
  warning?: boolean;
  label: string;
  icon: React.ReactNode;
  time: string;
  tooltip?: string;
}) => {
  const id = nanoid();
  return (
    <TimeItemWrapper warning={warning}>
      <Tooltip id={id} />
      <TooltipWrapper>
        {label} {!!tooltip && <TbInfoCircleFilled data-tooltip-id={id} data-tooltip-content={tooltip} />}
      </TooltipWrapper>
      <IconTime>
        {icon}
        {time}
      </IconTime>
    </TimeItemWrapper>
  );
};

const TooltipWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  width: 100%;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors.bg};
  position: relative;
  border-radius: 24px;
  flex: 1;
`;

const WeekDayTag = styled.div`
  width: 55px;
  height: 55px;
  position: absolute;
  top: 0;
  left: -24px;
  bottom: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    display: block;
    text-align: center;
    height: min-content;
    padding: 0px 10px;
    border-radius: 100px;
    background-color: ${({ theme }) => theme.colors.body};
    font-size: ${({ theme }) => theme.font.sizes.small};
    color: ${({ theme }) => theme.colors.card};
    text-transform: uppercase;
    transform: rotate(-90deg);
  }
`;

const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  line-height: 100%;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.font.sizes.highlight};
  & > div:last-child {
    margin-top: -8px;
    font-size: ${({ theme }) => theme.font.sizes.body};
  }
`;

const IconTime = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.font.sizes.title};
`;

const TimeItemWrapper = styled.div<{ warning?: boolean }>`
  color: ${({ theme, warning }) => (warning ? theme.colors.error : 'inherit')};
  ${IconTime} {
    color: ${({ theme, warning }) => (warning ? theme.colors.error : theme.colors.secondary)};
  }
`;
