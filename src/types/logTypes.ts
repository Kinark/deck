import { Dayjs } from "dayjs";

export interface Ruleset {
  cycle: string;
  jurisdiction?: string;
  restart: string;
  shift: string;
  break?: string;
}

export interface EldSettings {
  rulesets: Ruleset[];
}

export interface Driver {
  timezone: string;
  eldSettings: EldSettings;
  id: string;
  name: string;
}

export interface ExternalIds {
  'samsara.serial': string;
  'samsara.vin': string;
}

export interface Vehicle {
  id: string;
  name: string;
  externalIds: ExternalIds;
}

export interface LogMetaData {
  shippingDocs: string;
  isCertified: boolean;
  certifiedAtTime?: string;
  vehicles?: Vehicle[];
}

export interface DistanceTraveled {
  driveDistanceMeters: number;
}

export interface DutyStatusDurations {
  activeDurationMs: number;
  onDutyDurationMs: number;
  driveDurationMs: number;
  offDutyDurationMs: number;
  sleeperBerthDurationMs: number;
  yardMoveDurationMs: number;
  personalConveyanceDurationMs: number;
  waitingTimeDurationMs: number;
}

export interface PendingDutyStatusDurations {
  activeDurationMs: number;
  onDutyDurationMs: number;
  driveDurationMs: number;
  offDutyDurationMs: number;
  sleeperBerthDurationMs: number;
  yardMoveDurationMs: number;
  personalConveyanceDurationMs: number;
  waitingTimeDurationMs: number;
}

export interface Log {
  id: string;
  driver: Driver;
  startTime: string;
  endTime: string;
  logMetaData: LogMetaData;
  distanceTraveled: DistanceTraveled;
  dutyStatusDurations: DutyStatusDurations;
  pendingDutyStatusDurations: PendingDutyStatusDurations;
}

export interface Pagination {
  endCursor: string;
  hasNextPage: boolean;
}

export interface RootObject {
  data: Log[];
  pagination: Pagination;
}

export interface Day {
  id: string;
  logs: Interval[];
}

export interface Interval {
  startTime: Dayjs;
  endTime: Dayjs;
}
