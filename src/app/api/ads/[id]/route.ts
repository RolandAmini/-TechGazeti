import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb'; // Maintenant utilisé
import Ad from '@/models/Ad';     // Maintenant utilisé

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  try {
    await connectDB(); // On utilise la connexion à la DB

    // On utilise le modèle pour trouver et supprimer la publicité
    const deletedAd = await Ad.findByIdAndDelete(id);

    if (!deletedAd) {
      return NextResponse.json(
        { success: false, message: 'Publicité non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Publicité supprimée' });
 } catch { // <-- On supprime complètement (_error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}