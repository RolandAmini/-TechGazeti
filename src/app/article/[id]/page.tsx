"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
        <div className="text-xl text-gray-600">Chargement...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
          <a href="/" className="text-blue-600 hover:underline">
            Retour à l'accueil
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 py-8">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
          {article.title}
        </h1>

        {/* Author Info & Meta */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            {article.author?.avatar && (
              <a 
                href={article.author?.portfolioUrl || "#"} 
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </a>
            )}
            <div>
              {article.author?.name && (
                <a 
                  href={article.author?.portfolioUrl || "#"} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gray-900 hover:text-blue-600 transition-colors block"
                >
                  {article.author.name}
                </a>
              )}
              <div className="flex items-center gap-3 text-sm text-gray-500">
                {article.readTime && <span>{article.readTime}</span>}
                {article.readTime && article.date && <span>•</span>}
                {article.date && <span>{article.date}</span>}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MessageCircle size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bookmark size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <PlayCircle size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MoreHorizontal size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Featured Image */}
        {article.image && (
          <div className="relative mb-12 rounded-lg overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {article.content.split('\n\n').map((paragraph, index) => (
            paragraph.trim() && (
              <p key={index} className="text-lg text-gray-800 mb-6 leading-relaxed">
                {paragraph}
              </p>
            )
          ))}
        </div>

        {/* Back to Home Link */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <a href="/" className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">Retour à l'accueil</span>
          </a>
        </div>
      </article>
    </div>
  );
}