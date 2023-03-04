import dayjs, { Dayjs } from 'dayjs';

export default (_startedAt: string, _endedAt: string): [Dayjs, Dayjs] => {
  const startedAt = dayjs(_startedAt);
  let endedAt = dayjs(_endedAt);

  if (endedAt.isAfter(startedAt, 'date')) {
    endedAt = startedAt.set('hour', 23).set('minute', 59);;
  }
  return [startedAt, endedAt];
};
