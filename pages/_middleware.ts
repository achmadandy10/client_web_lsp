import jwt from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';
import nookies from 'nookies';

export default function middleware(req: NextRequest) {
  const { token } = req.cookies;
  const url = req.url;

  if (token && (url.includes('/login') || url.includes('/register'))) {
    const jwtDecode: any = jwt(token);
    if (jwtDecode.iss === process.env.NEXT_PUBLIC_API_ISS) {
      return NextResponse.redirect('/home');
    } else {
      nookies.destroy(null, 'token');
      return NextResponse.redirect('/500');
    }
  }
}