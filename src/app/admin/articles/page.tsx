"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react"; // <-- icônes Lucide

type Article = {
  _id: string;
  title: string;
  content: string;
  published: boolean; // true = publié, false = brouillon
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Charger les articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/articles");
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error("Erreur chargement articles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  // Supprimer un article
  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cet article ?")) return;
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setArticles((prev) => prev.filter((a) => a._id !== id));
      }
    } catch (err) {
      console.error("Erreur suppression:", err);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.push("/admin")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline font-medium">Tableau de bord</span>
        </button>
        <div className="h-6 w-px bg-slate-300 hidden sm:block" />
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-6 h-6 text-indigo-600" />
          Tous les Articles
        </h1>
      </div>

      {/* Liste d'articles */}
      {loading ? (
        <p>Chargement...</p>
      ) : articles.length === 0 ? (
        <p className="text-gray-500">Aucun article trouvé.</p>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <div
              key={article._id}
              className="border p-4 rounded-md shadow-sm flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{article.title}</h2>
                <p className="text-sm text-gray-600">
                  {article.published ? "Publié" : "Brouillon"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/articles/edit/${article._id}`)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(article._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
