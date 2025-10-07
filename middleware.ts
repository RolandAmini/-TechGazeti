import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value;
  if (req.nextUrl.pathname.startsWith('/api/admin') && req.nextUrl.pathname !== '/api/admin/login') {
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
      jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ['/api/admin/:path*'] };