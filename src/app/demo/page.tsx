"use client";
import { useState } from "react";
import { ArrowLeft, Play, Clock, Eye, Star, ExternalLink } from "lucide-react";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  views: string;
  category: "tutorial" | "demo" | "promo";
  featured?: boolean;
}

export default function DemoPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Exemples de vidéos - Remplacez par vos vraies vidéos
  const videos: Video[] = [
    {
      id: "1",
      title: "Comment utiliser notre plateforme de blog",
      description: "Découvrez toutes les fonctionnalités de notre plateforme : créer des articles, gérer les catégories, et personnaliser votre contenu.",
      thumbnail: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=450&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "5:30",
      views: "1.2K",
      category: "tutorial",
      featured: true
    },
    {
      id: "2",
      title: "Démo : Création d'article en temps réel",
      description: "Regardez comment créer et publier un article complet en moins de 3 minutes avec notre éditeur intuitif.",
      thumbnail: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=800&h=450&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "2:45",
      views: "850",
      category: "demo"
    },
    {
      id: "3",
      title: "Nouveauté : Système de commentaires avancé",
      description: "Présentation de notre nouvelle fonctionnalité de commentaires avec modération automatique et notifications en temps réel.",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "4:15",
      views: "2.3K",
      category: "promo",
      featured: true
    },
    {
      id: "4",
      title: "Guide complet : Optimiser vos articles pour le SEO",
      description: "Apprenez les meilleures pratiques pour rendre vos articles visibles sur les moteurs de recherche.",
      thumbnail: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&h=450&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "8:20",
      views: "3.5K",
      category: "tutorial"
    },
    {
      id: "5",
      title: "Démo : Interface d'administration",
      description: "Tour complet de l'interface d'administration pour gérer votre contenu efficacement.",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "6:10",
      views: "1.8K",
      category: "demo"
    },
    {
      id: "6",
      title: "Promotion : Forfait Premium",
      description: "Découvrez toutes les fonctionnalités exclusives du forfait Premium et comment il peut booster votre contenu.",
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=450&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "3:00",
      views: "950",
      category: "promo"
    }
  ];

  const filteredVideos =
    selectedCategory === "all"
      ? videos
      : videos.filter((video) => video.category === selectedCategory);

  const featuredVideos = videos.filter((video) => video.featured);

  const categoryLabels: Record<string, string> = {
    all: "Tout",
    tutorial: "Tutoriels",
    demo: "Démos",
    promo: "Promotions"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
        <nav className="container mx-auto px-6 py-4">
          <a href="/" className="inline-flex items-center gap-2 text-white hover:text-purple-400 transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">Retour à l'accueil</span>
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Démos & Tutoriels
          </h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Découvrez comment utiliser notre plateforme à travers des vidéos explicatives et des démonstrations en direct
          </p>
        </div>

        {/* Featured Videos */}
        {featuredVideos.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Star className="text-yellow-400" size={32} />
              À la une
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                >
                  {/* Thumbnail */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                        <Play className="text-white ml-1" size={32} fill="white" />
                      </div>
                    </div>
                    <span className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {video.duration}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-purple-200 mb-4 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-purple-300">
                      <span className="flex items-center gap-1">
                        <Eye size={16} />
                        {video.views} vues
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === key
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                  : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="text-white ml-1" size={24} fill="white" />
                  </div>
                </div>
                <span className="absolute top-3 right-3 bg-black/80 text-white px-2 py-1 rounded-lg text-xs font-medium">
                  {video.duration}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-purple-200 text-sm mb-3 line-clamp-2">
                  {video.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-purple-300">
                  <span className="flex items-center gap-1">
                    <Eye size={14} />
                    {video.views}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="bg-slate-900 rounded-3xl max-w-5xl w-full overflow-hidden border border-purple-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Player */}
            <div className="relative aspect-video bg-black">
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Info */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                {selectedVideo.title}
              </h2>
              <p className="text-purple-200 mb-6 text-lg">
                {selectedVideo.description}
              </p>
              <div className="flex items-center gap-6 text-purple-300">
                <span className="flex items-center gap-2">
                  <Clock size={18} />
                  {selectedVideo.duration}
                </span>
                <span className="flex items-center gap-2">
                  <Eye size={18} />
                  {selectedVideo.views} vues
                </span>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}