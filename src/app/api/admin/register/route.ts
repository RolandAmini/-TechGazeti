import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Admin from "@/models/Admin"; // Ajuste le chemin si ton dossier models est ailleurs

export async function GET() {
  try {
 const URI = process.env.DB_URI;
    
    if (!URI) {
      return NextResponse.json({ error: "La variable MONGODB_URI n'est pas définie dans .env.local" }, { status: 500 });
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(URI);
    }

    // Définis ici l'email et le mot de passe de ton choix pour ton projet
    const email = "admin@techgazeti.com"; 
    const password = "MonMotDePasseSecurise123"; 

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json({ message: "L'administrateur existe déjà avec cet email." });
    }

    const newAdmin = new Admin({ email, password });
    await newAdmin.save();

    return NextResponse.json({
      success: true,
      message: "Compte Administrateur réel créé avec succès dans MongoDB !",
      email: email
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}