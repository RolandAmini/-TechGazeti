import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import  connectDB  from "@/utils/mongodb";
import Admin from "@/models/Admin";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    // Vérifie que les champs sont fournis
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    // Recherche de l’admin dans la base
    const admin = await Admin.findOne({ email });

    if (!admin) {
      console.log("❌ Aucun admin trouvé avec cet email:", email);
      return NextResponse.json(
        { message: "Identifiants invalides" },
        { status: 401 }
      );
    }

    // Vérifie le mot de passe
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("✅ Vérification du mot de passe:", isMatch);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Identifiants invalides" },
        { status: 401 }
      );
    }

    // Connexion réussie
    console.log("✅ Admin connecté:", admin.email);
    return NextResponse.json(
      { message: "Connexion réussie", email: admin.email },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur API login:", error);
    return NextResponse.json(
      { message: "Erreur serveur", error },
      { status: 500 }
    );
  }
}
