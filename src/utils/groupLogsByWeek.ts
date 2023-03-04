import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import isBetween from 'dayjs/plugin/isBetween';
import weekday from 'dayjs/plugin/weekday';

import { Log } from '~/types/logTypes';

dayjs.extend(customParseFormat);
dayjs.extend(isoWeek);
dayjs.extend(isBetween);
dayjs.extend(weekday);

function groupLogsByWeek(logs: Log[]): Log[][] {
  if (!logs || logs.length === 0) {
    return [];
  }

  // Filter out logs without a defined startedAt property
  const validLogs = logs.filter(log => log.startTime);

  // Extract the date strings from the valid logs and convert them to dayjs objects
  const dates = validLogs.map(log => log.startTime);
  const sortedDates = dates.map(date => dayjs(date)).sort((a, b) => a.valueOf() - b.valueOf());

  // Find the first Sunday and last Saturday of the date range
  const firstSunday = sortedDates[0].weekday(0);
  const lastSaturday = sortedDates[sortedDates.length - 1].weekday(6);

  // Group logs by week
  const groupedLogs: Log[][] = [];
  let currentWeek: Log[] = [];
  let currentDate = firstSunday;
  while (currentDate.isBefore(lastSaturday.add(1, 'day'))) {
    currentWeek = validLogs.filter(log => dayjs(log.startTime!).isBetween(currentDate, currentDate.add(6, 'day'), null, '[]'));
    if (currentWeek.length > 0) {
      // Add the current week to the grouped logs array
      groupedLogs.push(currentWeek);
    }
    currentDate = currentDate.add(1, 'week').weekday(0);
  }

  return groupedLogs;
}

export default groupLogsByWeek;
