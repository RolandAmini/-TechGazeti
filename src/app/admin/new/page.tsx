"use client";
import { useState } from "react";
import { Plus, MoreHorizontal, Bell, X, Image } from "lucide-react";

export default function NewArticlePage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("draft");
  const [showMetadata, setShowMetadata] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);

  const handleUpload = async (e) => {
    if (!e.target.files?.[0]) return;

    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) {
      setImage(data.url);
    }
    setShowPlusMenu(false);
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, excerpt, content, image, status }),
    });
    if (res.ok) {
      alert("Article créé avec succès !");
    } else {
      alert("Erreur lors de la création");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 py-3 px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-3xl font-serif">Medium</h1>
          <span className="text-sm text-gray-600">Draft in Roland Amini</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-full transition"
          >
            Publish
          </button>
          <div className="relative">
            <button 
              onClick={() => setShowMetadata(!showMetadata)}
              className="text-gray-600 hover:text-gray-900"
            >
              <MoreHorizontal size={24} />
            </button>
            
            {/* Metadata Dropdown */}
            {showMetadata && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Métadonnées</h3>
                    <button onClick={() => setShowMetadata(false)} className="text-gray-500 hover:text-gray-700">
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                      <input
                        type="text"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        placeholder="Ex: Technologie..."
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Résumé</label>
                      <textarea
                        value={excerpt}
                        onChange={e => setExcerpt(e.target.value)}
                        placeholder="Un bref résumé..."
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                      <select
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="draft">Brouillon</option>
                        <option value="published">Publié</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <button className="text-gray-600 hover:text-gray-900">
            <Bell size={24} />
          </button>
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400"></div>
          </div>
        </div>
      </header>

      {/* Editor Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Title Input */}
        <div className="mb-8">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full text-5xl font-serif text-gray-800 placeholder-gray-300 border-none outline-none focus:ring-0 bg-transparent"
            style={{ fontFamily: 'Georgia, serif' }}
          />
        </div>

        {/* Image Preview */}
        {image && (
          <div className="mb-6 relative">
            <img src={image} alt="Cover" className="w-full h-96 object-cover rounded-lg" />
            <button 
              onClick={() => setImage("")}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Add Button & Content */}
        <div className="flex items-start gap-4 mb-8">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPlusMenu(!showPlusMenu)}
              className="mt-2 w-10 h-10 flex-shrink-0 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition"
            >
              <Plus size={20} className="text-gray-400" />
            </button>
            
            {/* Plus Menu */}
            {showPlusMenu && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <label className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition">
                  <Image size={20} className="text-gray-600" />
                  <span className="text-sm text-gray-700">Ajouter une image</span>
                  <input
                    type="file"
                    onChange={handleUpload}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            )}
          </div>
          
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Tell your story..."
            className="flex-1 text-xl text-gray-600 placeholder-gray-400 border-none outline-none focus:ring-0 resize-none bg-transparent min-h-[200px]"
            style={{ fontFamily: 'Georgia, serif' }}
          />
        </div>
      </div>
    </div>
  );
}