"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, BookOpen, TrendingUp, Layers } from "lucide-react";

interface Category {
  name: string;
  count: number;
  description?: string;
  color: string;
  icon: string;
}

interface Article {
  _id: string;
  category: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Couleurs et icônes par défaut pour chaque catégorie
  const categoryStyles: Record<string, { color: string; icon: string; description: string }> = {
    "React Development": {
      color: "from-blue-500 to-cyan-500",
      icon: "⚛️",
      description: "Composants, hooks, et bonnes pratiques React"
    },
    "JavaScript": {
      color: "from-yellow-500 to-orange-500",
      icon: "🟨",
      description: "JavaScript moderne, ES6+ et astuces de programmation"
    },
    "Web Development": {
      color: "from-purple-500 to-pink-500",
      icon: "🌐",
      description: "HTML, CSS, et développement web front-end"
    },
    "Backend": {
      color: "from-green-500 to-emerald-500",
      icon: "⚙️",
      description: "Node.js, APIs, bases de données et architecture serveur"
    },
    "DevOps": {
      color: "from-indigo-500 to-blue-500",
      icon: "🚀",
      description: "Déploiement, CI/CD, Docker et automatisation"
    },
    "UI/UX Design": {
      color: "from-pink-500 to-rose-500",
      icon: "🎨",
      description: "Design d'interface, expérience utilisateur et prototypage"
    },
    "Mobile Development": {
      color: "from-teal-500 to-cyan-500",
      icon: "📱",
      description: "React Native, applications mobiles et responsive design"
    },
    "Tutorial": {
      color: "from-orange-500 to-red-500",
      icon: "📚",
      description: "Tutoriels pas à pas et guides pratiques"
    }
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/articles");
        if (!res.ok) throw new Error("Erreur lors du chargement des articles");
        const articles: Article[] = await res.json();

        // Compter les articles par catégorie
        const categoryCount: Record<string, number> = {};
        articles.forEach((article) => {
          categoryCount[article.category] = (categoryCount[article.category] || 0) + 1;
        });

        // Créer le tableau de catégories avec leurs informations
        const categoriesArray: Category[] = Object.entries(categoryCount).map(
          ([name, count]) => ({
            name,
            count,
            color: categoryStyles[name]?.color || "from-gray-500 to-slate-500",
            icon: categoryStyles[name]?.icon || "📝",
            description: categoryStyles[name]?.description || "Articles sur " + name
          })
        );

        // Trier par nombre d'articles (décroissant)
        categoriesArray.sort((a, b) => b.count - a.count);
        setCategories(categoriesArray);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-xl text-gray-600">Loading categories...</div>
      </div>
    );
  }

  const totalArticles = categories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <nav className="container mx-auto px-6 py-4">
          <a href="/" className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <ArrowLeft size={20} />
            <span className="font-medium">Back Home</span>
          </a>
        </nav>
      </header>

      {/* Page Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Explorez par Catégorie
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
           Discover our articles organized by theme to facilitate your learning
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 flex-wrap">
            <div className="bg-white rounded-2xl px-8 py-4 shadow-lg">
              <div className="flex items-center gap-3">
                <Layers className="text-blue-600" size={24} />
                <div className="text-left">
                  <div className="text-3xl font-bold text-gray-900">{categories.length}</div>
                  <div className="text-sm text-gray-600">Catégories</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl px-8 py-4 shadow-lg">
              <div className="flex items-center gap-3">
                <BookOpen className="text-green-600" size={24} />
                <div className="text-left">
                  <div className="text-3xl font-bold text-gray-900">{totalArticles}</div>
                  <div className="text-sm text-gray-600">Articles</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No categories available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {categories.map((category) => (
              <a
                key={category.name}
                href={`/articles?category=${encodeURIComponent(category.name)}`}
                className="group relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div className="mb-4">
                    <span className="text-6xl">{category.icon}</span>
                  </div>

                  {/* Category Name */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 line-clamp-2">
                    {category.description}
                  </p>

                  {/* Article Count & Arrow */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                        {category.count}
                      </div>
                      <span className="text-sm text-gray-600">
                        article{category.count > 1 ? "s" : ""}
                      </span>
                    </div>
                    
                    <div className="text-blue-600 group-hover:translate-x-2 transition-transform">
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Decorative Element */}
                <div className={`absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-br ${category.color} rounded-full opacity-20 group-hover:opacity-30 transition-opacity`}></div>
              </a>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-3xl shadow-xl p-12 max-w-3xl mx-auto">
            <TrendingUp className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Envie de voir tous les articles ?
            </h3>
            <p className="text-gray-600 mb-6">
              Browse our entire library of articles
            </p>
            <a
              href="/articles"
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
             See all articles
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}