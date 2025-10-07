// src/app/api/admin/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb"
import Admin from "@/models/Admin";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    // Vérifier si l’admin existe déjà
    const existing = await Admin.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "Admin déjà existant" },
        { status: 400 }
      );
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "Admin créé avec succès", adminId: newAdmin._id },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: "Erreur serveur", details: err.message },
      { status: 500 }
    );
  }
}
