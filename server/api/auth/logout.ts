export default defineEventHandler((event) => {
  deleteCookie(event, 'gh_token')
  return true
})
