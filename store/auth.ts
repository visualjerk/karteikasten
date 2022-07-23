let userQuery: ReturnType<typeof useAsyncQuery<'getUser'>> | undefined

export function useUser() {
  if (!userQuery) {
    userQuery = useAsyncQuery(['getUser'])
  }
  return userQuery
}

export function login() {
  if (!process.client) {
    return
  }
  window.location.pathname = '/api/auth/login'
}

export async function logout() {
  await $fetch('/api/auth/logout')
  const { refresh } = await useUser()
  await refresh()
}
