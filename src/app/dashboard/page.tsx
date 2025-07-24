'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

interface Ad {
  _id: string;
  advertiserName: string;
  imageUrl: string;
  duration: number;
  isActive: boolean;
}

export default function DashboardPage() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch('/api/ads');
        const data = await res.json();
        if (data.success) setAds(data.ads);
        else throw new Error('Erreur API');
      } catch (err) {
        setError('Erreur lors du chargement des publicités.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette publicité ?')) return;
    try {
      await fetch(`/api/ads/${id}`, { method: 'DELETE' });
      setAds((prev) => prev.filter((ad) => ad._id !== id));
    } catch (err) {
      alert("Échec de la suppression.");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          📊 Tableau de bord des publicités
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Chargement des publicités...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : ads.length === 0 ? (
          <p className="text-center text-gray-500">Aucune publicité disponible.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {ads.map((ad) => (
              <div key={ad._id} className="bg-white shadow-md rounded-xl overflow-hidden">
                {ad.imageUrl.endsWith('.mp4') ? (
                  <video
                    src={ad.imageUrl}
                    controls
                    className="w-full h-[200px] object-cover"
                  />
                ) : (
                  <Image
  src={
    ad.imageUrl.includes('example.com') || !ad.imageUrl.startsWith('http')
      ? '/images/cacao.png' // 
      : ad.imageUrl
  }
  alt={ad.advertiserName}
  width={500}
  height={200}
  className="w-full h-[200px] object-cover"
/>

                )}

                <div className="p-4 space-y-2">
                  <h2 className="text-lg font-semibold">{ad.advertiserName}</h2>
                  <p>⏱ Durée : {ad.duration}s</p>
                  <p className={`font-bold ${ad.isActive ? 'text-green-600' : 'text-red-600'}`}>
                    {ad.isActive ? 'Active ✅' : 'Inactive ❌'}
                  </p>

                  <div className="flex justify-between gap-2 pt-2">
                    <button
                      onClick={() => handleDelete(ad._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-xl text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
