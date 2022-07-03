/* eslint-disable @next/next/no-server-import-in-page */
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jwt-decode';
import nookies from 'nookies';

export default function middleware(req: NextRequest) {
  const { token } = req.cookies;

  if (token) {
    const jwtDecode: any = jwt(token);
    if (jwtDecode.iss === process.env.NEXT_PUBLIC_API_ISS) {
      return NextResponse.next();
    } else {
      nookies.destroy(null, 'token');
      return NextResponse.redirect('/login');
    }
  } else {
    nookies.destroy(null, 'token');
    return NextResponse.redirect('/login');
  }
}