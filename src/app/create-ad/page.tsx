'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud } from 'lucide-react';


export default function CreateAdPage() {
  const router = useRouter();
  const [advertiserName, setAdvertiserName] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [duration, setDuration] = useState(30);
  const [fileType, setFileType] = useState<'image' | 'video'>('image');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/ads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ advertiserName, imageUrl: mediaUrl, duration }),
    });

    const data = await res.json();
    if (data.success) {
      alert('✅ Publicité créée avec succès !');
      router.push('/');
    } else {
      alert('❌ Erreur lors de la création.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Créer une publicité digitale 🎥</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nom de l'annonceur"
            className="w-full p-3 border border-gray-300 rounded-xl"
            value={advertiserName}
            onChange={(e) => setAdvertiserName(e.target.value)}
            required
          />

          <select
            className="w-full p-3 border border-gray-300 rounded-xl"
            value={fileType}
            onChange={(e) => setFileType(e.target.value as 'image' | 'video')}
          >
            <option value="image">Image</option>
            <option value="video">Vidéo</option>
          </select>

          <input
            type="text"
            placeholder={`URL de la ${fileType}`}
            className="w-full p-3 border border-gray-300 rounded-xl"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Durée en secondes"
            className="w-full p-3 border border-gray-300 rounded-xl"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <UploadCloud size={20} /> Publier ma publicité
          </button>
        </form>

        <div className="text-sm text-gray-500 text-center">
          * Pour l'instant, les vidéos/images doivent être déjà hébergées (ex: Cloudinary, YouTube direct link, etc.)
        </div>
      </div>
    </main>
  );
}
