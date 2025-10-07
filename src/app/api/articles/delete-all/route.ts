import { NextResponse } from "next/server";
import Article from "@/models/Article";
import connectDB from "@/utils/mongodb";

export async function DELETE() {
  try {
    await connectDB();
    const result = await Article.deleteMany({});
    return NextResponse.json({ message: "Tous les articles supprimés", result });
  } catch (error) {
    console.error("Erreur suppression:", error);
    return NextResponse.json({ error: "Erreur suppression articles" }, { status: 500 });
  }
}
