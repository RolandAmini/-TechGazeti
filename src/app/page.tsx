
"use client";
import { useState, useEffect } from "react";
import Billboard from "@/components/Billboard";
import Image from "next/image";
import { Search } from "lucide-react";
import Link from "next/link";

interface Article {
  _id: string;
  title: string;
  image: string;
  category: string;
  date?: string;
  excerpt?: string;
}

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Récupération des articles depuis l'API
  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/articles");
        if (!res.ok) throw new Error("Erreur lors du fetch des articles");
        const data: Article[] = await res.json();
        setArticles(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchArticles();
  }, []);

  // Vérifie si un token existe dans localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-indigo-200 min-h-screen flex flex-col">
      {/* ==================== NAVBAR ==================== */}
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-black tracking-tight">
            TechGazeti
          </h1>
          <ul className="hidden md:flex space-x-6 font-medium text-gray-700">
            <li>
              <Link href="/" className="hover:underline hover:text-sky-400">home</Link>
            </li>
            <li>
              <Link href="#" className="hover:underline hover:text-sky-400">Articles</Link>
            </li>
            <li>
              <Link href="#" className="hover:underline hover:text-sky-400">Categories</Link>
            </li>
            <li>
              <Link href="#" className="hover:underline hover:text-sky-400">About</Link>
            </li>
          </ul>
          <form className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-xl" role="search">
            <Search className="w-5 h-5 text-gray-500" aria-hidden="true" />
            <input
              type="text"
              placeholder="search..."
              className="bg-transparent ml-2 outline-none text-sm"
              aria-label="Rechercher"
            />
          </form>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition"
            >
              logout
            </button>
          ) : (
            <Link
              href="/admin/login"
              className="px-4 py-2 rounded-xl bg-yellow-400 text-black font-medium hover:bg-pink-300 transition"
            >
              login
            </Link>
          )}
        </nav>
      </header>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="flex-1 container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* ==== Colonne principale ==== */}
        <section className="md:col-span-2 space-y-10">
          {/* Articles en vedette - Version large */}
          {articles.slice(0, 2).map((a) => (
            <article
              key={a._id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={a.image || "/images/default.jpg"}
                  alt={a.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-xs uppercase bg-black/70 text-white px-2 py-1 rounded">
                  {a.category}
                </span>
              </div>
              <div className="p-5 space-y-2">
                <span className="text-xs text-gray-500">{a.date}</span>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                  {a.title}
                </h3>
                {a.excerpt && (
                  <p className="text-gray-600 text-sm line-clamp-2">{a.excerpt}</p>
                )}
                <Link
                  href={`/article/${a._id}`}
                  className="text-blue-600 hover:underline text-sm inline-block mt-2"
                  aria-label={`Lire l'article ${a.title}`}
                >
                  Lire l'article →
                </Link>
              </div>
            </article>
          ))}

          {/* Grille d'articles */}
          <div className="grid md:grid-cols-2 gap-6">
            {articles.slice(2).map((a) => (
              <article
                key={a._id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={a.image || "/images/default.jpg"}
                    alt={a.title}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 text-xs uppercase bg-black/70 text-white px-2 py-1 rounded">
                    {a.category}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-xs text-gray-500">{a.date}</span>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                    {a.title}
                  </h3>
                  <Link
                    href={`/article/${a._id}`}
                    className="text-blue-600 hover:underline text-sm"
                    aria-label={`Lire l'article ${a.title}`}
                  >
                    Lire l'article →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {articles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">Aucun article publié pour le moment.</p>
              <Link
                href="/admin/articles/new"
                className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              >
                Créer votre premier article
              </Link>
            </div>
          )}
        </section>

        {/* ==== Sidebar ==== */}
        <aside className="space-y-8">
          {/* Billboard vidéo */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="font-semibold mb-3 text-gray-800">🎬 new demo</h3>
            <Billboard />
          </div>
          {/* Articles populaires */}
          <div className="bg-white rounded-2xl shadow p-5">
            <h3 className="text-xl font-bold mb-4 text-gray-900">🔥 news</h3>
            <ul className="space-y-3">
              {articles.slice(0, 3).map((a) => (
                <li key={a._id}>
                  <Link href={`/article/${a._id}`} className="hover:text-blue-600">
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Catégories */}
          <div className="bg-white rounded-2xl shadow p-5">
            <h3 className="text-xl font-bold mb-4 text-gray-900">📂 Catégories</h3>
            <div className="flex flex-wrap gap-2">
              {["Tech", "Innovation", "PM", "Développement", "Culture"].map(
                (cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1 rounded-full bg-pink-300 text-sm text-gray-700 hover:bg-blue-100 hover:text-pink-300 cursor-pointer"
                  >
                    {cat}
                  </span>
                )
              )}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}