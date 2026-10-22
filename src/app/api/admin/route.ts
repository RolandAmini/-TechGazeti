import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/utils/mongodb";
import Admin from "@/models/Admin";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    // 1. Validation de présence
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    // 2. SÉCURITÉ STRICTE : Vérification que l'email correspond STRICTEMENT à l'admin unique du .env
    if (email.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()) {
      console.log("❌ Tentative de connexion avec un email non autorisé:", email);
      return NextResponse.json(
        { message: "Identifiants invalides" },
        { status: 401 }
      );
    }

    // 3. Recherche de l’admin dans la base pour récupérer son mot de passe haché
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      console.log("❌ Admin configuré dans le .env mais introuvable dans MongoDB.");
      return NextResponse.json(
        { message: "Identifiants invalides" },
        { status: 401 }
      );
    }

    // 4. Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Identifiants invalides" },
        { status: 401 }
      );
    }

    // 5. CRÉATION DU TOKEN DE SÉCURITÉ (JWT)
    const secret = process.env.JWT_SECRET || "fallback_secret";
    const token = jwt.sign(
      { adminId: admin._file || admin._id, email: admin.email },
      secret,
      { expiresIn: "1d" } // Le token expire après 24 heures
    );

    // 6. ENVOI DU COOKIE SÉCURISÉ (HTTP-Only)
    console.log("✅ Admin unique connecté avec succès:", admin.email);
    
    const response = NextResponse.json(
      { message: "Connexion réussie", email: admin.email },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true, // Empêche le JavaScript du navigateur d'y accéder (protection XSS)
      secure: process.env.NODE_ENV === "production", // Active le HTTPS obligatoire en production
      sameSite: "strict", // Empêche l'envoi du cookie lors de requêtes tierces (protection CSRF)
      maxAge: 60 * 60 * 24, // Durée de vie : 1 jour en secondes
      path: "/", // Valable sur tout le site
    });

    return response;

  } catch (error) {
    console.error("Erreur API login:", error);
    return NextResponse.json(
      { message: "Erreur serveur" },
      { status: 500 }
    );
  }
}

// Déconnexion : On nettoie le cookie
export async function DELETE() {
  const response = NextResponse.json({ message: "Déconnecté" });
  response.cookies.set("token", "", { maxAge: 0, path: "/" });
  return response;
}