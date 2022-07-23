import { sendRedirect } from 'h3'

export default defineEventHandler((event) =>
  sendRedirect(
    event,
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user:email`
  )
)
