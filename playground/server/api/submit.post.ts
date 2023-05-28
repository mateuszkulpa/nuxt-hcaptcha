export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const captchaResponse = await verifyHCaptchaToken(body.token)

  return {
    captchaResponse,
    token: body.token
  }
})
