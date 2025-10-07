import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { serialize } from "cookie";
import Admin from '@/models/Admin';
import connectDB from '@/utils/mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export async function POST(req: NextRequest) {
  await connectDB();

  const { username, password } = await req.json();

  const admin = await Admin.findOne({ username });
  if (!admin || !(await admin.comparePassword(password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Génère JWT
  const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: '1h' });

  // Set cookie HTTP-only et secure
  const cookie = serialize('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600,  // 1 heure
    path: '/',
  });

  const response = NextResponse.json({ message: 'Login successful' });
  response.headers.set('Set-Cookie', cookie);
  return response;
}