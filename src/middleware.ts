import type { NextRequest } from 'next/server'
import {jwtVerify} from 'jose';
 
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  console.log('abc', token, request.nextUrl.pathname);
  if(token){
    try {
      const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
      const decoded = await jwtVerify(token, JWT_SECRET);
    
      const user_type = decoded.payload.type;

      if(user_type === 'admin' && !(request.nextUrl.pathname === '/admin')){
        return Response.redirect(new URL('/admin', request.url));
      }
      if(user_type === 'user' && !(request.nextUrl.pathname === '/user')){
        return Response.redirect(new URL('/user', request.url));
      }
    } catch (err) {
      if(!(request.nextUrl.pathname === '/')){
        return Response.redirect(new URL('/', request.url));
      }
    }
  } else {
    if(!(request.nextUrl.pathname === '/')){
      return Response.redirect(new URL('/', request.url));
    }
  }
}

export const config = {
  matcher: ['/', '/user', '/admin'],
}