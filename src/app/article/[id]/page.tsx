"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Bookmark, PlayCircle, MoreHorizontal, MessageCircle } from "lucide-react";

interface Article {
  _id: string;
  title: string;
  image: string;
  category: string;
  date?: string;
  readTime?: string;
  excerpt?: string;
  content: string;
  author?: {
    name: string;
    avatar: string;
    portfolioUrl: string;
  };
}

function readingTime(text: string) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function ArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`/api/articles/${params.id}`);
        if (!res.ok) throw new Error("Article non trouvé");
        const data: Article = await res.json();
        setArticle(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) fetchArticle();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-xl text-[#6B6B6B]">Chargement...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#242424] mb-4">Article non trouvé</h1>
          <Link href="/" className="text-blue-600 hover:underline font-medium">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const content = article.content ?? "";

  // Découpage du contenu en blocs séparés par des lignes vides
  const blocks = content
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  const calculatedReadTime = article.readTime || `${readingTime(content)} min de lecture`;

  return (
    <div className="bg-white text-[#242424] min-h-screen flex flex-col font-sans">
      <main className="flex-1 px-5 pt-12 pb-20">
        <article className="mx-auto w-full max-w-[680px]">
          {/* Titre principal */}
          <h1 className="text-[32px] sm:text-[44px] leading-[1.15] font-extrabold tracking-tight text-[#242424]">
            {article.title}
          </h1>

          {/* Section Auteur & Métadonnées */}
          <div className="flex items-center gap-3 mt-8">
            {article.author?.avatar ? (
              <a
                href={article.author?.portfolioUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="h-11 w-11 rounded-full object-cover"
                />
              </a>
            ) : (
              <div className="h-11 w-11 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                {article.author?.name ? article.author.name.substring(0, 2).toUpperCase() : "TG"}
              </div>
            )}

            <div className="text-sm leading-snug">
              <p className="font-medium text-[#242424]">
                {article.author?.name || "TechGazeti"}
              </p>
              <p className="text-[#6B6B6B]">
                {calculatedReadTime} {article.date && `· ${article.date}`}
              </p>
            </div>
          </div>

          {/* Barre d'actions supérieure avec bordures fine (#F2F2F2) */}
          <div className="flex items-center justify-between gap-4 border-y border-[#F2F2F2] py-3 mt-8 text-sm">
            <Link
              href="/article"
              className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-blue-600 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Tous les articles
            </Link>

            <div className="flex items-center gap-2 sm:gap-3 text-[#6B6B6B]">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MessageCircle size={18} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bookmark size={18} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <PlayCircle size={18} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 size={18} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>

          {/* Image de couverture */}
          {article.image && (
            <div className="relative w-full aspect-[16/9] mt-8 bg-[#F7F7F7] overflow-hidden rounded-sm">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Rendu du contenu textuel */}
          <div className="mt-10 text-[20px] leading-[32px] text-[#242424]">
            {blocks.map((block, i) =>
              block.startsWith("## ") ? (
                <h2
                  key={i}
                  className="text-[26px] leading-tight font-extrabold tracking-tight mt-12 mb-4 text-[#242424]"
                >
                  {block.replace(/^##\s+/, "")}
                </h2>
              ) : (
                <p key={i} className="mb-8 whitespace-pre-line text-[#242424] leading-[32px]">
                  {block}
                </p>
              )
            )}
          </div>
        </article>
      </main>
    </div>
  );
}