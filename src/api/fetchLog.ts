import { nanoid } from 'nanoid';

import log from '~/mock/ELD-log.json';
import { Log } from '~/types/logTypes';

export default async (): Promise<Log[]> => log[0].data.map((log) => ({ ...log, id: nanoid() }));
