'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ARTIST_CONFIG } from '@/config/artist';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Instagram, Download, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#FAFAFA] overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-outfit">Artist Biography</span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white font-outfit tracking-tight mt-2">
              The Story: Austin Mtomba
            </h1>
            <p className="text-zinc-400 text-sm md:text-base mt-4 max-w-2xl font-light">
              The musical journey of Austin Mtomba, fusing contemporary global trap and afro-rhythms with southern African soul.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            {/* Left Bio Text */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-zinc-300 font-light leading-relaxed text-base">
              <p>
                Austin Mtomba, known professionally as <strong className="text-white font-semibold">LilEthanThaOffixial</strong>, is an authentic Afrobeats, RnB, and Trap artist hailing from Zvishavane and Harare, Zimbabwe.
              </p>
              <p>
                Releasing under his flagship imprint <strong className="text-white font-semibold">ThaOffixialMusic</strong>, LilEthan has rapidly built an engaged audience across YouTube (@LilEthanThaOffixial), Spotify, Apple Music, and Audiomack with acclaimed drops including <strong className="text-amber-400 font-semibold">&apos;RUDO&apos;</strong> (produced by Loui27s / Law Keyz), <strong className="text-white font-semibold">&apos;Hold You&apos;</strong> (featuring Arcade X & Stunt Master), <strong className="text-white font-semibold">&apos;Emotional Feeling&apos;</strong>, and <strong className="text-white font-semibold">&apos;Wangu Moyo&apos;</strong> (featuring Yvng B).
              </p>
              <p>
                Fusing emotive African songwriting with crisp trap rhythms, LilEthan chronicles loyalty, love, ambition, and youth reality in southern Africa. For professional bookings, synchronization, and features, please contact artist management ({ARTIST_CONFIG.management}) via the <Link href="/contact" className="text-amber-400 underline font-semibold">Official Booking Desk</Link>.
              </p>

              {/* Instagram Feed Widget */}
              <div className="mt-6 p-6 bg-[#0F0F11] border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 flex items-center justify-center text-white shrink-0 shadow-lg">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-pink-400 block">Official Instagram Feed</span>
                    <h4 className="text-sm font-bold text-white">@lil_ethan_tha_official</h4>
                    <p className="text-xs text-zinc-400">Follow for pictures, studio updates & lifestyle drops.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={ARTIST_CONFIG.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-widest transition-colors"
                  >
                    Explore Live Feed ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl bg-zinc-900">
                <Image
                  src={ARTIST_CONFIG.images.hero}
                  alt={ARTIST_CONFIG.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Secondary Grid (EPK, Representation, Recognition) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* EPK Card */}
            <div className="bg-[#0F0F11] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Press Kit</span>
                <h3 className="text-lg font-bold text-white font-outfit mt-1">Electronic Press Kit</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Download official high-resolution artist press photos, logos, biography factsheets, and rider documents.
                </p>
              </div>
              <Link
                href="/contact"
                className="mt-6 px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-amber-400" /> View Electronic Press Kit (EPK)
              </Link>
            </div>

            {/* Representation Card */}
            <div className="bg-[#0F0F11] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Artist Representation</span>
                <h3 className="text-lg font-bold text-white font-outfit mt-1">{ARTIST_CONFIG.management} Management</h3>
                <div className="mt-4 space-y-2 text-xs text-zinc-300">
                  <p><strong className="text-white">Artist Management:</strong> {ARTIST_CONFIG.management}</p>
                  <p className="flex items-center gap-1.5 text-emerald-400"><ShieldCheck className="w-4 h-4" /> Secure Booking Portal Active</p>
                  <p><strong className="text-white">Music Imprint:</strong> {ARTIST_CONFIG.imprint}</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <Link href="/contact" className="text-xs font-bold text-amber-400 hover:underline">
                  Go to Official Booking Desk →
                </Link>
              </div>
            </div>

            {/* Industry Recognition */}
            <div className="bg-[#0F0F11] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Industry Recognition & Catalogs</span>
                <ul className="mt-4 space-y-3 text-xs">
                  <li className="flex items-start justify-between gap-2 pb-2 border-b border-white/5">
                    <div>
                      <strong className="text-white block">Top Spotify Release &ldquo;RUDO&rdquo;</strong>
                      <span className="text-zinc-400">ThaOffixial Music</span>
                    </div>
                    <span className="text-zinc-500 font-mono">2025/2026</span>
                  </li>
                  <li className="flex items-start justify-between gap-2 pb-2 border-b border-white/5">
                    <div>
                      <strong className="text-white block">&ldquo;Hold You&rdquo; (ft. Arcade X & Stunt Master)</strong>
                      <span className="text-zinc-400">YouTube Official & DSPs</span>
                    </div>
                    <span className="text-zinc-500 font-mono">2025</span>
                  </li>
                  <li className="flex items-start justify-between gap-2">
                    <div>
                      <strong className="text-white block">&ldquo;Emotional Feeling&rdquo; & &ldquo;Wangu Moyo&rdquo;</strong>
                      <span className="text-zinc-400">ThaOffixialMusic Catalog</span>
                    </div>
                    <span className="text-zinc-500 font-mono">2026</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
