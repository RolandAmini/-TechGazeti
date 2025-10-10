"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

interface Article {
  _id: string;
  title: string;
  image: string;
  category: string;
  date?: string;
  readTime?: string;
  excerpt?: string;
  author?: {
    name: string;
    avatar: string;
  };
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/articles");
        if (!res.ok) throw new Error("Erreur lors du chargement des articles");
        const data: Article[] = await res.json();
        setArticles(data);
        
        // Extraire les catégories uniques
        const uniqueCategories = Array.from(
          new Set(data.map((article) => article.category))
        );
        setCategories(uniqueCategories);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  const filteredArticles =
    selectedCategory === "all"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-xl text-gray-600">Chargement des articles...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <nav className="container mx-auto px-6 py-4">
          <a href="/" className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <ArrowLeft size={20} />
            <span className="font-medium">Retour à l'accueil</span>
          </a>
        </nav>
      </header>

      {/* Page Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tous les Articles
          </h1>
          <p className="text-lg text-gray-600">
            Découvrez tous nos articles publiés
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Tous
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            {filteredArticles.length} article{filteredArticles.length > 1 ? "s" : ""} trouvé{filteredArticles.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">Aucun article trouvé dans cette catégorie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <a
                key={article._id}
                href={`/articles/${article._id}`}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      <Tag size={12} />
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    {article.date && (
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {article.date}
                      </span>
                    )}
                    {article.readTime && <span>• {article.readTime}</span>}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h2>

                  {/* Excerpt */}
                  {article.excerpt && (
                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>
                  )}

                  {/* Author */}
                  {article.author && (
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      {article.author.avatar && (
                        <img
                          src={article.author.avatar}
                          alt={article.author.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      <span className="text-sm font-medium text-gray-700">
                        {article.author.name}
                      </span>
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}