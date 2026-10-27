'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ARTIST_CONFIG } from '@/config/artist';
import { useLanguage } from '@/lib/language-context';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface BioMegaMenuProps {
  onClose?: () => void;
}

export default function BioMegaMenu({ onClose }: BioMegaMenuProps) {
  const { t } = useLanguage();

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="fixed inset-x-0 top-[70px] sm:top-[76px] bottom-0 z-50 bg-[#050505]/98 backdrop-blur-2xl border-t border-white/10 overflow-y-auto pointer-events-auto"
    >
      {/* Background Watermark Text as seen in screenshot */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-8xl sm:text-[14rem] font-black font-outfit uppercase tracking-tighter text-white/[0.03]">
          OFFIXIAL
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto py-10 sm:py-16 px-6 sm:px-8 min-h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Column 1: THE ARTIST */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">
              THE ARTIST
            </span>

            <Link
              href="/#bio"
              onClick={handleLinkClick}
              className="group relative w-full aspect-[3/4] max-w-sm rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl bg-zinc-900 block"
            >
              <Image
                src={ARTIST_CONFIG.images.hero}
                alt={ARTIST_CONFIG.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 text-left">
                <span className="text-xs font-bold text-amber-400 uppercase font-mono block mb-0.5">
                  AUSTIN MTOMBA
                </span>
                <h3 className="text-2xl font-black text-white font-outfit uppercase">
                  {ARTIST_CONFIG.name}
                </h3>
                <p className="text-xs text-zinc-300 font-medium mt-0.5">
                  {ARTIST_CONFIG.origin}
                </p>
              </div>
            </Link>
          </div>

          {/* Column 2: STORY */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">
              STORY
            </span>

            <div className="flex flex-col gap-6">
              {/* Item 1 */}
              <Link
                href="/#bio"
                onClick={handleLinkClick}
                className="group p-3 -mx-3 rounded-2xl hover:bg-white/5 transition-colors block"
              >
                <h4 className="text-lg font-black text-white font-outfit group-hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>About LilEthanThaOffixial</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-amber-400" />
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed font-light">
                  Learn about the artist behind the music, his journey from Zvishavane, and the founding of ThaOffixialMusic.
                </p>
              </Link>

              {/* Item 2 */}
              <Link
                href="/#music"
                onClick={handleLinkClick}
                className="group p-3 -mx-3 rounded-2xl hover:bg-white/5 transition-colors block"
              >
                <h4 className="text-lg font-black text-white font-outfit group-hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Musical Journey</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-amber-400" />
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed font-light">
                  From breakout hits &ldquo;RUDO&rdquo; and &ldquo;Wangu Moyo&rdquo; to crafting the new African wave of Afrobeats, RnB, and Trap.
                </p>
              </Link>

              {/* Item 3 */}
              <Link
                href="/#booking"
                onClick={handleLinkClick}
                className="group p-3 -mx-3 rounded-2xl hover:bg-white/5 transition-colors block"
              >
                <h4 className="text-lg font-black text-white font-outfit group-hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Representation &amp; Press</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-amber-400" />
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed font-light">
                  Managed by Mr Arts. Official booking routes and media press kit access.
                </p>
              </Link>
            </div>
          </div>

          {/* Column 3: RECOGNITION */}
          <div className="lg:col-span-3 flex flex-col gap-6 border-l border-white/10 lg:pl-8">
            <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">
              RECOGNITION
            </span>

            <div>
              <h4 className="text-xl font-black text-white font-outfit">
                Official Releases &amp; Charts
              </h4>
              <p className="text-xs text-zinc-400 mt-1 font-light">
                ThaOffixialMusic &amp; DSP milestones
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-6">
              <div>
                <span className="text-4xl sm:text-5xl font-black text-white font-outfit tracking-tight block">
                  5,000+
                </span>
                <span className="text-xs font-mono font-bold tracking-wider text-zinc-400 uppercase block mt-1">
                  YOUTUBE &amp; DSP STREAMS
                </span>
              </div>

              <div>
                <span className="text-4xl sm:text-5xl font-black text-white font-outfit tracking-tight block">
                  1,500+
                </span>
                <span className="text-xs font-mono font-bold tracking-wider text-zinc-400 uppercase block mt-1">
                  COMMUNITY &amp; FOLLOWERS
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                href="/#bio"
                onClick={handleLinkClick}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1.5 hover:underline"
              >
                <span>Read Full Biography Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
