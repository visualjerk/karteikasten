export const useAuthCookie = () => useCookie('gh_token')

const apiFetch = (url: string, fetchOptions: any = {}) => {
  return $fetch(url, {
    baseURL: 'https://api.github.com',
    ...fetchOptions,
    headers: {
      Authorization: `token ${useAuthCookie().value}`,
      ...fetchOptions.headers,
    },
  })
}

export const getUser = async () => {
  const cookie = useAuthCookie()
  const user = useState('user')
  if (cookie.value && !user.value) {
    user.value = await apiFetch('/user')
  }
}

export const login = () => {
  if (process.client) {
    const { GITHUB_CLIENT_ID } = useRuntimeConfig()
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user:email`
  }
}

export const logout = async () => {
  useAuthCookie().value = null
  useState('user').value = null
}
