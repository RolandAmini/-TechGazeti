'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import useHasMounted from '@/hooks/useHasMounted';

interface Ad {
  _id: string;
  advertiserName: string;
  imageUrl: string;
  duration: number;
  isActive: boolean;
  audioUrl?: string;
}

export default function HomePage() {
  const hasMounted = useHasMounted();
  const [ads, setAds] = useState<Ad[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch('/api/ads');
        const data = await res.json();
        if (data.success) {
          const activeAds = data.ads.filter((ad: Ad) => ad.isActive);
          setAds(activeAds);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des pubs', error);
      }
    };

    fetchAds();
  }, []);

  useEffect(() => {
    if (ads.length === 0) return;

    const currentAd = ads[currentIndex];
    const duration = (currentAd?.duration || 5) * 1000;

    // Audio
    if (audioRef.current) {
      audioRef.current.pause();
      if (currentAd.audioUrl) {
        audioRef.current.src = currentAd.audioUrl;
        audioRef.current.play().catch(() => {});
      }
    }

    // Barre de progression
    setProgress(0);
    const start = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / duration) * 100, 100));
    }, 100);

    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [ads, currentIndex]);

  const currentAd = ads[currentIndex];

  // 🔒 Sécurité hydration : on attend d’être côté client
  if (!hasMounted) return null;

  return (
    <>
      <Navbar />
      <main className="w-screen h-screen bg-white text-black overflow-hidden relative">
        {currentAd ? (
          <div className="w-full h-full flex flex-col items-center justify-center relative">
            <div className="mt-6 text-xl font-bold tracking-wider text-center">
              {currentAd.advertiserName}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentAd._id}
                initial={{ opacity: 0, scale: 0.85, rotateY: 30 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.85, rotateY: -30 }}
                transition={{ duration: 0.5 }}
                className="relative w-[100vw] max-w-4xl h-[80vh] rounded-3xl overflow-hidden shadow-2xl bg-black"
              >
                {currentAd.imageUrl.endsWith('.mp4') ? (
                  <video
                    src={currentAd.imageUrl}
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                  />
                ) :  (
  <Image
  src={
    currentAd.imageUrl.includes('example.com') || !currentAd.imageUrl.startsWith('http')
      ? '/images/cacao.png' // ✅ Bon chemin
      : currentAd.imageUrl
  }
  alt={currentAd.advertiserName}
  width={1280}
  height={720}
  className="w-full h-full object-cover"
/>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="absolute top-4 left-4 text-sm text-white bg-black bg-opacity-60 px-3 py-1 rounded-full">
              Pub {currentIndex + 1} sur {ads.length}
            </div>

            <div
              className="absolute bottom-0 left-0 h-2 bg-pink-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />

            <audio ref={audioRef} />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-400 text-xl">welcome to our site...</p>
          </div>
        )}
      </main>
    </>
  );
}
