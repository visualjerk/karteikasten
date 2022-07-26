export function useUser() {
  return useAsyncQuery(['users.get'], {
    server: false,
    lazy: true,
  })
}

export function login() {
  if (!process.client) {
    return
  }
  window.location.pathname = '/api/auth/login'
}

export async function logout() {
  await $fetch('/api/auth/logout')
  await refreshNuxtData()
  useRouter().push('/')
}
