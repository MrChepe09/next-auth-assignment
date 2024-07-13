import { NextResponse, type NextRequest } from 'next/server'
import { jwtVerify } from 'jose';

const jwt_secret = process.env.JWT_SECRET;
const SECRET = new TextEncoder().encode(jwt_secret);
 
export async function middleware(request: NextRequest) {
  const token: string = request.cookies.get('token')?.value || "";
  const { pathname } = request.nextUrl;

  if(pathname === '/' && token){
    try {
    const { payload } = await jwtVerify(token, SECRET);
    const url = payload.type === 'admin' ? '/admin' : '/user';
    const response = NextResponse.redirect(new URL(url, request.url));
    response.headers.set('x-middleware-cache', 'no-cache');
    return response;
    } catch(err) {
      const response = NextResponse.next();
      response.headers.set('x-middleware-cache', 'no-cache');
      return response;
    } 
  } 

  if(pathname !== '/' && !token){
    const response = NextResponse.redirect(new URL('/', request.url));
    response.headers.set('x-middleware-cache', 'no-cache');
    return response;
  }

  if(pathname !== '/') {
    try {
      const { payload } = await jwtVerify(token, SECRET);
      
      if(pathname.startsWith('/admin') && payload.type !== 'admin'){
        const response = NextResponse.redirect(new URL('/user', request.url));
        response.headers.set('x-middleware-cache', 'no-cache');
        return response;
      }

      if(pathname.startsWith('/user') && payload.type === 'admin'){
        const response = NextResponse.redirect(new URL('/admin', request.url));
        response.headers.set('x-middleware-cache', 'no-cache');
        return response;
      }
      
    } catch(err) {
      const response = NextResponse.redirect(new URL('/', request.url));
      response.headers.set('x-middleware-cache', 'no-cache');
      return response;
    } 
  }

  const response = NextResponse.next();
  response.headers.set('x-middleware-cache', 'no-cache');
  return response;
}

export const config = {
  matcher: ['/', '/user', '/admin'],
}