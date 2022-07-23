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
  const { GITHUB_CLIENT_ID } = useRuntimeConfig()
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user:email`
}

export async function logout() {
  await $fetch('/api/auth/logout')
  const { refresh } = await useUser()
  await refresh()
}
