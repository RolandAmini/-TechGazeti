// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-black">
             TechGazeti
        </Link>
 <nav className="space-x-6 hidden md:flex">
  <Link href="https://www.instagram.com/aminiroland/" aria-label="Instagram">
    <FontAwesomeIcon icon={faInstagram} className="h-6 w-6 text-gray-800 hover:text-pink-300" />
  </Link>
  <Link href="https://www.facebook.com/votre_profil/" aria-label="Facebook">
    <FontAwesomeIcon icon={faFacebook} className="h-6 w-6 text-gray-800 hover:text-pink-300" />
  </Link>
  <Link href="https://portfolio2025-bpg3.vercel.app/" aria-label="Portfolio">
    <FontAwesomeIcon icon={faGlobe} className="h-6 w-6 text-gray-800 hover:text-pink-300" />
  </Link>
  <Link href="https://twitter.com/votre_profil/" aria-label="X (Twitter)">
    <FontAwesomeIcon icon={faXTwitter} className="h-6 w-6 text-gray-800 hover:text-pink-300" />
  </Link>
</nav>
      </div>
    </header>
  );
}
