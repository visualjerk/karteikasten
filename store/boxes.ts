import { Box } from '@/server/trpc/types'

type BoxQuery = ReturnType<typeof useAsyncQuery<'boxes.get'>>
type BoxId = Box['id']

const boxQuerys: Map<BoxId, BoxQuery> = new Map()

export function useBox(id: BoxId): BoxQuery {
  if (!boxQuerys.has(id)) {
    boxQuerys.set(id, useAsyncQuery(['boxes.get', { id }], {
      server: false,
      initialCache: false,
    })) 
  }
  // As we set the query, we can assume it is available
  return boxQuerys.get(id) as BoxQuery
}
