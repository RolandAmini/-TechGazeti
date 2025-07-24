'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function CreateAdPage() {
  const router = useRouter();
  const [advertiserName, setAdvertiserName] = useState('');
  const [duration, setDuration] = useState(30);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUploadAndCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return alert('Sélectionne un fichier');

    try {
      setLoading(true);

      // Étape 1 : Upload vers Cloudinary
      const formData = new FormData();
      formData.append('file', file);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadData.success) throw new Error('Échec de l’upload');

      const imageUrl = uploadData.result.secure_url;

      // Étape 2 : Créer la publicité avec l’URL Cloudinary
      const createRes = await fetch('/api/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ advertiserName, imageUrl, duration }),
      });

      const createData = await createRes.json();
      if (createData.success) {
        alert('✅ Pub créée avec succès');
        router.push('/');
      } else {
        throw new Error('Échec de création');
      }
    } catch (err: any) {
  alert('❌ Erreur : ' + err.message);
}
 finally {
      setLoading(false);
    }
  };

  return (
     <>
          <Navbar />
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Créer une publicité 📢</h1>

        <form onSubmit={handleUploadAndCreate} className="space-y-4">
          <input
            type="text"
            placeholder="Nom de l'annonceur"
            className="w-full p-3 border border-gray-300 rounded-xl"
            value={advertiserName}
            onChange={(e) => setAdvertiserName(e.target.value)}
            required
          />

          <input
            type="file"
            accept="image/*,video/*"
            className="w-full p-3 border border-gray-300 rounded-xl"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
          />

          <input
            type="number"
            placeholder="Durée (secondes)"
            className="w-full p-3 border border-gray-300 rounded-xl"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
          >
           <Upload size={20} className="mr-2" />
            {loading ? 'Envoi en cours...' : 'Publier ma pub'}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center">
          * Le fichier sera hébergé automatiquement sur Cloudinary.
        </p>
      </div>
    </main>
      </>
  );
}
