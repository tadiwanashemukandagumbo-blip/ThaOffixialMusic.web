import React from 'react';
import Link from 'next/link';
import { ARTIST_CONFIG } from '@/config/artist';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Home, Music } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#FAFAFA]">
      <Navbar />

      <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <span className="text-8xl md:text-9xl font-black text-red-600 font-outfit tracking-tighter opacity-80 block mb-4">
            404
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white font-outfit tracking-tight mb-4">
            Track Not Found
          </h1>
          <p className="text-zinc-400 text-sm md:text-base mb-8 font-light">
            The page or audio stream you are looking for does not exist or has been moved. Explore the official {ARTIST_CONFIG.name} catalogue below.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-600/30 flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Return Home
            </Link>
            <Link
              href="/music"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              <Music className="w-4 h-4" />
              Music Catalogue
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
