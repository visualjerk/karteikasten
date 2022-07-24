import { getCache } from '@/server/cache'

export default defineEventHandler((event) => {
  const { gh_token } = useCookies(event)
  if (!gh_token) {
    return true
  }
  getCache().del(gh_token)
  deleteCookie(event, 'gh_token')
  return true
})
