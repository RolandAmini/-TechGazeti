
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-indigo-200 h-screen flex flex-col overflow-hidden">
      {/* ==================== NAVBAR ==================== */}
      <header className=" fixed top-13 left-0 right-0 z-40 bg-white shadow-sm border-b">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-black tracking-tight">
            Gazeti
          </h1>
          <ul className="hidden md:flex space-x-6 font-medium text-gray-700">
            <li>
              <Link href="/demo" className="hover:underline hover:text-sky-400">Demo</Link>
            </li>
            <li>
            <Link href="/article" className="hover:underline hover:text-sky-400">
             Articles
           </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:underline hover:text-sky-400">Categories</Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline hover:text-sky-400">About</Link>
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
         {isLoggedIn && (
  <Link
    href="/admin"
    className="px-4 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
  >
    Back to Admin
  </Link>
)}
        </nav>
      </header>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="flex-1 overflow-hidden pt-[73px]">
        <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-10 container mx-auto px-6">
          {/* ==== Colonne principale - Main Content ==== */}
          <main className="md:col-span-2 overflow-y-auto py-10 pr-4">
            <div className="space-y-10">
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
                      Read the article →
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
                        Read the article →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {articles.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-600 text-lg">article → will be displayed in a few minutes</p>
                </div>
              )}
            </div>
          </main>

          {/* ==== Sidebar ==== */}
          <aside className="hidden md:block overflow-y-auto py-10 pl-4 border-l border-gray-200">
            <div className="space-y-8">
              {/* Billboard vidéo */}
              <div className="bg-white rounded-2xl shadow p-4">
                <h3 className="font-semibold mb-3 text-gray-800">New demo</h3>
                <Billboard />
              </div>
              
              {/* Articles populaires */}
              <div className="bg-white rounded-2xl shadow p-5">
                <h3 className="text-xl font-bold mb-4 text-gray-900">News</h3>
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
                <h3 className="text-xl font-bold mb-4 text-gray-900">Catégories</h3>
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
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}