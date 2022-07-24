import NodeCache from 'node-cache'

let cache: NodeCache | undefined

export function getCache() {
  if (!cache) {
    cache = new NodeCache({
      stdTTL: 60 * 10, // 10 minutes
    })
  }
  return cache
}
