const useAuthCookie = () => useCookie('gh_token')

function apiFetch(url: string, fetchOptions: any = {}) {
  return $fetch(url, {
    baseURL: '/api',
    ...fetchOptions,
    headers: {
      Authorization: `Bearer ${useAuthCookie().value}`,
      ...fetchOptions.headers,
    },
  })
}

export async function getUser() {
  if (!process.client) {
    return
  }
  try {
    const user = await apiFetch('/user')
    useState('user').value = user
  } catch (e) {
    console.error(e)
  }
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
