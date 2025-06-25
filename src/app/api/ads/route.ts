import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Ad from '@/models/Ad';
import connectDB from '@/utils/mongodb';

// ✅ GET - récupérer toutes les pubs actives
export async function GET() {
  await connectDB();
  try {
    const ads = await Ad.find({ isActive: true });
    return NextResponse.json({ success: true, ads });
  } catch (error) {
    console.error('Erreur lors du chargement des pubs:', error);
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 });
  }
}

// ✅ POST - créer une nouvelle pub
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { advertiserName, imageUrl, duration } = body;

    if (!advertiserName || !imageUrl || !duration) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const newAd = await Ad.create({
      advertiserName,
      imageUrl,
      duration,
    });

    return NextResponse.json({ success: true, ad: newAd });
  } catch (error) {
    console.error('Error creating ad:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
