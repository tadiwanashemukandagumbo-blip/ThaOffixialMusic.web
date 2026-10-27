'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Sparkles, MessageSquare, Heart, Send, CheckCircle2 } from 'lucide-react';
import { ARTIST_CONFIG, INITIAL_SHOUTOUTS, Shoutout } from '@/config/artist';

export default function CommunityPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [shoutouts, setShoutouts] = useState<Shoutout[]>(INITIAL_SHOUTOUTS);
  
  const [myName, setMyName] = useState('');
  const [myLocation, setMyLocation] = useState('');
  const [mySong, setMySong] = useState('RUDO');
  const [myMessage, setMyMessage] = useState('');
  const [postedSuccess, setPostedSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  const handlePostShoutout = (e: React.FormEvent) => {
    e.preventDefault();
    if (myName && myMessage) {
      const newShoutout: Shoutout = {
        id: `s-${Date.now()}`,
        name: myName,
        location: myLocation || 'Zvishavane, Zimbabwe',
        song: mySong,
        message: myMessage,
        timeAgo: 'Just now',
        likes: 1
      };
      setShoutouts([newShoutout, ...shoutouts]);
      setMyName('');
      setMyLocation('');
      setMyMessage('');
      setPostedSuccess(true);
      setTimeout(() => setPostedSuccess(false), 3000);
    }
  };

  const handleLike = (id: string) => {
    setShoutouts(shoutouts.map(s => s.id === id ? { ...s, likes: s.likes + 1 } : s));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#FAFAFA] overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-outfit">
                Community Hub • The Inner Circle
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white font-outfit tracking-tight mt-2">
                Join The Offixial Wave
              </h1>
              <p className="text-zinc-400 text-sm md:text-base mt-4 max-w-2xl font-light">
                Get secret drop links 48 hours early, unreleased studio demos, and tour presale codes.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-white/10 text-xs text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>VIP Community · Zvishavane, Harare & Diaspora</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Inner Circle Signup Card */}
            <div className="lg:col-span-5 bg-[#0F0F11] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest block mb-1">
                  Free VIP Fan Tier
                </span>
                <h3 className="text-2xl font-extrabold text-white font-outfit mb-3">
                  Never Miss A Drop
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                  Members receive direct SMS/email notifications for pop-up warehouse shows in Harare & Bulawayo, limited vinyl colorways, and private Discord listening parties with Austin Mtomba.
                </p>

                {subscribed ? (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Welcome to the Inner Circle! Drop alerts sent to {email}.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Your Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded accent-amber-500" />
                      <span>Include tour presale notifications for Southern Africa</span>
                    </label>
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-widest transition-all shadow-xl shadow-amber-500/20"
                    >
                      Join The Inner Circle
                    </button>
                  </form>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 space-y-3 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span>
                  <span>48-Hour Head Start on Merch & Tickets</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span>
                  <span>High-Fidelity WAV Downloads of New Singles</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span>
                  <span>Direct Fan Meetup Invitations</span>
                </div>
              </div>
            </div>

            {/* Right Fan Shoutout Wall */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Post Shoutout Box */}
              <div className="bg-[#0F0F11] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-4">
                  <MessageSquare className="w-4 h-4" />
                  Leave a Message for Austin
                </div>

                {postedSuccess && (
                  <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                    Shoutout posted successfully to the community board!
                  </div>
                )}

                <form onSubmit={handlePostShoutout} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={myName}
                    onChange={(e) => setMyName(e.target.value)}
                    placeholder="Your Name (e.g. Farai M.)"
                    className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="text"
                    value={myLocation}
                    onChange={(e) => setMyLocation(e.target.value)}
                    placeholder="City / Country (e.g. Harare)"
                    className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-amber-500"
                  />
                  <select
                    value={mySong}
                    onChange={(e) => setMySong(e.target.value)}
                    className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-amber-500"
                  >
                    <option value="RUDO" className="bg-zinc-900">Re: RUDO</option>
                    <option value="Hold You" className="bg-zinc-900">Re: Hold You</option>
                    <option value="Emotional Feeling" className="bg-zinc-900">Re: Emotional Feeling</option>
                    <option value="Wangu Moyo" className="bg-zinc-900">Re: Wangu Moyo</option>
                  </select>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={myMessage}
                      onChange={(e) => setMyMessage(e.target.value)}
                      placeholder="Your shoutout, favourite bar, or reaction..."
                      className="flex-grow bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider shrink-0 transition-all flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" /> Post
                    </button>
                  </div>
                </form>
              </div>

              {/* Shoutouts Stream */}
              <div className="space-y-4">
                {shoutouts.map((item) => (
                  <div key={item.id} className="bg-[#0F0F11] border border-white/10 rounded-2xl p-6 flex flex-col gap-3 shadow-lg hover:border-amber-500/30 transition-all">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{item.name}</span>
                        <span className="text-zinc-500">·</span>
                        <span className="text-zinc-400">{item.location}</span>
                        <span className="text-zinc-500">·</span>
                        <span className="text-amber-400 font-semibold">{item.song}</span>
                      </div>
                      <span className="text-zinc-500">{item.timeAgo}</span>
                    </div>
                    <p className="text-sm text-zinc-200 font-light leading-relaxed">
                      &ldquo;{item.message}&rdquo;
                    </p>
                    <div className="pt-2 flex items-center justify-between text-xs text-zinc-500">
                      <button
                        onClick={() => handleLike(item.id)}
                        className="flex items-center gap-1.5 text-zinc-400 hover:text-pink-500 transition-colors group"
                      >
                        <Heart className="w-4 h-4 group-hover:scale-110 transition-transform fill-current text-pink-500/80" />
                        <span>{item.likes}</span>
                      </button>
                      <span className="text-[11px]">Verified Fan Shoutout</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
