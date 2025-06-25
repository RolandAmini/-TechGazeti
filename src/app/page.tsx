'use client';



import Image from 'next/image';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';


interface Ad {
  _id: string;
  advertiserName: string;
  imageUrl: string;
  duration: number;
  isActive: boolean;
}

export default function HomePage() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch('/api/ads');
        const data = await res.json();
        if (data.success) {
          setAds(data.ads);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des pubs', error);
      }
    };

    fetchAds();
  }, []);

  useEffect(() => {
    if (ads.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, (ads[currentIndex]?.duration || 5) * 1000);

    return () => clearInterval(interval);
  }, [ads, currentIndex]);

  const currentAd = ads[currentIndex];

  return (
    <>
  <Navbar />
  


    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-4xl font-bold mb-8">🎬 Billboard Virtuel</h1>

      {currentAd ? (
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
          {currentAd.imageUrl.endsWith('.mp4') ? (
            <video
              src={currentAd.imageUrl}
              controls
              autoPlay
              muted
              className="w-full h-[400px] object-cover"
            />
          ) : (
            <Image
              src={currentAd.imageUrl}
              alt={currentAd.advertiserName}
              width={1200}
              height={400}
              className="w-full h-[400px] object-cover"
            />
          )}
          <div className="p-4 text-center bg-gray-900 text-white text-lg">
            Pub de <span className="font-semibold">{currentAd.advertiserName}</span>
          </div>
        </div>
      ) : (
        <p className="text-gray-400">Aucune publicité active pour le moment...</p>
      )}
      <main>
    </>


  );
}