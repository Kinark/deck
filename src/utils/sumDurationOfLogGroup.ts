import dayjs from "dayjs";
import { Duration } from "dayjs/plugin/duration";

import { Log } from "~/types/logTypes";

import fixRange from "./fixRange";

export default function sumDurationOfLogGroup(logs: Log[]): string {
  const groupDuration = logs.reduce<Duration | null>((acc, curr) => {
    const [startedAt, endedAt] = fixRange(curr.startTime, curr.endTime);
    const duration = dayjs.duration(endedAt.diff(startedAt));
    if (!acc) return duration;
    return acc.add(duration);
  }, null);
  const minutes = groupDuration?.asMinutes();
  const groupDurationFormatted = `${Math.floor(minutes! / 60)}:${minutes! % 60}`;
  return groupDurationFormatted;
}
