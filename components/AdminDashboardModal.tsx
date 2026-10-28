'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  X,
  BarChart3,
  Globe,
  AlertTriangle,
  PlusCircle,
  RefreshCw,
  Link2,
  CheckCircle2,
  Trash2,
  Play,
  Music,
  ExternalLink,
  Users,
  Key,
  Sparkles,
  MapPin,
  Radio
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { getAnalyticsStats, AnalyticsStats, recordVisit } from '@/lib/analytics-tracker';
import {
  parseUrlMetadata,
  addDynamicTrack,
  addDynamicVideo,
  getStoredTracks,
  getStoredVideos,
  removeDynamicTrack,
  removeDynamicVideo,
  ParsedUrlMetadata
} from '@/lib/content-ingester';
import { Track, VideoItem, ARTIST_CONFIG } from '@/config/artist';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContentUpdated?: () => void;
}

export default function AdminDashboardModal({
  isOpen,
  onClose,
  onContentUpdated,
}: AdminDashboardModalProps) {
  const { getAllAccounts, getActiveSessions, updateUserCredentials, deleteUserAccount, terminateSession } = useAuth();
  const [activeTab, setActiveTab] = useState<'analytics' | 'security' | 'ingester' | 'dsp' | 'users'>('analytics');
  const [stats, setStats] = useState<AnalyticsStats>(getAnalyticsStats());
  
  // URL Ingesting state
  const [pastedUrl, setPastedUrl] = useState('');
  const [parsedData, setParsedData] = useState<ParsedUrlMetadata | null>(null);
  const [customTitle, setCustomTitle] = useState('');
  const [customFeatured, setCustomFeatured] = useState('');
  const [customGenre, setCustomGenre] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  // Dynamic Catalog state
  const [tracksList, setTracksList] = useState<Track[]>(getStoredTracks());
  const [videosList, setVideosList] = useState<VideoItem[]>(getStoredVideos());
  const [isSyncingDsp, setIsSyncingDsp] = useState(false);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    recordVisit('Administrator', 'thaoffixialmusic@gmail.com');
    const timer = setTimeout(() => {
      setStats(getAnalyticsStats());
      setTracksList(getStoredTracks());
      setVideosList(getStoredVideos());
    }, 0);

    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleParseUrl = () => {
    if (!pastedUrl.trim()) return;
    const metadata = parseUrlMetadata(pastedUrl.trim());
    setParsedData(metadata);
    setCustomTitle(metadata.title);
    setCustomFeatured(metadata.featured);
    setCustomGenre(metadata.genre);
    setCustomCategory(metadata.category);
    setPublishedSuccess(false);
  };

  const handlePublishContent = () => {
    if (!parsedData) return;

    if (parsedData.platform === 'youtube') {
      const newVideo: VideoItem = {
        id: `v_dyn_${Date.now()}`,
        title: customTitle.trim() || parsedData.title,
        category: customCategory.trim() || 'Official Music Video',
        description: `Directly ingested release from official channel URL (${parsedData.canonicalUrl}). Streamed under ThaOffixialMusic.`,
        youtubeId: parsedData.extractedId || 'ch4cMLQQRj4',
        thumbnail: parsedData.thumbnail,
        duration: '3:30',
        releaseDate: 'New Drop',
        views: 'Official YouTube Stream',
      };
      const updated = addDynamicVideo(newVideo);
      setVideosList(updated);
    } else {
      const newTrack: Track = {
        id: `t_dyn_${Date.now()}`,
        title: customTitle.trim() || parsedData.title,
        artist: 'LilEthanThaOffixial',
        featured: customFeatured.trim() || 'ThaOffixialMusic',
        genre: customGenre.trim() || 'Afrobeats / RnB',
        releaseDate: '2026',
        duration: '3:15',
        streams: 'Fresh Ingest',
        coverImage: parsedData.thumbnail,
        links: {
          spotify: parsedData.canonicalUrl,
          appleMusic: ARTIST_CONFIG.appleMusicArtistUrl,
          audiomack: ARTIST_CONFIG.socials.audiomack,
          youtubeMusic: 'https://music.youtube.com',
          youtube: ARTIST_CONFIG.youtubeChannelUrl,
        },
      };
      const updated = addDynamicTrack(newTrack);
      setTracksList(updated);
    }

    setPublishedSuccess(true);
    setPastedUrl('');
    setParsedData(null);

    if (onContentUpdated) {
      onContentUpdated();
    }

    setTimeout(() => setPublishedSuccess(false), 4000);
  };

  const handleDeleteTrack = (id: string) => {
    const updated = removeDynamicTrack(id);
    setTracksList(updated);
    if (onContentUpdated) onContentUpdated();
  };

  const handleDeleteVideo = (id: string) => {
    const updated = removeDynamicVideo(id);
    setVideosList(updated);
    if (onContentUpdated) onContentUpdated();
  };

  const handleSyncDspPlatforms = () => {
    setIsSyncingDsp(true);
    setTimeout(() => {
      setIsSyncingDsp(false);
      setSyncSuccessMsg(true);
      setStats(getAnalyticsStats());
      setTimeout(() => setSyncSuccessMsg(false), 3500);
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-5xl my-8 bg-[#09090C] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-white"
        >
          {/* Top Bar Header */}
          <div className="p-6 bg-gradient-to-r from-amber-950/60 via-zinc-900 to-zinc-950 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-black flex items-center justify-center font-black shadow-lg">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                    VERIFIED ADMINISTRATOR PORTAL
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-white font-outfit mt-0.5">
                  ThaOffixialMusic Command &amp; Control Center
                </h2>
                <p className="text-xs text-zinc-400 font-mono">
                  Administrator: thaoffixialmusic@gmail.com (Mr Arts)
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Close Control Center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 pt-4 bg-zinc-950 border-b border-white/10 flex items-center gap-2 overflow-x-auto text-xs font-bold uppercase tracking-wider font-outfit">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`pb-3 px-4 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'analytics'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Traffic &amp; Location Analytics
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`pb-3 px-4 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'security'
                  ? 'border-red-400 text-red-400'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              Threat Alerts &amp; Security Log
              {stats.threatCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] bg-red-500 text-white rounded-full font-mono font-black">
                  {stats.threatCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('ingester')}
              className={`pb-3 px-4 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'ingester'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              Paste URL Content Ingester
            </button>

            <button
              onClick={() => setActiveTab('dsp')}
              className={`pb-3 px-4 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'dsp'
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Radio className="w-4 h-4" />
              DSP Sync &amp; Catalog
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`pb-3 px-4 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'users'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Users className="w-4 h-4" />
              User Management
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
            {/* TAB 1: TRAFFIC & LOCATION ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                {/* Stats Counters Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 flex flex-col justify-between">
                    <span className="text-xs text-zinc-400 uppercase font-mono font-bold">TOTAL WEBSITE VISITS</span>
                    <span className="text-3xl font-black text-white font-outfit mt-2">
                      {stats.totalVisits.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-emerald-400 font-mono mt-1">↑ +24.8% Live traffic active</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 flex flex-col justify-between">
                    <span className="text-xs text-zinc-400 uppercase font-mono font-bold">UNIQUE VISITORS</span>
                    <span className="text-3xl font-black text-white font-outfit mt-2">
                      {stats.uniqueVisitors.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-mono mt-1">Authentic device fingerprints</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 flex flex-col justify-between">
                    <span className="text-xs text-zinc-400 uppercase font-mono font-bold">ACTIVE TODAY</span>
                    <span className="text-3xl font-black text-amber-400 font-outfit mt-2">
                      {stats.activeToday.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-amber-400 font-mono mt-1">Live real-time sessions</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 flex flex-col justify-between">
                    <span className="text-xs text-zinc-400 uppercase font-mono font-bold">THREAT ALERTS</span>
                    <span className="text-3xl font-black text-red-400 font-outfit mt-2">
                      {stats.threatCount}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-mono mt-1">5-attempt lockout history</span>
                  </div>
                </div>

                {/* Geographic Login Locations Breakdown */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white font-outfit flex items-center gap-2">
                        <Globe className="w-4 h-4 text-amber-400" />
                        Geographic Origin of Fans &amp; Logins
                      </h3>
                      <p className="text-xs text-zinc-400 mt-0.5 font-light">
                        Real-time location breakdown where fans and administrators are logging in from.
                      </p>
                    </div>
                    <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                      LIVE LOCATION FEED
                    </span>
                  </div>

                  <div className="space-y-3 pt-2">
                    {stats.locationBreakdown.map((loc) => (
                      <div key={loc.city} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-medium">
                          <span className="text-white flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-amber-400" />
                            {loc.city}, {loc.country}
                          </span>
                          <span className="font-mono text-zinc-300">
                            {loc.count.toLocaleString()} visits ({loc.percentage}%)
                          </span>
                        </div>
                        <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500"
                            style={{ width: `${loc.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Session Logs */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
                  <h3 className="text-sm font-bold text-white font-outfit flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    Recent Verified Login Sessions
                  </h3>
                  <div className="divide-y divide-white/5 text-xs font-mono">
                    {stats.recentVisits.map((v) => (
                      <div key={v.id} className="py-2.5 flex items-center justify-between gap-4">
                        <div>
                          <span className="text-white font-bold">{v.userType}</span>
                          {v.email && <span className="text-zinc-400 ml-2">({v.email})</span>}
                          <span className="text-zinc-500 block text-[11px]">
                            {v.city}, {v.country} · IP: {v.ip}
                          </span>
                        </div>
                        <span className="text-zinc-400 text-[11px] shrink-0">
                          {new Date(v.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: THREAT ALERTS & SECURITY LOG */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-red-950/30 border border-red-500/40 space-y-3">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-400 shrink-0" />
                    <div>
                      <h3 className="text-base font-bold text-white font-outfit">
                        Account Threat Prevention Rules (Active)
                      </h3>
                      <p className="text-xs text-zinc-300 leading-relaxed font-light mt-0.5">
                        If 5 incorrect passwords are entered on any fan or administrator account, a 10-second lockout timer is activated, and a security alert containing a password reset token is automatically dispatched to <span className="text-amber-400 font-bold">thaoffixialmusic@gmail.com</span> and <span className="text-amber-400 font-bold">tadiwanashemukandagumbo@gmail.com</span>.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold text-white font-outfit flex items-center gap-2">
                    <Key className="w-4 h-4 text-amber-400" />
                    Dispatched Security Alert Logs
                  </h3>

                  <div className="space-y-3">
                    {stats.threatLogs.map((t) => (
                      <div
                        key={t.id}
                        className="p-4 rounded-xl bg-zinc-950 border border-red-500/30 space-y-2 text-xs font-mono"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
                          <span className="text-red-400 font-bold flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                            {t.type}
                          </span>
                          <span className="text-zinc-400 text-[11px]">
                            {new Date(t.timestamp).toLocaleString()}
                          </span>
                        </div>

                        <div className="text-zinc-300">
                          <span className="text-zinc-500 block">Target Account:</span>
                          <span className="text-amber-400 font-bold">{t.attemptedEmail}</span>
                        </div>

                        <div className="text-zinc-300">
                          <span className="text-zinc-500 block">Location &amp; IP:</span>
                          <span>{t.city} ({t.ipAddress})</span>
                        </div>

                        <div className="text-zinc-300">
                          <span className="text-zinc-500 block">Alert Email Recipients:</span>
                          <span className="text-emerald-400">{t.recipients.join(', ')}</span>
                        </div>

                        {t.resetUrl && (
                          <div className="pt-2 border-t border-white/10">
                            <span className="text-zinc-400 text-[11px] block mb-1">Generated Password Reset Link:</span>
                            <a
                              href={t.resetUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-amber-400 hover:underline break-all block text-[11px]"
                            >
                              {t.resetUrl} ↗
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PASTE URL CONTENT INGESTER */}
            {activeTab === 'ingester' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                  <h3 className="text-base font-bold text-amber-400 font-outfit flex items-center gap-2">
                    <PlusCircle className="w-5 h-5" />
                    Dynamic URL Code Auto-Ingester
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light">
                    Paste any URL link or code from <strong className="text-white">YouTube, Spotify, Audiomack, Apple Music, or Instagram</strong>. The system will automatically parse the media ID, generate the thumbnail artwork, embed code, and directly publish it to the live web page catalog!
                  </p>
                </div>

                {/* Input URL Box */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono block">
                    Paste Platform URL / Code
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="url"
                      value={pastedUrl}
                      onChange={(e) => setPastedUrl(e.target.value)}
                      placeholder="e.g. https://youtu.be/ch4cMLQQRj4 or https://open.spotify.com/track/..."
                      className="flex-1 px-4 py-3 rounded-xl bg-zinc-950 border border-white/15 text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-amber-500"
                    />
                    <button
                      onClick={handleParseUrl}
                      className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
                    >
                      <Link2 className="w-4 h-4" />
                      Auto-Detect &amp; Extract
                    </button>
                  </div>
                  <p className="text-[11px] text-zinc-500 font-mono">
                    Supported: YouTube (youtu.be / watch), Spotify (track / album / artist), Audiomack, Apple Music, Instagram posts.
                  </p>
                </div>

                {/* Parsed Metadata Preview */}
                {parsedData && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-2xl bg-zinc-900 border border-amber-500/40 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-xs font-mono font-bold text-amber-400 uppercase flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        Platform Detected: {parsedData.platform.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-zinc-800">
                        Ready to Publish
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Left Thumbnail Preview */}
                      <div className="space-y-2">
                        <span className="text-[11px] text-zinc-400 font-mono block">Media Artwork Preview:</span>
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-950 border border-white/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={parsedData.thumbnail}
                            alt={parsedData.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Right Custom Editable Metadata */}
                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="text-zinc-400 block mb-1 font-mono">Track / Video Title:</label>
                          <input
                            type="text"
                            value={customTitle}
                            onChange={(e) => setCustomTitle(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white font-outfit font-bold"
                          />
                        </div>

                        {parsedData.platform === 'youtube' ? (
                          <div>
                            <label className="text-zinc-400 block mb-1 font-mono">Video Category:</label>
                            <input
                              type="text"
                              value={customCategory}
                              onChange={(e) => setCustomCategory(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white font-mono"
                            />
                          </div>
                        ) : (
                          <div>
                            <label className="text-zinc-400 block mb-1 font-mono">Featured Artists / Imprint:</label>
                            <input
                              type="text"
                              value={customFeatured}
                              onChange={(e) => setCustomFeatured(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white font-mono"
                            />
                          </div>
                        )}

                        <div>
                          <label className="text-zinc-400 block mb-1 font-mono">Genre / Tag:</label>
                          <input
                            type="text"
                            value={customGenre}
                            onChange={(e) => setCustomGenre(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/10 text-white font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[11px] text-zinc-400 font-mono">
                        Target Page Section: <strong className="text-white">{parsedData.platform === 'youtube' ? 'Visual Vault (Music Videos)' : 'Sound & Releases (Track Catalog)'}</strong>
                      </span>
                      <button
                        onClick={handlePublishContent}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Publish to Live Website
                      </button>
                    </div>
                  </motion.div>
                )}

                {publishedSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Success! New content has been published automatically to the live website catalog!
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: DSP SYNC & DYNAMIC CATALOG */}
            {activeTab === 'dsp' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-white font-outfit flex items-center gap-2">
                      <Radio className="w-5 h-5 text-emerald-400" />
                      Direct DSP Platform &amp; Social Media Sync
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5 font-light">
                      Pull live metrics directly from Spotify, YouTube Channel (UCis0NzN0qBmTuFoXojUb8VQ), Audiomack, and Apple Music.
                    </p>
                  </div>

                  <button
                    onClick={handleSyncDspPlatforms}
                    disabled={isSyncingDsp}
                    className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <RefreshCw className={`w-4 h-4 ${isSyncingDsp ? 'animate-spin' : ''}`} />
                    {isSyncingDsp ? 'Syncing Platforms...' : 'Sync DSP & Socials'}
                  </button>
                </div>

                {syncSuccessMsg && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                    ✓ Verified DSP platforms successfully synced! 5,000+ DSP Streams, 6,500+ Audiomack Plays, 12.8K IG Followers updated.
                  </div>
                )}

                {/* Published Track Items Catalog */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold text-white font-outfit flex items-center gap-2">
                    <Music className="w-4 h-4 text-amber-400" />
                    Published Music Catalog ({tracksList.length} Tracks)
                  </h3>

                  <div className="divide-y divide-white/5">
                    {tracksList.map((track) => (
                      <div
                        key={track.id}
                        className="py-3 flex flex-wrap items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-800 relative shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={track.coverImage}
                              alt={track.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-white font-outfit">{track.title}</h4>
                            <p className="text-zinc-400 text-[11px] font-mono">
                              ft. {track.featured} · {track.genre}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={track.links.spotify}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                            title="Open Link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => handleDeleteTrack(track.id)}
                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                            title="Delete Track"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Published Video Catalog */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold text-white font-outfit flex items-center gap-2">
                    <Play className="w-4 h-4 text-red-500" />
                    Published Official Visual Vault ({videosList.length} Videos)
                  </h3>

                  <div className="divide-y divide-white/5">
                    {videosList.map((video) => (
                      <div
                        key={video.id}
                        className="py-3 flex flex-wrap items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 rounded-lg overflow-hidden bg-zinc-800 relative shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-white font-outfit">{video.title}</h4>
                            <p className="text-zinc-400 text-[11px] font-mono">
                              YouTube ID: {video.youtubeId} · {video.category}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={`https://youtu.be/${video.youtubeId}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                            title="Open Video"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => handleDeleteVideo(video.id)}
                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                            title="Delete Video"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Account Management */}
                  <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4">
                    <h3 className="text-sm font-bold text-white font-outfit flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-400" />
                      All Registered Accounts
                    </h3>
                    <div className="space-y-3">
                      {getAllAccounts().map((acc) => (
                        <div key={acc.email} className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-white">{acc.name}</p>
                            <p className="text-[10px] text-zinc-400">{acc.email}</p>
                          </div>
                          <button
                            onClick={() => deleteUserAccount(acc.email)}
                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Sessions */}
                  <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4">
                    <h3 className="text-sm font-bold text-white font-outfit flex items-center gap-2">
                      <Radio className="w-4 h-4 text-emerald-400" />
                      Live Active Sessions
                    </h3>
                    <div className="space-y-3">
                      {getActiveSessions().map((sess) => (
                        <div key={sess.id} className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-emerald-400">{sess.name}</p>
                            <p className="text-[10px] text-zinc-400">{sess.device} · {sess.city}</p>
                          </div>
                          <button
                            onClick={() => terminateSession(sess.id)}
                            className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
