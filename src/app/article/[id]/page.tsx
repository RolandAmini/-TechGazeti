"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Article {
  _id: string;
  title: string;
  image: string;
  category: string;
  date?: string;
  excerpt?: string;
  content: string;
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Chargement...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <nav className="container mx-auto px-6 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <ArrowLeft size={20} />
            <span className="font-medium">Retour</span>
          </Link>
        </nav>
      </header>

      {/* Article Content */}
      <article className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Image */}
          {article.image && (
            <div className="relative h-96">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-6 left-6 text-sm uppercase bg-black/70 text-white px-3 py-1 rounded">
                {article.category}
              </span>
            </div>
          )}

          <div className="p-8 md:p-12">
            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span>{article.date}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {article.title}
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {article.excerpt}
              </p>
            )}

            {/* Divider */}
            <div className="border-t border-gray-200 my-8"></div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {article.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="text-lg text-gray-800 mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}