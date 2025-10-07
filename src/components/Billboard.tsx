// src/components/Billboard.tsx
"use client";

import { useEffect, useState } from "react";

export default function Billboard() {
  const [videos, setVideos] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Exemple statique, plus tard -> API /api/videos
    setVideos([
      "#",
      "#",
    ]);
  }, []);

  useEffect(() => {
    if (videos.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
    }, 15000); // change pub toutes les 15s
    return () => clearInterval(timer);
  }, [videos]);

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      {videos.length > 0 ? (
        <video
          key={videos[current]}
          src={videos[current]}
          className="w-full h-64 object-cover"
          autoPlay
          muted
          loop
        />
      ) : (
        <div className="h-64 flex items-center justify-center bg-gray-200 text-gray-600">
          no demo
        </div>
      )}
    </div>
  );
}
