'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Bell, MapPin, CheckCircle2 } from 'lucide-react';
import { ARTIST_CONFIG } from '@/config/artist';

export default function TourPage() {
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && city) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#FAFAFA] overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-outfit">Live Concert Routing</span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white font-outfit tracking-tight mt-2">
              Tour Dates & Appearances
            </h1>
            <p className="text-zinc-400 text-sm md:text-base mt-4 max-w-2xl font-light">
              Live concert dates and festival appearances for {ARTIST_CONFIG.name} ({ARTIST_CONFIG.realName}).
            </p>
          </div>

          {/* Coming Soon Card */}
          <div className="bg-[#0F0F11] border border-white/10 rounded-3xl p-8 sm:p-16 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Calendar className="w-4 h-4" />
              Routing In Progress
            </div>

            <h2 className="text-4xl sm:text-6xl font-black text-white font-outfit uppercase tracking-tight mb-4">
              Coming Soon
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed">
              Tour routing and headline show dates are currently in preparation. Be the first to know when tickets and VIP packages drop in your city.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold max-w-md mx-auto flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>You&apos;re on the presale list for {city}! We&apos;ll notify {email}.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="flex-grow px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-500"
                />
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Your City / Town"
                  className="flex-grow px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-widest transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 shrink-0"
                >
                  <Bell className="w-4 h-4" />
                  Get Notified First
                </button>
              </form>
            )}

            <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Harare</span>
              <span>·</span>
              <span>Bulawayo</span>
              <span>·</span>
              <span>Zvishavane</span>
              <span>·</span>
              <span>Johannesburg</span>
              <span>·</span>
              <span>London</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
