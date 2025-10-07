import { NextResponse } from "next/server";

export async function POST() {
  // Ici tu pourrais supprimer un cookie ou une session
  const response = NextResponse.json({ message: "Déconnecté" });
  response.cookies.set("token", "", { maxAge: 0 }); // efface le cookie
  return response;
}
