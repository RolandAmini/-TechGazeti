import { NextResponse } from 'next/server';
import connectDB from '@/utils/mongodb';
import Ad from '@/models/Ad';

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    await Ad.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur suppression pub:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
