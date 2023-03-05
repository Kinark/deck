import dayjs from 'dayjs';
import { Duration } from 'dayjs/plugin/duration';

import { Day, Interval } from '~/types/logTypes';

import fixRange from './fixRange';

export const showSumOfDurations = (duration: Duration): string => {
  const minutes = +duration.asMinutes().toFixed(0);
  const minutesString = minutes! % 60;
  const groupDurationFormatted = `${Math.floor(minutes! / 60)}:${minutesString == 0 ? '00' : minutesString}`;
  return groupDurationFormatted;
};

export const sumDurationOfLogs = (logs: Interval[]): Duration => {
  return logs.reduce<Duration | null>((acc, { startTime, endTime }) => {
    const duration = dayjs.duration(endTime.diff(startTime));
    if (!acc) return duration;
    return acc.add(duration);
  }, null)!;
};

export default function sumDurationOfDays(days: Day[]): Duration {
  return days.reduce<Duration | null>((acc, curr) => {
    const duration = sumDurationOfLogs(curr.logs);
    if (!acc) return duration;
    return acc.add(duration);
  }, null)!;
}
