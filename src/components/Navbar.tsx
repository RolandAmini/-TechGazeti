'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-black text-white py-4 shadow-md">
      <nav className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          🎬 BillboardVirtuel
        </Link>

        <div className="space-x-4">
          <Link href="/" className="hover:text-gray-300">Accueil</Link>
          <Link href="/create" className="hover:text-gray-300">Créer une pub</Link>
        </div>
      </nav>
    </header>
  );
}
