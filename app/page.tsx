'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  Play,
  Youtube,
  ExternalLink,
  Instagram,
  CheckCircle2,
  Calendar,
  MapPin,
  Mail,
  ShieldCheck,
  Heart,
  Sparkles,
  Bell,
  FileText,
  Radio,
  Share2,
  Check,
  User
} from 'lucide-react';
import { ARTIST_CONFIG, TRACKS, VIDEOS, INITIAL_SHOUTOUTS, Shoutout, Track, VideoItem } from '@/config/artist';
import { getStoredTracks, getStoredVideos } from '@/lib/content-ingester';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VideoModal from '@/components/VideoModal';
import { useLanguage } from '@/lib/language-context';

export default function HomePage() {
  const { t } = useLanguage();

  const [tracks, setTracks] = useState<Track[]>(() => getStoredTracks());
  const [videos, setVideos] = useState<VideoItem[]>(() => getStoredVideos());

  const [selectedVideo, setSelectedVideo] = useState<{ id: string; title: string } | null>(null);
  const [activeVisualId, setActiveVisualId] = useState<string>('ch4cMLQQRj4');

  // Tour notification state
  const [tourEmail, setTourEmail] = useState('');
  const [tourCity, setTourCity] = useState('');
  const [tourSubmitted, setTourSubmitted] = useState(false);

  // Store waitlist state
  const [storeEmail, setStoreEmail] = useState('');
  const [storeSubmitted, setStoreSubmitted] = useState(false);

  // Community Inner Circle state
  const [vipEmail, setVipEmail] = useState('');
  const [includePresale, setIncludePresale] = useState(true);
  const [vipSubmitted, setVipSubmitted] = useState(false);

  // Shoutouts state
  const [shoutouts, setShoutouts] = useState<Shoutout[]>(INITIAL_SHOUTOUTS);
  const [shoutoutName, setShoutoutName] = useState('');
  const [shoutoutCity, setShoutoutCity] = useState('');
  const [shoutoutSong, setShoutoutSong] = useState('RUDO');
  const [shoutoutMessage, setShoutoutMessage] = useState('');
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});

  // Booking Form state
  const [bookingCategory, setBookingCategory] = useState('Festival Headline / Stage Performance');
  const [promoter, setPromoter] = useState('');
  const [contactName, setContactName] = useState('');
  const [promoterEmail, setPromoterEmail] = useState('');
  const [showDate, setShowDate] = useState('');
  const [showCity, setShowCity] = useState('');
  const [budget, setBudget] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // EPK Modal state & Track share state
  const [epkOpen, setEpkOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [copiedTrackId, setCopiedTrackId] = useState<string | null>(null);

  const handleCopyTrackLink = (trackId: string, url: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedTrackId(trackId);
      setTimeout(() => setCopiedTrackId(null), 2200);
    }
  };

  const handlePostShoutout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shoutoutName.trim() || !shoutoutMessage.trim()) return;

    const newShoutout: Shoutout = {
      id: `s-${Date.now()}`,
      name: shoutoutName.trim(),
      location: shoutoutCity.trim() || 'Harare, Zimbabwe',
      song: shoutoutSong,
      message: shoutoutMessage.trim(),
      timeAgo: 'Just now',
      likes: 1,
    };

    setShoutouts([newShoutout, ...shoutouts]);
    setShoutoutName('');
    setShoutoutCity('');
    setShoutoutMessage('');
  };

  const handleToggleLike = (id: string) => {
    setLikedIds(prev => ({ ...prev, [id]: !prev[id] }));
    setShoutouts(prev =>
      prev.map(s => {
        if (s.id === id) {
          const isLiked = likedIds[id];
          return { ...s, likes: isLiked ? s.likes - 1 : s.likes + 1 };
        }
        return s;
      })
    );
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoterEmail.trim()) return;
    setBookingSubmitted(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(ARTIST_CONFIG.socials.instagram);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[#FAFAFA] overflow-x-hidden selection:bg-amber-500 selection:text-black">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="lg:col-span-7 min-w-0 w-full flex flex-col items-start text-left"
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="text-xs font-bold tracking-widest text-amber-400 uppercase font-outfit px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                {t.hero.kicker}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black tracking-tighter text-white font-outfit uppercase leading-none mb-4 break-all sm:break-normal max-w-full drop-shadow-md">
              {ARTIST_CONFIG.name}
            </h1>

            <h2 className="text-lg sm:text-xl font-bold text-amber-400 mb-6 font-outfit">
              {t.hero.realNameImprint}
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed max-w-2xl mb-8">
              {t.hero.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="#bio"
                className="px-6 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
              >
                <User className="w-4 h-4" />
                {t.hero.btnBio}
              </a>
              <a
                href={ARTIST_CONFIG.spotifyArtistUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                {t.hero.btnStream}
              </a>
              <a
                href="#visuals"
                className="px-6 py-3.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white border border-white/10 font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer"
              >
                <Youtube className="w-4 h-4 text-red-500" />
                {t.hero.btnVisuals}
              </a>
            </div>

            <div className="mb-10">
              <a
                href={ARTIST_CONFIG.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 font-medium transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
                @lil_ethan_tha_official <ExternalLink className="w-3 h-3 text-zinc-500" />
              </a>
            </div>

            <div className="pt-6 border-t border-white/10 w-full flex flex-wrap items-center justify-between text-xs text-zinc-500 gap-4">
              <span>{t.hero.location}</span>
              <span>·</span>
              <span>{t.hero.management}</span>
              <span>·</span>
              <span className="text-emerald-400 font-medium">{t.hero.verifiedArtist}</span>
            </div>
          </motion.div>

          {/* Right Hero Image Card with Featured Single */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-amber-500/25 shadow-2xl bg-zinc-900/80 backdrop-blur-sm">
              <Image
                src={ARTIST_CONFIG.images.hero}
                alt={ARTIST_CONFIG.name}
                fill
                priority
                className="object-cover transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent" />

              {/* Featured Single Card overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/85 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center justify-between shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-800 shrink-0">
                    <Image
                      src={ARTIST_CONFIG.images.rudoCover}
                      alt="Rudo"
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">{t.hero.featuredSingle}</span>
                    <h4 className="text-sm font-extrabold text-white font-outfit">Rudo</h4>
                    <p className="text-[11px] text-zinc-400">Loui27s / Law Keyz de mentor</p>
                  </div>
                </div>
                <a
                  href={ARTIST_CONFIG.spotifyArtistUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors inline-block cursor-pointer shadow-md"
                >
                  {t.hero.listen}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS RIBBON */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="py-8 bg-[#0A0A0C]/80 backdrop-blur-sm border-y border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-3 sm:p-5 bg-black/50 rounded-3xl border border-white/5">
            {/* Stat 1: YouTube Views */}
            <div className="col-span-1 p-4 sm:p-5 bg-zinc-900/60 rounded-2xl border border-white/5 text-center flex flex-col justify-center items-center min-w-0 overflow-hidden hover:border-amber-500/30 transition-colors">
              <span className="block text-2xl xs:text-3xl sm:text-4xl font-black text-white font-outfit tracking-tight truncate max-w-full">
                {t.stats.youtubeViews}
              </span>
              <span className="text-[11px] sm:text-xs text-zinc-400 uppercase tracking-wider font-medium mt-1 line-clamp-1">
                {t.stats.youtubeViewsLabel}
              </span>
            </div>

            {/* Stat 2: Spotify Listeners */}
            <div className="col-span-1 p-4 sm:p-5 bg-zinc-900/60 rounded-2xl border border-white/5 text-center flex flex-col justify-center items-center min-w-0 overflow-hidden hover:border-emerald-500/30 transition-colors">
              <span className="block text-2xl xs:text-3xl sm:text-4xl font-black text-white font-outfit tracking-tight truncate max-w-full">
                {t.stats.spotifyListeners}
              </span>
              <span className="text-[11px] sm:text-xs text-zinc-400 uppercase tracking-wider font-medium mt-1 line-clamp-1">
                {t.stats.spotifyListenersLabel}
              </span>
            </div>

            {/* Stat 3: YouTube Channel Handle - col-span-2 on mobile so it has full width, sm:col-span-1 on tablet & desktop */}
            <div className="col-span-2 sm:col-span-1 p-4 sm:p-5 bg-zinc-900/60 rounded-2xl border border-white/5 text-center flex flex-col justify-center items-center min-w-0 overflow-hidden hover:border-red-500/30 transition-colors">
              <span className="block text-sm xs:text-base sm:text-xl lg:text-xl xl:text-2xl font-black text-amber-400 font-outfit tracking-tight truncate max-w-full">
                {t.stats.youtubeHandle}
              </span>
              <span className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider font-medium mt-1 line-clamp-1">
                {t.stats.youtubeHandleLabel}
              </span>
            </div>

            {/* Stat 4: Origin / Roots - col-span-2 on mobile so it has full width, sm:col-span-1 on tablet & desktop */}
            <div className="col-span-2 sm:col-span-1 p-4 sm:p-5 bg-zinc-900/60 rounded-2xl border border-white/5 text-center flex flex-col justify-center items-center min-w-0 overflow-hidden hover:border-amber-500/30 transition-colors">
              <span className="block text-sm xs:text-base sm:text-xl lg:text-xl xl:text-2xl font-black text-white font-outfit tracking-tight truncate max-w-full">
                {t.stats.hometown}
              </span>
              <span className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider font-medium mt-1 line-clamp-1">
                {t.stats.hometownLabel}
              </span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. BIOGRAPHY SECTION FIRST: THE STORY: AUSTIN MTOMBA */}
      <motion.section
        id="bio"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="py-24 bg-[#080808]/70 backdrop-blur-sm border-b border-white/10 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase font-mono block mb-2">
              {t.bio.kicker}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-outfit uppercase tracking-tight">
              {t.bio.title}
            </h2>
            <p className="text-zinc-400 text-sm mt-2 max-w-2xl">
              {t.bio.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Story Column */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {t.bio.p1}
              </p>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {t.bio.p2}
              </p>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {t.bio.p3}
              </p>

              {/* Official Instagram Feed Card */}
              <div className="p-5 bg-zinc-900/60 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest block font-mono">{t.bio.instagramFeedTitle}</span>
                    <h4 className="text-sm font-bold text-white font-outfit">@lil_ethan_tha_official</h4>
                    <p className="text-xs text-zinc-400">{t.bio.instagramFeedSub}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="#social"
                    className="px-4 py-2 rounded-xl bg-pink-600/20 text-pink-300 border border-pink-500/30 text-xs font-bold hover:bg-pink-600/30 transition-colors inline-flex items-center gap-1.5"
                  >
                    <Instagram className="w-3.5 h-3.5" /> {t.bio.exploreFeed}
                  </a>
                  <a
                    href={ARTIST_CONFIG.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 text-xs font-bold transition-colors inline-flex items-center gap-1"
                  >
                    {t.bio.openApp} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Two Photos from user attachments: Sunset and Poolside */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-3 flex flex-col">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-2 bg-zinc-800">
                    <Image
                      src={ARTIST_CONFIG.images.sunsetGoldenHour}
                      alt={t.bio.photo1Caption}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-xs text-zinc-400 font-medium">{t.bio.photo1Caption}</span>
                </div>
                <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-3 flex flex-col">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-2 bg-zinc-800">
                    <Image
                      src={ARTIST_CONFIG.images.poolsideBreak}
                      alt={t.bio.photo2Caption}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-xs text-zinc-400 font-medium">{t.bio.photo2Caption}</span>
                </div>
              </div>

              {/* View Electronic Press Kit (EPK) Button */}
              <div className="pt-2">
                <button
                  onClick={() => setEpkOpen(true)}
                  className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  {t.bio.viewEpk}
                </button>
              </div>
            </div>

            {/* Right Story Column (Vertical Poster + Representation + Recognition) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Vertical poster card with phone Spotify screen */}
              <div className="bg-zinc-900/60 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <div className="relative aspect-[3/4] w-full bg-zinc-950">
                  <Image
                    src={ARTIST_CONFIG.images.spotifyPoster}
                    alt="LilEthanThaOfficial Poster Archive"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 bg-zinc-900/90 border-t border-white/5">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block font-mono">
                    {t.bio.posterArchive}
                  </span>
                  <h4 className="text-sm font-bold text-white font-outfit mt-0.5">
                    {t.hero.kicker}
                  </h4>
                </div>
              </div>

              {/* Artist Representation Card */}
              <div className="p-6 bg-zinc-900/60 border border-white/10 rounded-2xl flex flex-col gap-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 font-mono">
                  {t.bio.repTitle}
                </span>
                <div>
                  <span className="text-xs text-zinc-400 block">{t.bio.repManagement}</span>
                  <h4 className="text-base font-bold text-white font-outfit">{ARTIST_CONFIG.management}</h4>
                  <a
                    href={`mailto:${ARTIST_CONFIG.managementEmail}`}
                    className="text-xs text-amber-400 hover:underline font-mono mt-0.5 inline-block"
                  >
                    {ARTIST_CONFIG.managementEmail}
                  </a>
                </div>
                <div className="pt-3 border-t border-white/5">
                  <span className="text-xs text-zinc-400 block">{t.bio.repImprint}</span>
                  <span className="text-sm font-semibold text-white">{ARTIST_CONFIG.imprint}</span>
                </div>
              </div>

              {/* Industry Recognition & Catalogs Card */}
              <div className="p-6 bg-zinc-900/60 border border-white/10 rounded-2xl flex flex-col gap-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t.bio.industryRecognition}
                </span>

                <div className="flex flex-col gap-3 text-xs">
                  <div className="pb-3 border-b border-white/5 flex items-start justify-between gap-4">
                    <div>
                      <h5 className="font-bold text-white font-outfit">{t.bio.topRelease}</h5>
                      <p className="text-zinc-400 text-[11px]">Spotify &amp; Apple Music</p>
                    </div>
                    <span className="font-mono text-zinc-500 text-[11px] shrink-0">2025/2026</span>
                  </div>

                  <div className="pb-3 border-b border-white/5 flex items-start justify-between gap-4">
                    <div>
                      <h5 className="font-bold text-white font-outfit">&ldquo;Hold You&rdquo; (ft. Arcade X &amp; Stunt Master)</h5>
                      <p className="text-zinc-400 text-[11px]">YouTube Official &amp; DSPs</p>
                    </div>
                    <span className="font-mono text-zinc-500 text-[11px] shrink-0">2025</span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h5 className="font-bold text-white font-outfit">&ldquo;Emotional Feeling&rdquo; &amp; &ldquo;Wangu Moyo&rdquo;</h5>
                      <p className="text-zinc-400 text-[11px]">{t.bio.catalogLabel}</p>
                    </div>
                    <span className="font-mono text-zinc-500 text-[11px] shrink-0">2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4. SOUND & RELEASES SECTION */}
      <motion.section
        id="music"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="py-24 bg-transparent scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2 font-mono">
                <CheckCircle2 className="w-4 h-4" />
                {t.music.badge}
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-outfit uppercase tracking-tight">
                {t.music.title}
              </h2>
              <p className="text-zinc-400 text-sm mt-2 max-w-2xl leading-relaxed">
                {t.music.subtitle}
              </p>
            </div>
            <a
              href={ARTIST_CONFIG.spotifyArtistUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20 inline-flex items-center gap-2 shrink-0 cursor-pointer"
            >
              {t.music.openSpotify} <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="p-6 bg-[#0F0F11]/90 backdrop-blur-md border border-white/10 rounded-3xl flex flex-col gap-6 shadow-2xl">
            {/* Verified Platforms Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 text-xs text-zinc-400">
              <span className="font-semibold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {t.music.verifiedNotice}
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={ARTIST_CONFIG.spotifyArtistUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium hover:bg-emerald-500/20 transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Spotify Official ↗
                </a>
                <a
                  href={ARTIST_CONFIG.appleMusicArtistUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20 font-medium hover:bg-pink-500/20 transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                  Apple Music Official ↗
                </a>
                <a
                  href={ARTIST_CONFIG.youtubeChannelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 font-medium hover:bg-red-500/20 transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  YouTube Official ↗
                </a>
                <a
                  href={ARTIST_CONFIG.socials.audiomack}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium hover:bg-amber-500/20 transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Audiomack Official ↗
                </a>
              </div>
            </div>

            {/* Embedded Live Spotify Discography Player */}
            <div className="p-5 sm:p-6 bg-[#08080A] border border-white/10 rounded-2xl shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">
                    {t.music.playerKicker}
                  </span>
                </div>
                <a
                  href={ARTIST_CONFIG.spotifyArtistUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  {t.music.openSpotify} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 font-outfit">
                {t.music.playerTitle}
              </h3>
              <div className="rounded-xl overflow-hidden bg-black/60 border border-white/10">
                <iframe
                  style={{ borderRadius: '12px' }}
                  src={ARTIST_CONFIG.spotifyEmbedUrl}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="w-full border-0"
                  title="LilEthanThaOffixial Spotify Discography Player"
                />
              </div>
            </div>

            {/* Grid of tracks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className="bg-zinc-900/60 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-500/50 transition-all group shadow-md"
                >
                  <div>
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-zinc-800">
                      <Image
                        src={track.coverImage}
                        alt={track.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">{track.genre}</span>
                    <h3 className="text-base font-bold text-white font-outfit truncate">{track.title}</h3>
                    <p className="text-xs text-zinc-400 truncate">{t.music.ft} {track.featured}</p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-white/5 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-zinc-500 font-mono">{track.duration}</span>
                      <a
                        href={track.links.spotify}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
                      >
                        {t.music.streamBtn} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Social Media Share Buttons */}
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-1">
                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider font-mono flex items-center gap-1">
                        <Share2 className="w-3 h-3 text-amber-400" /> Share
                      </span>
                      <div className="flex items-center gap-1">
                        {/* WhatsApp Share */}
                        <a
                          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Listen to "${track.title}" by LilEthanThaOffixial: ${track.links.spotify}`)}`}
                          target="_blank"
                          rel="noreferrer"
                          title="Share on WhatsApp"
                          className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/20 transition-all flex items-center justify-center cursor-pointer hover:scale-105"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.553 4.11 1.519 5.84L0 24l6.328-1.48A11.937 11.937 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.945 9.945 0 01-5.082-1.396l-.364-.216-3.765.881.996-3.673-.237-.377A9.954 9.954 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                          </svg>
                        </a>

                        {/* X / Twitter Share */}
                        <a
                          href={`https://x.com/intent/post?text=${encodeURIComponent(`Check out "${track.title}" by @LilEthanThaOffixial! 🔥🇿🇼`)}&url=${encodeURIComponent(track.links.spotify)}`}
                          target="_blank"
                          rel="noreferrer"
                          title="Share on X"
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-white/10 transition-all flex items-center justify-center cursor-pointer hover:scale-105"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        </a>

                        {/* Facebook Share */}
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(track.links.spotify)}`}
                          target="_blank"
                          rel="noreferrer"
                          title="Share on Facebook"
                          className="p-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600/25 text-blue-400 border border-blue-500/20 transition-all flex items-center justify-center cursor-pointer hover:scale-105"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </a>

                        {/* Copy Link */}
                        <button
                          onClick={() => handleCopyTrackLink(track.id, track.links.spotify)}
                          title="Copy Track Link"
                          className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/25 text-amber-400 border border-amber-500/20 transition-all flex items-center justify-center cursor-pointer hover:scale-105"
                        >
                          {copiedTrackId === track.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Share2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5. THE VISUAL VAULT / OFFICIAL MUSIC VIDEOS */}
      <motion.section
        id="visuals"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="py-24 bg-[#080808]/70 backdrop-blur-sm border-t border-white/10 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-2 font-mono">
                <Youtube className="w-4 h-4 text-red-500" />
                {t.visuals.badge}
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-outfit uppercase tracking-tight">
                {t.visuals.title}
              </h2>
              <p className="text-zinc-400 text-sm mt-2 max-w-2xl leading-relaxed">
                {t.visuals.subtitle}
              </p>
            </div>
            <a
              href={ARTIST_CONFIG.youtubeChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-red-600/30 inline-flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <Youtube className="w-4 h-4 fill-current" /> {t.visuals.openYoutube} ↗
            </a>
          </div>

          {/* Strict Channel Authentication Banner */}
          <div className="p-4 sm:p-5 bg-red-950/40 border border-red-500/40 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 text-xs shadow-lg">
            <div className="flex items-start sm:items-center gap-3 text-zinc-200">
              <div className="w-8 h-8 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center shrink-0 border border-red-500/30 font-bold font-mono">
                ✓
              </div>
              <div>
                <strong className="text-white block sm:inline font-bold uppercase tracking-wider text-[11px] text-red-300">
                  {t.visuals.guaranteeTitle}
                </strong>{' '}
                <span>
                  {t.visuals.guaranteeBody}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={ARTIST_CONFIG.youtubeChannelUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Radio className="w-3.5 h-3.5" /> {t.visuals.channelHub} ↗
              </a>
            </div>
          </div>

          {/* Interactive Live YouTube Video Player */}
          <div className="p-5 sm:p-7 bg-[#0F0F12]/95 backdrop-blur-md border border-white/10 rounded-3xl mb-10 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-amber-400 block mb-1">
                  {t.visuals.activePlayerKicker}
                </span>
                <h3 className="text-xl font-bold text-white font-outfit">
                  {activeVisualId === 'ch4cMLQQRj4'
                    ? 'LilEthanThaOffixial - Hold You (feat. Arcade X & Stunt Master)'
                    : 'LilEthanThaOffixial - _Rudo_(OFFIXIAL_VISUALISER )'}
                </h3>
              </div>

              {/* Video Switcher Buttons */}
              <div className="flex items-center gap-2 p-1 bg-black/60 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveVisualId('ch4cMLQQRj4')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeVisualId === 'ch4cMLQQRj4'
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Hold You
                </button>
                <button
                  type="button"
                  onClick={() => setActiveVisualId('He7qh9v6peU')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeVisualId === 'He7qh9v6peU'
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Rudo (Visualiser)
                </button>
              </div>
            </div>

            {/* Embedded YouTube Player */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-inner">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVisualId}?autoplay=0&rel=0`}
                title={
                  activeVisualId === 'ch4cMLQQRj4'
                    ? 'LilEthanThaOffixial - Hold You (feat. Arcade X & Stunt Master)'
                    : 'LilEthanThaOffixial - _Rudo_(OFFIXIAL_VISUALISER )'
                }
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-zinc-400 gap-3 pt-3 border-t border-white/5">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {t.visuals.verifiedUpload}
              </span>
              <a
                href={
                  activeVisualId === 'ch4cMLQQRj4'
                    ? 'https://youtu.be/ch4cMLQQRj4?si=-Iq9hFmedJJnRTfz'
                    : 'https://youtu.be/He7qh9v6peU?si=XFcwCRofn1fatCi-'
                }
                target="_blank"
                rel="noreferrer"
                className="text-red-400 hover:text-red-300 font-semibold inline-flex items-center gap-1 hover:underline"
              >
                {t.visuals.watchDirectlyYt} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Official Music Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {videos.map((video) => (
              <div
                key={video.id}
                className="group bg-zinc-900/60 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 flex flex-col shadow-xl"
              >
                <div
                  onClick={() => {
                    setActiveVisualId(video.youtubeId);
                    setSelectedVideo({ id: video.youtubeId, title: video.title });
                  }}
                  className="relative aspect-video w-full bg-zinc-900 overflow-hidden cursor-pointer"
                >
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 text-[11px] font-mono text-white">
                    {video.duration}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
                      <span>{video.category}</span>
                      <span>•</span>
                      <span>{video.duration}</span>
                      <span>•</span>
                      <span className="text-zinc-400">{video.views}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white font-outfit mt-1">{video.title}</h3>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{video.description}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-zinc-500 gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveVisualId(video.youtubeId)}
                      className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer inline-flex items-center gap-1"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> {t.visuals.playInPlayer}
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
                      <Youtube className="w-3.5 h-3.5" /> {t.visuals.openOnYt} ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* YouTube Subscribe Bar */}
          <div className="p-6 bg-zinc-900/60 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-600/30">
                <Youtube className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white font-outfit">{t.visuals.subscribeTitle}</h4>
                <p className="text-xs text-zinc-400 mt-0.5">{t.visuals.subscribeSub}</p>
              </div>
            </div>
            <a
              href={ARTIST_CONFIG.youtubeChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-widest transition-all shrink-0 shadow-lg shadow-red-600/30 cursor-pointer"
            >
              {t.visuals.subscribeBtn}
            </a>
          </div>
        </div>
      </motion.section>

      {/* 6. TOUR DATES & APPEARANCES */}
      <motion.section
        id="tour"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="py-24 bg-transparent border-t border-white/10 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase font-mono block mb-2">
              {t.tour.kicker}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-outfit uppercase tracking-tight">
              {t.tour.title}
            </h2>
            <p className="text-zinc-400 text-sm mt-2">
              {t.tour.subtitle}
            </p>
          </div>

          <div className="p-8 sm:p-14 bg-[#0A0A0C]/90 backdrop-blur-md border border-white/10 rounded-3xl text-center flex flex-col items-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase mb-6 tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              {t.tour.badge}
            </div>

            <h3 className="text-4xl sm:text-6xl font-black text-white font-outfit uppercase tracking-tight mb-4">
              {t.tour.comingSoon}
            </h3>

            <p className="text-sm sm:text-base text-zinc-300 max-w-xl leading-relaxed mb-8">
              {t.tour.notice}
            </p>

            {tourSubmitted ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-400 text-xs font-medium">
                {t.tour.successMsg}
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (tourEmail) setTourSubmitted(true); }} className="w-full max-w-md flex flex-col gap-3">
                <input
                  type="email"
                  placeholder={t.tour.emailPlaceholder}
                  value={tourEmail}
                  onChange={(e) => setTourEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                />
                <input
                  type="text"
                  placeholder={t.tour.cityPlaceholder}
                  value={tourCity}
                  onChange={(e) => setTourCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Bell className="w-4 h-4" />
                  {t.tour.notifyBtn}
                </button>
              </form>
            )}

            <div className="pt-8 mt-8 border-t border-white/5 w-full text-xs text-zinc-500 flex flex-wrap justify-center gap-x-6 gap-y-2">
              <span>Harare</span>
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
      </motion.section>

      {/* 7. MERCHANDISE & APPAREL */}
      <motion.section
        id="store"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="py-24 bg-transparent border-t border-white/10 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase font-mono block mb-2">
              {t.store.kicker}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-outfit uppercase tracking-tight">
              {t.store.title}
            </h2>
            <p className="text-zinc-400 text-sm mt-2">
              {t.store.subtitle}
            </p>
          </div>

          <div className="p-8 sm:p-14 bg-[#0A0A0C]/90 backdrop-blur-md border border-white/10 rounded-3xl text-center flex flex-col items-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase mb-6 tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {t.store.badge}
            </div>

            <h3 className="text-4xl sm:text-6xl font-black text-white font-outfit uppercase tracking-tight mb-4">
              {t.store.comingSoon}
            </h3>

            <p className="text-sm sm:text-base text-zinc-300 max-w-xl leading-relaxed mb-8">
              {t.store.notice}
            </p>

            {storeSubmitted ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-400 text-xs font-medium">
                {t.store.successMsg}
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (storeEmail) setStoreSubmitted(true); }} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder={t.store.emailPlaceholder}
                  value={storeEmail}
                  onChange={(e) => setStoreEmail(e.target.value)}
                  required
                  className="flex-grow px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20 whitespace-nowrap cursor-pointer"
                >
                  {t.store.joinWaitlist}
                </button>
              </form>
            )}

            <div className="pt-8 mt-8 border-t border-white/5 w-full text-xs text-zinc-500 flex flex-wrap justify-center gap-x-6 gap-y-2">
              <span>{t.store.hoodies}</span>
              <span>·</span>
              <span>{t.store.tees}</span>
              <span>·</span>
              <span>{t.store.vinyl}</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 8. COMMUNITY HUB / THE INNER CIRCLE */}
      <motion.section
        id="community"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="py-24 bg-[#080808]/70 backdrop-blur-sm border-t border-white/10 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-amber-400 uppercase font-mono block mb-2">
                {t.community.kicker}
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-outfit uppercase tracking-tight">
                {t.community.title}
              </h2>
              <p className="text-zinc-400 text-sm mt-2 max-w-xl">
                {t.community.subtitle}
              </p>
            </div>
            <div className="text-xs text-zinc-400 flex items-center gap-2">
              <span>VIP Community</span>
              <span>•</span>
              <span className="text-amber-400 font-semibold">{t.community.communitySub}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left VIP Tier Card */}
            <div className="lg:col-span-5 p-8 bg-zinc-900/70 border border-white/10 rounded-3xl flex flex-col justify-between shadow-2xl">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 font-mono block mb-3">
                  {t.community.vipBadge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit mb-3">
                  {t.community.vipTitle}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                  {t.community.vipDescription}
                </p>

                {vipSubmitted ? (
                  <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-400 text-xs font-medium mb-6">
                    {t.community.vipSuccess}
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); if (vipEmail) setVipSubmitted(true); }} className="flex flex-col gap-4 mb-8">
                    <input
                      type="email"
                      placeholder="you@domain.com"
                      value={vipEmail}
                      onChange={(e) => setVipEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                    />
                    <label className="flex items-center gap-2.5 text-xs text-zinc-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includePresale}
                        onChange={(e) => setIncludePresale(e.target.checked)}
                        className="rounded border-zinc-700 text-amber-500 focus:ring-0"
                      />
                      <span>{t.community.checkboxPresale}</span>
                    </label>
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
                    >
                      {t.community.btnJoinCircle}
                    </button>
                  </form>
                )}
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-col gap-2.5 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  <span>{t.community.perk1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  <span>{t.community.perk2}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  <span>{t.community.perk3}</span>
                </div>
              </div>
            </div>

            {/* Right Shoutouts Wall */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Post form */}
              <div className="p-6 bg-zinc-900/60 border border-white/10 rounded-2xl shadow-xl">
                <h4 className="text-sm font-bold text-white font-outfit uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span>{t.community.leaveMessage}</span>
                </h4>
                <form onSubmit={handlePostShoutout} className="flex flex-col gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder={t.community.namePlaceholder}
                      value={shoutoutName}
                      onChange={(e) => setShoutoutName(e.target.value)}
                      required
                      className="px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                    />
                    <input
                      type="text"
                      placeholder={t.community.locationPlaceholder}
                      value={shoutoutCity}
                      onChange={(e) => setShoutoutCity(e.target.value)}
                      className="px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <select
                      value={shoutoutSong}
                      onChange={(e) => setShoutoutSong(e.target.value)}
                      className="px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500 transition-colors sm:w-48"
                    >
                      <option value="RUDO">Re: RUDO</option>
                      <option value="Hold You">Re: Hold You</option>
                      <option value="Kumbofara">Re: Kumbofara</option>
                      <option value="Emotional Feeling">Re: Emotional Feeling</option>
                      <option value="Wangu Moyo">Re: Wangu Moyo</option>
                    </select>
                    <input
                      type="text"
                      placeholder={t.community.messagePlaceholder}
                      value={shoutoutMessage}
                      onChange={(e) => setShoutoutMessage(e.target.value)}
                      required
                      className="flex-grow px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 whitespace-nowrap cursor-pointer"
                    >
                      {t.community.postBtn}
                    </button>
                  </div>
                </form>
              </div>

              {/* Fan Messages Feed */}
              <div className="flex flex-col gap-3">
                {shoutouts.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-zinc-900/40 border border-white/10 rounded-2xl flex flex-col gap-2 shadow-sm"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{item.name}</span>
                        <span className="text-zinc-500">·</span>
                        <span className="text-zinc-400">{item.location}</span>
                        <span className="text-zinc-500">·</span>
                        <span className="text-amber-400 font-semibold">{item.song}</span>
                      </div>
                      <span className="text-zinc-500 text-[11px] font-mono">{item.timeAgo}</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed italic">
                      &ldquo;{item.message}&rdquo;
                    </p>
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => handleToggleLike(item.id)}
                        className={`text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                          likedIds[item.id] ? 'text-rose-500 font-bold' : 'text-zinc-400 hover:text-rose-400'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${likedIds[item.id] ? 'fill-current' : ''}`} />
                        <span>{item.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 9. OFFICIAL BOOKING & REPRESENTATION DESK */}
      <motion.section
        id="booking"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="py-24 bg-transparent border-t border-white/10 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-amber-400 uppercase font-mono block mb-2">
                {t.booking.kicker}
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-outfit uppercase tracking-tight">
                {t.booking.title}
              </h2>
              <p className="text-zinc-400 text-sm mt-2 max-w-2xl">
                {t.booking.subtitle}
              </p>
            </div>
            <div className="text-xs text-zinc-400 font-medium">
              {t.booking.managementLabel} <span className="text-amber-400 font-bold">{ARTIST_CONFIG.management}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Management Contacts Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="p-6 bg-zinc-900/60 border border-white/10 rounded-2xl flex flex-col gap-4 shadow-xl">
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 font-mono">
                  {t.booking.officialContacts}
                </span>
                <h3 className="text-xl font-bold text-white font-outfit">
                  {t.booking.managementOffice}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {t.booking.managementText}
                </p>

                <div className="p-4 bg-zinc-950 border border-white/10 rounded-xl flex items-center gap-3">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[11px] text-zinc-400 block font-medium">Management ({ARTIST_CONFIG.management})</span>
                    <a
                      href={`mailto:${ARTIST_CONFIG.managementEmail}`}
                      className="text-sm font-bold text-white hover:text-amber-400 transition-colors font-mono"
                    >
                      {ARTIST_CONFIG.managementEmail}
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>{t.booking.originLabel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{t.booking.responseWindow}</span>
                  </div>
                </div>

                <a
                  href={`mailto:${ARTIST_CONFIG.managementEmail}?subject=LilEthan%20Booking%20Inquiry`}
                  className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider transition-colors text-center inline-flex items-center justify-center gap-2 mt-2 cursor-pointer shadow-md"
                >
                  <Mail className="w-4 h-4 text-amber-400" />
                  {t.booking.emailDirectly} ↗
                </a>
              </div>

              <div className="p-6 bg-zinc-900/40 border border-white/10 rounded-2xl flex flex-col gap-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-outfit flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {t.booking.contractTitle}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {t.booking.contractText}
                </p>
              </div>
            </div>

            {/* Right Booking Request Form */}
            <div className="lg:col-span-7 p-8 bg-zinc-900/60 border border-white/10 rounded-3xl shadow-2xl">
              <h3 className="text-xl font-bold text-white font-outfit mb-6">
                {t.booking.formTitle}
              </h3>

              {bookingSubmitted ? (
                <div className="p-6 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-center flex flex-col items-center gap-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                  <h4 className="text-lg font-bold text-white font-outfit">{t.booking.inquiryReceived}</h4>
                  <p className="text-xs text-zinc-300 max-w-md leading-relaxed">
                    {t.booking.inquirySuccess}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-medium text-zinc-400 block mb-1.5">{t.booking.categoryLabel}</label>
                    <select
                      value={bookingCategory}
                      onChange={(e) => setBookingCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500 transition-colors"
                    >
                      <option value="Festival Headline / Stage Performance">Festival Headline / Stage Performance</option>
                      <option value="Club / Venue Performance">Club / Venue Performance</option>
                      <option value="Feature Collaboration (Song / Verse)">Feature Collaboration (Song / Verse)</option>
                      <option value="Brand Partnership & Commercial Sync">Brand Partnership &amp; Commercial Sync</option>
                      <option value="Press / Interview / Media Booking">Press / Interview / Media Booking</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-zinc-400 block mb-1.5">{t.booking.promoterLabel}</label>
                      <input
                        type="text"
                        placeholder={t.booking.promoterPlaceholder}
                        value={promoter}
                        onChange={(e) => setPromoter(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-zinc-400 block mb-1.5">{t.booking.contactLabel}</label>
                      <input
                        type="text"
                        placeholder={t.booking.contactPlaceholder}
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-zinc-400 block mb-1.5">{t.booking.emailLabel}</label>
                      <input
                        type="email"
                        placeholder={t.booking.emailPlaceholder}
                        value={promoterEmail}
                        onChange={(e) => setPromoterEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-zinc-400 block mb-1.5">{t.booking.dateLabel}</label>
                      <input
                        type="date"
                        value={showDate}
                        onChange={(e) => setShowDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-zinc-400 block mb-1.5">{t.booking.cityLabel}</label>
                      <input
                        type="text"
                        placeholder={t.booking.cityPlaceholder}
                        value={showCity}
                        onChange={(e) => setShowCity(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-zinc-400 block mb-1.5">{t.booking.budgetLabel}</label>
                      <input
                        type="text"
                        placeholder={t.booking.budgetPlaceholder}
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-zinc-400 block mb-1.5">{t.booking.notesLabel}</label>
                    <textarea
                      rows={4}
                      placeholder={t.booking.notesPlaceholder}
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20 mt-2 cursor-pointer"
                  >
                    {t.booking.sendBooking}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 10. INSTAGRAM BANNER */}
      <motion.section
        id="social"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="py-20 bg-[#0A0A0C]/80 backdrop-blur-md border-t border-white/10 scroll-mt-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="p-8 sm:p-12 bg-zinc-900/50 border border-white/10 rounded-3xl flex flex-col items-center shadow-2xl relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 flex items-center justify-center text-white mb-6 shadow-xl shadow-pink-500/20">
              <Instagram className="w-8 h-8" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit mb-3">
              {t.social.followInsta}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-lg leading-relaxed mb-8">
              {t.social.instaSub}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={ARTIST_CONFIG.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-pink-600/30 inline-flex items-center gap-2 cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
                {t.social.openInsta} <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={handleShare}
                className="px-6 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/10 inline-flex items-center gap-2 cursor-pointer shadow-md"
              >
                {shareCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    {t.social.copied}
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-zinc-400" />
                    {t.social.shareLink}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <Footer />

      {/* Video Modal Player */}
      {selectedVideo && (
        <VideoModal
          youtubeId={selectedVideo.id}
          title={selectedVideo.title}
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      {/* EPK Modal Preview */}
      {epkOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-[#0F0F11] border border-white/10 rounded-3xl max-w-2xl w-full p-6 sm:p-8 flex flex-col gap-6 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white font-outfit uppercase tracking-tight">
                  {t.epk.title} · {ARTIST_CONFIG.name}
                </h3>
              </div>
              <button
                onClick={() => setEpkOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4 text-xs text-zinc-300 leading-relaxed">
              <p>
                <strong className="text-white">{t.epk.artistLabel}</strong> LilEthanThaOffixial (Austin Mtomba)<br />
                <strong className="text-white">{t.epk.genreLabel}</strong> Afrobeats • R&amp;B • Trap<br />
                <strong className="text-white">{t.epk.originLabel}</strong> Zvishavane &amp; Harare, Zimbabwe<br />
                <strong className="text-white">{t.epk.repLabel}</strong> Mr Arts ({ARTIST_CONFIG.managementEmail})<br />
                <strong className="text-white">{t.epk.imprintLabel}</strong> {ARTIST_CONFIG.imprint}
              </p>
              <div className="p-4 bg-zinc-950 rounded-xl border border-white/5 flex flex-col gap-2">
                <span className="font-bold text-amber-400 uppercase tracking-widest font-mono text-[11px]">{t.epk.catalogLabel}</span>
                <p>• Single: &ldquo;RUDO&rdquo; (Produced by Loui27s / Law Keyz de mentor)</p>
                <p>• Single: &ldquo;Hold You&rdquo; (ft. Arcade X &amp; Stunt Master)</p>
                <p>• Single: &ldquo;Kumbofara&rdquo; (ft. CB3zw &amp; Stunt Master)</p>
                <p>• Single: &ldquo;Emotional Feeling&rdquo;</p>
                <p>• Single: &ldquo;Wangu Moyo&rdquo; (ft. Yvng B)</p>
              </div>
              <p className="text-zinc-400 text-[11px]">
                {t.epk.notice}
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setEpkOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                {t.epk.closeBtn}
              </button>
              <a
                href={`mailto:${ARTIST_CONFIG.managementEmail}?subject=LilEthan%20EPK%20Request`}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider transition-colors"
              >
                {t.epk.requestFull}
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
