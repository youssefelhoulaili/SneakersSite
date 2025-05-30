// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';

acceptLanguage.languages(['en', 'fr', 'ar']);

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = ['en', 'fr', 'ar'].every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Get the preferred locale from the Accept-Language header
    const acceptLangHeader = request.headers.get('accept-language');
    let locale = acceptLangHeader 
      ? acceptLanguage.get(acceptLangHeader) 
      : 'en';
    
    // If locale is not supported, use default locale
    if (!locale || !['en', 'fr', 'ar'].includes(locale)) {
      locale = 'en';
    }

    // Redirect to the locale version
    return NextResponse.redirect(
      new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
    );
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
