import { GH_COOKIE } from '@/constants'
import { useQuery, sendRedirect, setCookie } from 'h3'
import { DateTime } from 'luxon'

export default defineEventHandler(async (event) => {
  const { code } = useQuery(event)

  if (!code) {
    return sendRedirect(event, '/')
  }
  const response: any = await $fetch(
    'https://github.com/login/oauth/access_token',
    {
      method: 'POST',
      body: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
    }
  )
  if (response.error) {
    return sendRedirect(event, '/')
  }

  setCookie(event, GH_COOKIE, response.access_token, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: DateTime.now().plus({ days: 7 }).toJSDate(),
  })

  return sendRedirect(event, '/')
})
