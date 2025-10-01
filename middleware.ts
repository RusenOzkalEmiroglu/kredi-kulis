import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Session'ı kontrol et
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Login sayfasını kontrol et
  if (request.nextUrl.pathname === '/login') {
    // Eğer zaten giriş yapmışsa, admin dashboarda yönlendir
    if (session) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    // x-pathname header'ını ekle
    response.headers.set('x-pathname', request.nextUrl.pathname)
    return response
  }

  // Admin route'larını koru
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Diğer admin sayfaları için authentication gerekli
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // x-pathname header'ını tüm isteklere ekle
  response.headers.set('x-pathname', request.nextUrl.pathname)

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 