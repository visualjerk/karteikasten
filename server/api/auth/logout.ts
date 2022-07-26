import { getCache } from '@/server/cache'
import { GH_COOKIE } from '@/constants'

export default defineEventHandler((event) => {
  const ghToken = useCookies(event)[GH_COOKIE]
  if (!ghToken) {
    return true
  }
  getCache().del(ghToken)
  deleteCookie(event, GH_COOKIE)
  return true
})
