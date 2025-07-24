// import { NextResponse } from 'next/server';
// import { connectDB } from '@/lib/mongodb';
// import Ad from '@/models/Ad';
//
// export async function DELETE(
//   request: Request,
//   context: { params: { id: string } }
// ) {
//   const { id } = context.params;
//
//   try {
//     await connectDB();
//
//     const deletedAd = await Ad.findByIdAndDelete(id);
//
//     if (!deletedAd) {
//       return NextResponse.json(
//         { success: false, message: 'Publicité non trouvée' },
//         { status: 404 }
//       );
//     }
//
//     return NextResponse.json({ success: true, message: 'Publicité supprimée' });
//   } catch {
//     return NextResponse.json(
//       { success: false, message: 'Erreur serveur lors de la suppression' },
//       { status: 500 }
//     );
//   }
// }