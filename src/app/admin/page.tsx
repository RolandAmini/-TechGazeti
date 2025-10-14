"use client";

import { useState,useEffect } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import Activity from "@/models/Activity";
import Follower from '@/models/Follower';


import { Bell, Edit, Users, FileText, TrendingUp, Settings, Search, Plus, Eye, Heart, MessageCircle, MoreVertical, LayoutDashboard, Calendar, Home, BarChart3, Menu, X, LogOut, User } from 'lucide-react';


interface Follower {
  _id: string;
  name: string;
  avatar?: string;
  color: string;
  date: string;
}

interface Activity {
  _id: string;
  action: string;
  blog?: string;
  user?: string;
  time: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications] = useState(3);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [blogs, setBlogs] = useState<any[]>([]);
  const menuItems = [
  { value: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { value: "articles", label: "Articles", icon: FileText },
  { value: "followers", label: "Followers", icon: Users },
  { value: "settings", label: "Paramètres", icon: Settings },
];
  

  const router = useRouter(); // ✅ il faut ajouter ça

   // ✅ Charger les articles depuis MongoDB
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/articles");
        const data = await res.json();
        setBlogs(data); // ✅ on met les vrais articles ici
      } catch (error) {
        console.error("Erreur chargement articles:", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      localStorage.removeItem("token");
      router.push("/");
    } catch (error) {
      console.error("Erreur déconnexion:", error);
    }
  };

  


const [followers, setFollowers] = useState<Follower[]>([]);


  useEffect(() => {
    const fetchFollowers = async () => {
      const res = await fetch("/api/followers");
      const data = await res.json();
      setFollowers(data);
    };
    fetchFollowers();
  }, []);

   const [recentActivity, setRecentActivity] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivity = async () => {
      const res = await fetch("/api/activity");
      const data: Activity[] = await res.json();
      setRecentActivity(data);
    };
    fetchActivity();
  }, []);

  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/api/stats");
      const data = await res.json();

      setStats([
        { label: "Articles", value: data.articles, icon: FileText, color: "blue" },
        { label: "Followers", value: data.followers, icon: Users, color: "green" },
        { label: "Vues totales", value: data.views, icon: Eye, color: "purple" },
        { label: "Engagement", value: data.engagement, icon: TrendingUp, color: "orange" },
      ]);
    };
    fetchStats();
  }, []);

   
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-white border-r border-gray-200">
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                RA
              </div>
              <span className="font-bold text-xl text-gray-900">my Articles</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.value}
                onClick={() => setActiveTab(item.value)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.value
                    ? 'bg-green-50 text-green-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                RA
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-blod text-gray-900 truncate">Mr MUKWEGE </p>
                <p className="text-xs text-gray-500 truncate">aminiroland01@gmail.com</p>
              </div>
            </div>
            <button
      onClick={handleLogout}
      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <LogOut className="w-4 h-4" />
      <span>Logout</span>
    </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <aside className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white">
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  RA
                </div>
                <span className="font-bold text-xl text-gray-900">Mon Blog</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-2 text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {menuItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => {
                    setActiveTab(item.value);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.value
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
           
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
      >
        <Menu className="w-6 h-6" />
      </button>

      <h1
        onClick={() => router.push("/admin")}
        className="cursor-pointer text-xl sm:text-2xl font-bold text-gray-900 hover:text-blue-600 transition"
      >
        Dashboard
      </h1>
    </div>
              
              <div className="flex items-center gap-2 sm:gap-4">
              <button
  onClick={() => window.location.href = "/"}
  className="hidden sm:block p-2 hover:bg-gray-100 rounded-full transition-colors"
>
  <Home className="w-5 h-5 text-gray-600" />
</button>

                 <Link href="/admin/notifications">
                <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Bell className="w-5 h-5 text-gray-600" />
                  {notifications > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                      {notifications}
                    </span>
                  )}
                </button>
                </Link>
               <Link href="/admin/new">
                <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors text-sm font-medium">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">write</span>
                </button>
                 </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area - 3 Colonnes */}
        <main className="px-4 sm:px-6 lg:px-8 py-6">
          {activeTab === 'overview' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 text-${stat.color}-600 mb-3`} />
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className={`text-xs font-medium text-${stat.color}-600`}>{stat.change}</p>
                  </div>
                ))}
              </div>

              {/* 3 Colonnes Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Colonne Gauche - Articles récents (Colonne principale) */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 sm:p-8 rounded-2xl text-white">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Prêt à partager vos idées ?</h2>
                    <p className="text-green-50 mb-6 text-sm sm:text-base">Commencez à écrire un nouvel article maintenant.</p>
                    <Link href="/admin/new">
      <button className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-green-600 rounded-full font-medium hover:shadow-lg transition-all text-sm sm:text-base">
        <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>Créer un article</span>
      </button>
    </Link>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900">Articles récents</h3>
                      <Link href="admin/articles">
                      <button className="text-sm text-green-600 hover:text-green-700 font-medium">See All</button>
                      </Link>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {blogs.slice(0, 3).map((blog) => (
                        <div key={blog.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                          <div className="flex gap-3 sm:gap-4">
                            <img src={blog.image} alt={blog.title} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base">{blog.title}</h4>
                              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  blog.status === 'Publié' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {blog.status}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span className="hidden sm:inline">{blog.date}</span>
                                </span>
                              </div>
                              <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                  {blog.views}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                                  {blog.likes}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                  {blog.comments}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Colonne Centre - Activité récente */}
                <div className="lg:col-span-3 space-y-6">
                  <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900">Activité récente</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {recentActivity.map((activity, idx) => (
                        <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                          <p className="text-sm font-medium text-gray-900 mb-1">{activity.action}</p>
                          <p className="text-sm text-gray-600 mb-1 truncate">{activity.blog}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Colonne Droite - Followers */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                      <h3 className="text-base font-bold text-gray-900">Nouveaux followers</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {followers.map((follower, idx) => (
                        <div key={idx} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className={`w-10 h-10 bg-gradient-to-br ${follower.color} rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
                              {follower.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 text-sm truncate">{follower.name}</p>
                              <p className="text-xs text-gray-500">{follower.date}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 sm:p-4 border-t border-gray-200">
                      <button className="w-full text-center text-sm font-medium text-green-600 hover:text-green-700">
                        Voir tous
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'blogs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Mes articles</h2>
                <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors text-sm">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Nouvel article</span>
                </button>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <div key={blog.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <img src={blog.image} alt={blog.title} className="w-full sm:w-32 h-32 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{blog.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            blog.status === 'Publié' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {blog.status}
                          </span>
                          <span className="text-xs sm:text-sm">{blog.date}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-600 mb-4">
                          <span className="flex items-center gap-2">
                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm">{blog.views}</span>
                          </span>
                          <span className="flex items-center gap-2">
                            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm">{blog.likes}</span>
                          </span>
                          <span className="flex items-center gap-2">
                            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm">{blog.comments}</span>
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                          <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-green-600 border border-green-600 rounded-full hover:bg-green-50 transition-colors">
                            Modifier
                          </button>
                          <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                            Statistiques
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Statistiques détaillées</h2>
              <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
                <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16 text-green-600 mx-auto mb-4" />
                <p className="text-gray-600 text-sm sm:text-base">Les statistiques détaillées seront disponibles bientôt...</p>
              </div>
            </div>
          )}

          {activeTab === 'followers' && (
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Mes Followers</h2>
              <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
                {followers.map((follower, idx) => (
                  <div key={idx} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${follower.color} rounded-full flex items-center justify-center text-white font-semibold text-base sm:text-lg`}>
                        {follower.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">{follower.name}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{follower.date}</p>
                      </div>
                      <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                        Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Paramètres</h2>
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200 text-center">
                <Settings className="w-12 h-12 sm:w-16 sm:h-16 text-green-600 mx-auto mb-4" />
                <p className="text-gray-600 text-sm sm:text-base">Les paramètres seront disponibles bientôt...</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}