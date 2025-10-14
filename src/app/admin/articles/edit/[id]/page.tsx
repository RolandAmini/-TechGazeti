"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, X, FileText, FolderOpen, AlignLeft, Image, Eye } from "lucide-react";

type Article = {
  _id?: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  status: string;
};

export default function EditArticlePage() {
  const { id } = useParams();
  const router = useRouter();

  const [article, setArticle] = useState<Article>({
    title: "",
    category: "Tech",
    excerpt: "",
    content: "",
    image: "",
    status: "draft",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/articles/${id}`);
        if (!res.ok) throw new Error("Article introuvable");
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.error(error);
        alert("Erreur de chargement de l'article.");
        router.push("/admin/articles");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchArticle();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article),
      });

      if (!res.ok) throw new Error("Erreur lors de la mise à jour");

      alert("✅ Article mis à jour avec succès !");
      router.push("/admin/articles");
    } catch (error) {
      console.error(error);
      alert("❌ Une erreur est survenue");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/admin/articles")}
                className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium hidden sm:inline">Retour</span>
              </button>
              <div className="h-6 w-px bg-slate-300 hidden sm:block" />
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-6 h-6 text-indigo-600" />
                Modifier l'article
              </h1>
            </div>
            
            {/* Status badge */}
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              article.status === "published" 
                ? "bg-green-100 text-green-700" 
                : "bg-yellow-100 text-yellow-700"
            }`}>
              {article.status === "published" ? "🟢 Publié" : "🟡 Brouillon"}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card principale */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 space-y-6">
              {/* Titre */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  Titre de l'article
                </label>
                <input
                  type="text"
                  value={article.title}
                  onChange={(e) => setArticle({ ...article, title: e.target.value })}
                  placeholder="Ex: Les tendances tech de 2025"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                  required
                />
              </div>

              {/* Catégorie et Statut - Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Catégorie */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <FolderOpen className="w-4 h-4 text-indigo-600" />
                    Catégorie
                  </label>
                  <select
                    value={article.category}
                    onChange={(e) => setArticle({ ...article, category: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                  >
                    <option value="Tech">Tech</option>
                    <option value="Business">Business</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Développement">Développement</option>
                    <option value="IA">IA</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                {/* Statut */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <Eye className="w-4 h-4 text-indigo-600" />
                    Statut de publication
                  </label>
                  <select
                    value={article.status}
                    onChange={(e) => setArticle({ ...article, status: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 bg-white"
                  >
                    <option value="draft">🟡 Brouillon</option>
                    <option value="published">🟢 Publié</option>
                  </select>
                </div>
              </div>

              {/* Extrait */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <AlignLeft className="w-4 h-4 text-indigo-600" />
                  Extrait (résumé)
                </label>
                <textarea
                  value={article.excerpt}
                  onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
                  placeholder="Un bref résumé de l'article qui apparaîtra dans la liste..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400 resize-none"
                  rows={3}
                />
                <p className="mt-1 text-xs text-slate-500">Recommandé : 100-160 caractères</p>
              </div>

              {/* Image URL */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <Image className="w-4 h-4 text-indigo-600" />
                  URL de l'image
                </label>
                <input
                  type="text"
                  value={article.image}
                  onChange={(e) => setArticle({ ...article, image: e.target.value })}
                  placeholder="/images/mon-article.jpg"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                />
                {article.image && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-slate-200">
                    <img 
                      src={article.image} 
                      alt="Aperçu" 
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/images/default.jpg";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Contenu */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  Contenu de l'article
                </label>
                <textarea
                  value={article.content}
                  onChange={(e) => setArticle({ ...article, content: e.target.value })}
                  placeholder="Écrivez le contenu complet de votre article ici..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400 resize-none font-mono text-sm"
                  rows={16}
                  required
                />
                <p className="mt-1 text-xs text-slate-500">
                  {article.content.length} caractères
                </p>
              </div>
            </div>
          </div>

          {/* Actions - Sticky Bottom */}
          <div className="sticky bottom-0 bg-white border-t border-slate-200 rounded-xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                type="button"
                onClick={() => router.push("/admin/articles")}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
              >
                <X className="w-4 h-4" />
                Annuler
              </button>
              
              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:bg-slate-400 disabled:cursor-not-allowed shadow-sm"
              >
                <Save className="w-4 h-4" />
                {saving ? "Enregistrement..." : "Enregistrer les modifications"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}