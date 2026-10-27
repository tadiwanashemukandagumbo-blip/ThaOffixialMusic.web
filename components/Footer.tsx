'use client';

import React from 'react';
import Link from 'next/link';
import { ARTIST_CONFIG } from '@/config/artist';
import { useLanguage } from '@/lib/language-context';
import { Instagram, ArrowUp } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] border-t border-white/10 text-zinc-400 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Left info */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <h3 className="text-xl font-black uppercase tracking-tight text-white font-outfit">
              {ARTIST_CONFIG.name}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium">
              {ARTIST_CONFIG.realName} · {ARTIST_CONFIG.origin}
            </p>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed mt-1">
              {t.footer.bioShort}
            </p>
            <div className="pt-2">
              <a
                href={ARTIST_CONFIG.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-xs text-zinc-300 font-medium hover:border-pink-500/40 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-500" />
                @lil_ethan_tha_official
              </a>
            </div>
          </div>

          {/* Center Nav */}
          <div className="md:col-span-4 flex flex-col gap-2.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-2 font-outfit">{t.footer.navigation}</h4>
            <Link href="/#bio" className="text-xs hover:text-white transition-colors">{t.footer.navBio}</Link>
            <Link href="/#music" className="text-xs hover:text-white transition-colors">{t.footer.navMusic}</Link>
            <Link href="/#visuals" className="text-xs hover:text-white transition-colors">{t.footer.navVisuals}</Link>
            <Link href="/#tour" className="text-xs hover:text-white transition-colors">{t.footer.navTour}</Link>
            <Link href="/#social" className="text-xs hover:text-white transition-colors">{t.footer.navSocial}</Link>
            <Link href="/#store" className="text-xs hover:text-white transition-colors">{t.footer.navStore}</Link>
            <Link href="/#booking" className="text-xs hover:text-white transition-colors">{t.footer.navBooking}</Link>
          </div>

          {/* Right Management */}
          <div className="md:col-span-3 flex flex-col gap-2.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-2 font-outfit">{t.footer.managementAndContact}</h4>
            <p className="text-xs text-zinc-400">
              Management: <span className="text-white font-semibold">{ARTIST_CONFIG.management}</span>
            </p>
            <a
              href={`mailto:${ARTIST_CONFIG.managementEmail}`}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              {ARTIST_CONFIG.managementEmail}
            </a>
            <div className="flex flex-wrap items-center gap-3 pt-3 text-xs text-zinc-400">
              <a href={ARTIST_CONFIG.socials.spotify} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">Spotify</a>
              <span>·</span>
              <a href={ARTIST_CONFIG.socials.appleMusic} target="_blank" rel="noreferrer" className="hover:text-pink-400 transition-colors">Apple Music</a>
              <span>·</span>
              <a href={ARTIST_CONFIG.socials.youtube} target="_blank" rel="noreferrer" className="hover:text-red-400 transition-colors">YouTube</a>
              <span>·</span>
              <a href={ARTIST_CONFIG.socials.audiomack} target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">Audiomack</a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 {ARTIST_CONFIG.name} ({ARTIST_CONFIG.realName}). {t.footer.allRightsReserved}</p>
          <div className="flex items-center gap-6">
            <span>Management: {ARTIST_CONFIG.management}</span>
            <span>·</span>
            <span>Zvishavane & Harare, Zimbabwe</span>
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-zinc-900/90 border border-white/20 text-white hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all shadow-xl group cursor-pointer"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </footer>
  );
}
