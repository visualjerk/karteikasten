const useAuthCookie = () => useCookie('gh_token')

export async function getUser() {
  useState('initializing').value = true
  if (!process.client) {
    return
  }
  const user = await $fetch('/api/user')
  useState('user').value = user
  useState('initializing').value = false
}

export const login = () => {
  if (!process.client) {
    return
  }
  const { GITHUB_CLIENT_ID } = useRuntimeConfig()
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user:email`
}

export const logout = async () => {
  useAuthCookie().value = null
  useState('user').value = null
}
