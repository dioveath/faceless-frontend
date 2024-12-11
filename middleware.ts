import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from './app/utils/supabase/middleware'



export async function middleware(request: NextRequest) {
  const publicPaths = [
    '/',
    '/api/videos/**'
  ]

  const matcher = new RegExp(
    publicPaths
      .map((path) => {
        if (path.includes('**')) {
          return path.replace('**', '.*').replace(/\/$/, '') + '(\\/|$)';
        }
        return path.replace(/\/$/, '') + '(\\/|$)';
      })
      .join('|')
  )

  if (request.nextUrl.pathname.startsWith('/api/webhooks'))
    return NextResponse.next()
  if (matcher.test(request.nextUrl.pathname))
    return NextResponse.next()
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}