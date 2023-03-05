import { nanoid } from 'nanoid';

import log from '~/mock/ELD-log.json';
import { Log } from '~/types/logTypes';

export default async (): Promise<Log[]> => {
  return log
    .reduce<Omit<Log, 'id'>[]>((acc, log) => [...acc, ...log.data], [])
    .map((log) => ({ ...log, id: nanoid() }));
};
