'use client';

import React from 'react';
import Image from 'next/image';
import { Instagram, Youtube, ExternalLink, ShieldCheck, Music } from 'lucide-react';
import { ARTIST_CONFIG, GALLERY_ITEMS } from '@/config/artist';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SocialPage() {
  const highlights = [
    { title: 'RUDO', image: ARTIST_CONFIG.images.rudoCover },
    { title: 'Studio', image: ARTIST_CONFIG.images.aboutStudio },
    { title: 'Visuals', image: ARTIST_CONFIG.images.rudoVisualiser },
    { title: 'Roots zw', image: ARTIST_CONFIG.images.hero },
    { title: 'ThaOffixial', image: ARTIST_CONFIG.images.spotifyPoster },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#FAFAFA] overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-pink-500 font-outfit">
                Official Social Hub • @lil_ethan_tha_official
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white font-outfit tracking-tight mt-2">
                Instagram & Official Media
              </h1>
              <p className="text-zinc-400 text-sm md:text-base mt-4 max-w-2xl font-light">
                Verified releases, press highlights, and direct portals to LilEthan&apos;s authentic official Instagram (@lil_ethan_tha_official) and YouTube channels.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={ARTIST_CONFIG.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-pink-600/30 inline-flex items-center gap-2"
              >
                <Instagram className="w-4 h-4" /> Open Instagram Profile ↗
              </a>
              <a
                href={ARTIST_CONFIG.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white font-bold text-xs uppercase tracking-widest transition-all inline-flex items-center gap-2"
              >
                <Youtube className="w-4 h-4 text-red-500" /> YouTube Official ↗
              </a>
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-[#0F0F11] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl mb-16">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
              <div className="flex items-center gap-6">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-pink-500 shadow-xl shrink-0">
                  <Image
                    src={ARTIST_CONFIG.images.hero}
                    alt={ARTIST_CONFIG.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white font-outfit">
                      {ARTIST_CONFIG.name} ({ARTIST_CONFIG.realName})
                    </h2>
                    <span className="text-xs text-pink-400 font-mono">@lil_ethan_tha_official</span>
                    <ShieldCheck className="w-5 h-5 text-sky-400 fill-sky-400/20" />
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                    🎤 Singer · Songwriter · Recording Artist | 🇿🇼 Zvishavane & Harare, Zimbabwe | 🚀 Founder of ThaOffixialMusic
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a href={ARTIST_CONFIG.socials.instagram} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white inline-flex items-center gap-1.5">
                  <Instagram className="w-3.5 h-3.5 text-pink-500" /> Instagram ↗
                </a>
                <a href={ARTIST_CONFIG.socials.youtube} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white inline-flex items-center gap-1.5">
                  <Youtube className="w-3.5 h-3.5 text-red-500" /> YouTube ↗
                </a>
                <a href={ARTIST_CONFIG.socials.spotify} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white inline-flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-emerald-500" /> Spotify ↗
                </a>
                <a href={ARTIST_CONFIG.socials.audiomack} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white inline-flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-amber-500" /> Audiomack ↗
                </a>
              </div>
            </div>

            {/* Story Highlights */}
            <div className="pt-8">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 block mb-6">
                Verified Story Highlights
              </span>
              <div className="flex items-center gap-6 overflow-x-auto pb-4">
                {highlights.map((h, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 group-hover:scale-105 transition-transform">
                      <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                        <Image src={h.image} alt={h.title} fill className="object-cover" referrerPolicy="no-referrer" />
                      </div>
                    </div>
                    <span className="text-xs text-zinc-300 font-medium">{h.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GALLERY_ITEMS.map((item) => (
              <div key={item.id} className="bg-zinc-900/60 border border-white/10 rounded-2xl overflow-hidden hover:border-pink-500/50 transition-all flex flex-col">
                <div className="relative aspect-[4/3] w-full bg-zinc-900">
                  <Image src={item.image} alt={item.title} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                    <span className="text-pink-400 font-semibold">@lil_ethan_tha_official</span>
                    <span>Verified Post</span>
                  </div>
                  <h3 className="text-base font-bold text-white font-outfit">{item.title}</h3>
                  <p className="text-xs text-zinc-400 mt-2">
                    Official release and media highlight capturing the authentic southern African Afrobeats and Trap sound.
                  </p>
                  <a
                    href={ARTIST_CONFIG.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 hover:text-pink-300"
                  >
                    View on Instagram <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
