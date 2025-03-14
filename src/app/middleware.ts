import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {

  const cspHeader = `
    script-src 'self' https://pixel.dcard.tw https://unpkg.com/@dcard/web-ad-tracking-sdk https://assets.dcard.tw/scripts/web-ad-tracking-sdk;
    img-src 'self' blob: data: https://pixel.dcard.tw;
`
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()

  const requestHeaders = new Headers(request.headers)

  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )

  return response
}
