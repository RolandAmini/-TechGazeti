import { NextResponse } from 'next/server';
import connectDB from '@/utils/mongodb';
import Ad from '@/models/Ad';

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params; // On extrait l'id comme ça

  // ... le reste de votre logique pour supprimer l'élément
  // avec l'id récupéré.

  // Exemple de réponse
  return NextResponse.json({ success: true, message: `Ad ${id} deleted` });
}