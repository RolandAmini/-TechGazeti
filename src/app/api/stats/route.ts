import { NextResponse } from "next/server";
import Article from "@/models/Article";
import Follower from "@/models/Follower";
import connectDB from "@/utils/mongodb";

export async function GET() {
  await connectDB();

  // Nombre d’articles
  const articlesCount = await Article.countDocuments();

  // Nombre de followers
  const followersCount = await Follower.countDocuments();

  // Vues totales (somme des vues des articles)
  const articles = await Article.find({}, "views");
  const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);

  // Engagement (exemple : likes + comments / vues * 100)
  const totalLikes = articles.reduce((sum, a) => sum + (a.likes || 0), 0);
  const totalComments = articles.reduce((sum, a) => sum + (a.comments || 0), 0);
  const engagement =
    totalViews > 0
      ? (((totalLikes + totalComments) / totalViews) * 100).toFixed(1)
      : 0;

  return NextResponse.json({
    articles: articlesCount,
    followers: followersCount,
    views: totalViews,
    engagement: `${engagement}%`,
  });
}
