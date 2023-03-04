import styled from 'styled-components';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { TbClockPlay, TbClockStop, TbAlertTriangleFilled } from 'react-icons/tb';

dayjs.extend(duration);

import fixRange from '~/utils/fixRange';

interface WorkdayEntryProps {
  startedAt: string;
  endedAt: string;
  sumOfLastSeven: string;
}

const WorkdayEntry = ({ startedAt: _startedAt, endedAt: _endedAt, sumOfLastSeven }: WorkdayEntryProps) => {
  const [startedAt, endedAt] = fixRange(_startedAt, _endedAt);

  return (
    <Wrapper>
      <Card>
        <WeekDayTag>
          <span>{startedAt.format('ddd')}</span>
        </WeekDayTag>
        <DateWrapper>
          <div>{startedAt.format('DD')}</div>
          <div>{startedAt.format('MMM')}</div>
        </DateWrapper>
        <div>
          Last seven
          <IconTime>
            <TbAlertTriangleFilled />
            {sumOfLastSeven}
          </IconTime>
        </div>
        <div>
          Started at
          <IconTime>
            <TbClockPlay />
            {startedAt.format('HH:mm')}
          </IconTime>
        </div>
        <div>
          Ended at
          <IconTime>
            <TbClockStop />
            {endedAt.format('HH:mm')}
          </IconTime>
        </div>
      </Card>
      <div>
        Total
        <IconTime>{dayjs.duration(endedAt.diff(startedAt)).format('HH:mm')}</IconTime>
      </div>
    </Wrapper>
  );
};

export default WorkdayEntry;

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
