'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Youtube, ExternalLink, ShieldCheck } from 'lucide-react';
import { VIDEOS, ARTIST_CONFIG } from '@/config/artist';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VideoModal from '@/components/VideoModal';

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<{ id: string; title: string } | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#FAFAFA] overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
                <Youtube className="w-4 h-4 text-red-500" />
                Official YouTube Channel ID: UCis0NzN0qBmTuFoXojUb8VQ
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white font-outfit tracking-tight">
                Official YouTube Visuals
              </h1>
              <p className="text-zinc-400 text-sm md:text-base mt-4 max-w-2xl font-light">
                Watch official music videos, live sessions, and audio visualizers pulled directly from LilEthan&apos;s official YouTube page.
              </p>
            </div>
            <a
              href={ARTIST_CONFIG.youtubeChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-red-600/30 inline-flex items-center gap-2 shrink-0"
            >
              <Youtube className="w-4 h-4 fill-current" /> Visit Official YouTube Channel ↗
            </a>
          </div>

          {/* Channel Banner Card */}
          <div className="bg-[#0F0F11] border border-white/10 rounded-3xl p-6 sm:p-8 mb-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center shrink-0 border border-red-500/30 text-2xl font-bold font-outfit">
                LE
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">LilEthanThaOffixial Official Channel</h3>
                  <ShieldCheck className="w-4 h-4 text-sky-400 fill-sky-400/20" />
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Channel ID: <span className="font-mono text-amber-400">{ARTIST_CONFIG.youtubeChannelId}</span> · {ARTIST_CONFIG.stats.youtubeStreams} Channel Views
                </p>
                <p className="text-[11px] text-red-400 mt-1 font-medium">
                  ✓ Sourced exclusively from LilEthan&apos;s verified YouTube page (NOT from any third-party channel).
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={ARTIST_CONFIG.socials.audiomack}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-400 font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-1.5"
              >
                Audiomack Profile <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={ARTIST_CONFIG.youtubeChannelUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
              >
                Subscribe on YouTube <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {VIDEOS.map((video) => (
              <div
                key={video.id}
                className="group bg-zinc-900/60 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 flex flex-col"
              >
                <div
                  onClick={() => setSelectedVideo({ id: video.youtubeId, title: video.title })}
                  className="relative aspect-video w-full bg-zinc-900 overflow-hidden cursor-pointer"
                >
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-amber-400">
                    {video.views}
                  </div>
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 text-[11px] font-mono text-white">
                    {video.duration}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">{video.category}</span>
                    <h2 className="text-lg font-bold text-white font-outfit mt-1">{video.title}</h2>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{video.description}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-zinc-500 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedVideo({ id: video.youtubeId, title: video.title })}
                      className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer inline-flex items-center gap-1"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> Watch Video Modal
                    </button>
                    <a
                      href={
                        video.youtubeId === 'ch4cMLQQRj4'
                          ? 'https://youtu.be/ch4cMLQQRj4?si=-Iq9hFmedJJnRTfz'
                          : 'https://youtu.be/He7qh9v6peU?si=XFcwCRofn1fatCi-'
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="text-red-400 hover:text-red-300 font-medium inline-flex items-center gap-1"
                    >
                      <Youtube className="w-3.5 h-3.5" /> Open on YouTube ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {selectedVideo && (
        <VideoModal
          youtubeId={selectedVideo.id}
          title={selectedVideo.title}
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}
