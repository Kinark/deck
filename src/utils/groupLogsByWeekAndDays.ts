import dayjs, { Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);

import { Log, Interval, Day } from '~/types/logTypes';

function groupLogsByWeekAndDays(logs: Log[]): Day[][] {
  const intervalsByWeek: Day[][] = [];
  const intervalsByDay: Interval[][] = [];
  const days: Day[][] = []

  let lastExceedingEndTime: Dayjs | null = null;

  logs
    .map((log) => ({
      startTime: dayjs(log.startTime),
      endTime: dayjs(log.endTime),
    }))
    .sort((a, b) => a.startTime.valueOf() - b.startTime.valueOf())
    .forEach(({ startTime, endTime }) => {
      let actualEndTime = endTime;

      let todayLogs: Interval[] = [];

      if (lastExceedingEndTime) {
        todayLogs.push({
          startTime: startTime.hour(0).minute(0).second(0),
          endTime: lastExceedingEndTime,
        });
        lastExceedingEndTime = null;
      }

      if (!endTime.isSame(startTime, 'date')) {
        actualEndTime = startTime.hour(23).minute(59).second(59);
        lastExceedingEndTime = endTime;
      }

      todayLogs.push({ startTime, endTime: actualEndTime });

      if (todayLogs[1] && todayLogs[0].endTime.isAfter(todayLogs[1].startTime)) {
        todayLogs = [{ startTime: todayLogs[0].startTime, endTime: todayLogs[1].endTime }];
      }

      const existentDay = intervalsByDay.find((day) => day[0].startTime.isSame(todayLogs[0].startTime, 'date'));

      if (existentDay) {
        existentDay.push(...todayLogs);
        return;
      }

      intervalsByDay.push(todayLogs);
    });


  intervalsByDay.forEach((day) => {
    const dayWithId: Day = {
      id: day[0].startTime.format('YYYY-MM-DD'),
      logs: day,
    };
    const currentWeek = day[0].startTime.week() - 1;
    const rightWeek = intervalsByWeek[currentWeek];
    if (rightWeek) {
      rightWeek.push(dayWithId);
    } else {
      intervalsByWeek[currentWeek] = [dayWithId];
    }
  });

  return intervalsByWeek;
}

export default groupLogsByWeekAndDays;
