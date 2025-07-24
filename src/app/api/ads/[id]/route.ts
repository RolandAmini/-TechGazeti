import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Ad from '@/models/Ad';

export async function DELETE(
  request: Request, // Le premier argument est la requête
  context: { params: { id: string } } // Le deuxième est le contexte avec les params
) {
  const { id } = context.params; // On récupère l'id depuis le contexte

  try {
    await connectDB();

    const deletedAd = await Ad.findByIdAndDelete(id);

    if (!deletedAd) {
      return NextResponse.json(
        { success: false, message: 'Publicité non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Publicité supprimée' });
  } catch { // On utilise un catch vide, car on n'utilise pas l'erreur
    return NextResponse.json(
      { success: false, message: 'Erreur serveur lors de la suppression' },
      { status: 500 }
    );
  }
}