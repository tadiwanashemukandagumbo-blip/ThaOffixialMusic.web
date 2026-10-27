'use client';

import React from 'react';
import Image from 'next/image';
import { Play, ExternalLink, Music as MusicIcon, Disc, ShieldCheck } from 'lucide-react';
import { TRACKS, ARTIST_CONFIG } from '@/config/artist';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MusicPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#FAFAFA] overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-outfit">Verified DSP Discography</span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white font-outfit tracking-tight mt-2">
              Music Catalogue & Live Spotify Player
            </h1>
            <p className="text-zinc-400 text-sm md:text-base mt-4 max-w-2xl font-light">
              Explore official releases with live playback and verified stream metrics across Spotify, Apple Music, Audiomack, and YouTube Music.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 bg-[#0F0F11] border border-white/10 rounded-3xl">
            <div>
              <span className="text-xs text-zinc-400 uppercase tracking-wider block">Spotify Monthly Listeners</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400 font-outfit">{ARTIST_CONFIG.stats.spotifyMonthly}</span>
            </div>
            <div>
              <span className="text-xs text-zinc-400 uppercase tracking-wider block">Apple Music</span>
              <span className="text-xl sm:text-2xl font-black text-pink-400 font-outfit">{ARTIST_CONFIG.stats.appleMusicStreams}</span>
            </div>
            <div>
              <span className="text-xs text-zinc-400 uppercase tracking-wider block">Audiomack Plays</span>
              <span className="text-xl sm:text-2xl font-black text-amber-400 font-outfit">{ARTIST_CONFIG.stats.audiomackStreams}</span>
            </div>
            <div>
              <span className="text-xs text-zinc-400 uppercase tracking-wider block">YouTube Views</span>
              <span className="text-xl sm:text-2xl font-black text-white font-outfit">{ARTIST_CONFIG.stats.youtubeStreams}</span>
            </div>
          </div>

          {/* Live Spotify Embed Player */}
          <div className="p-6 sm:p-8 bg-[#0F0F11] border border-white/10 rounded-3xl mb-16 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                    Live Verified Spotify Stream
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white font-outfit">
                  {ARTIST_CONFIG.name} on Spotify
                </h2>
                <p className="text-xs text-zinc-400">
                  Listen to top tracks, latest singles, and live listener counts directly from Spotify.
                </p>
              </div>
              <a
                href={ARTIST_CONFIG.spotifyArtistUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20 inline-flex items-center gap-2 self-start sm:self-auto shrink-0"
              >
                Open Official Spotify Profile <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden bg-black/80 border border-white/10">
              <iframe
                style={{ borderRadius: '12px' }}
                src={ARTIST_CONFIG.spotifyEmbedUrl}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="w-full border-0"
                title="LilEthanThaOffixial Official Spotify Player"
              />
            </div>
          </div>

          {/* Music Grid */}
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">Individual Releases</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit">Track Catalogue</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {TRACKS.map((track) => (
              <div
                key={track.id}
                className="bg-zinc-900/60 border border-white/10 rounded-3xl p-5 sm:p-8 flex flex-col sm:flex-row gap-6 hover:border-amber-500/50 transition-all duration-300 group"
              >
                {/* Cover Art */}
                <div className="relative aspect-square w-full sm:w-48 h-48 rounded-2xl overflow-hidden bg-zinc-800 shrink-0 mx-auto sm:mx-0">
                  <Image
                    src={track.coverImage}
                    alt={track.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a
                      href={track.links.spotify}
                      target="_blank"
                      rel="noreferrer"
                      className="w-12 h-12 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-lg font-bold"
                    >
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </a>
                  </div>
                </div>

                {/* Track Details */}
                <div className="flex flex-col justify-between flex-grow min-w-0">
                  <div>
                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 gap-2">
                      <span className="text-amber-400 font-semibold tracking-wider uppercase truncate">{track.genre}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 font-mono text-emerald-400 text-[11px] shrink-0">
                        {track.streams}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white font-outfit truncate">{track.title}</h2>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1 truncate">Feat. {track.featured} · {track.releaseDate}</p>
                  </div>

                  {/* Streaming Buttons */}
                  <div className="pt-6 mt-6 border-t border-white/10">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-3 block flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-400" /> Verified Distribution Channels
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      <a
                        href={track.links.spotify}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2.5 rounded-xl bg-black/40 hover:bg-zinc-800 border border-white/10 text-xs font-medium text-zinc-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MusicIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Spotify
                      </a>
                      <a
                        href={track.links.appleMusic}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2.5 rounded-xl bg-black/40 hover:bg-zinc-800 border border-white/10 text-xs font-medium text-zinc-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Disc className="w-3.5 h-3.5 text-pink-500 shrink-0" /> Apple Music
                      </a>
                      <a
                        href={track.links.audiomack}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2.5 rounded-xl bg-black/40 hover:bg-zinc-800 border border-white/10 text-xs font-medium text-zinc-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Audiomack
                      </a>
                      <a
                        href={track.links.youtubeMusic}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2.5 rounded-xl bg-black/40 hover:bg-zinc-800 border border-white/10 text-xs font-medium text-zinc-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 text-red-500 shrink-0" /> YT Music
                      </a>
                      <a
                        href={track.links.youtube}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2.5 rounded-xl bg-black/40 hover:bg-zinc-800 border border-white/10 text-xs font-medium text-zinc-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors col-span-2 sm:col-span-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-red-600 shrink-0" /> YouTube
                      </a>
                    </div>
                  </div>
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
