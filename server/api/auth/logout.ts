export default defineEventHandler(async function (event) {
  deleteCookie(event, 'gh_token')
  return true
})
