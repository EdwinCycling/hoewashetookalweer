import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Basic protection for admin routes
  // The actual admin check is handled in the admin layout
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // This middleware can be enhanced later with more sophisticated auth checks
    // For now, we'll let the client-side auth handle the admin verification
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
