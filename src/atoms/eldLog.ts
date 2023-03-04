import { atomsWithQuery } from 'jotai-tanstack-query'

import { Log } from '~/types/logTypes';

import fetchLog from '~/api/fetchLog';

export const [eldLogAtom] = atomsWithQuery<Log[]>((get) => ({
  queryKey: ['ELD-log'],
  queryFn: fetchLog,
}))
