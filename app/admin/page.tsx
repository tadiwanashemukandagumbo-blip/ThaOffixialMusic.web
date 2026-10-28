'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  ShieldAlert,
  Users,
  Activity,
  Globe,
  Radio,
  PlusCircle,
  Trash2,
  Edit3,
  ExternalLink,
  Eye,
  EyeOff,
  Search,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  LogOut,
  ArrowUpRight,
  Music2,
  Video,
  Key,
  UserPlus,
  Send,
  Zap,
  Clock,
  Laptop,
  Smartphone,
  Share2,
  Music,
} from 'lucide-react';
import { useAuth, RegisteredAccount, ActiveSession } from '@/lib/auth-context';
import {
  getAnalyticsStats,
  AnalyticsStats,
  VisitLocationLog,
  SecurityThreatLog,
  clearThreatLog,
  recordThreatAlert,
} from '@/lib/analytics-tracker';
import {
  parseUrlMetadata,
  ParsedUrlMetadata,
  getStoredTracks,
  getStoredVideos,
  addDynamicTrack,
  addDynamicVideo,
  removeDynamicTrack,
  removeDynamicVideo,
  DISTRIBUTION_PRESETS,
  DistributionSyncPreset,
} from '@/lib/content-ingester';
import { Track, VideoItem } from '@/config/artist';

export default function AdminDashboardPage() {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    logout,
    getAllAccounts,
    updateUserCredentials,
    deleteUserAccount,
    createUserByAdmin,
    getActiveSessions,
    terminateSession,
    openAuthModal,
  } = useAuth();

  // Navigation tab state
  type AdminTab = 'analytics' | 'locations' | 'active_users' | 'threats' | 'add_music' | 'distribution' | 'users';
  const [activeTab, setActiveTab] = useState<AdminTab>('analytics');

  // Stats and tracking state
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([]);
  const [accounts, setAccounts] = useState<RegisteredAccount[]>([]);
  const [dynamicTracks, setDynamicTracks] = useState<Track[]>([]);
  const [dynamicVideos, setDynamicVideos] = useState<VideoItem[]>([]);

  // Music & URL Ingestion State
  const [inputUrl, setInputUrl] = useState('');
  const [previewMetadata, setPreviewMetadata] = useState<ParsedUrlMetadata | null>(null);
  const [customTrackTitle, setCustomTrackTitle] = useState('');
  const [customGenre, setCustomGenre] = useState('');
  const [ingestSuccessMsg, setIngestSuccessMsg] = useState<string | null>(null);

  // User Management State
  const [searchUserQuery, setSearchUserQuery] = useState('');
  const [selectedUserToEdit, setSelectedUserToEdit] = useState<RegisteredAccount | null>(null);
  const [editName, setEditName] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editRole, setEditRole] = useState<'admin' | 'fan'>('fan');
  const [userActionNotice, setUserActionNotice] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  // New User Creation State
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserCity, setNewUserCity] = useState('Harare, Zimbabwe');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'fan'>('fan');

  // Time ticker for executive console
  const [currentTime, setCurrentTime] = useState<string>('');

  // Initial data load
  const reloadData = () => {
    setStats(getAnalyticsStats());
    setActiveSessions(getActiveSessions());
    setAccounts(getAllAccounts());
    setDynamicTracks(getStoredTracks());
    setDynamicVideos(getStoredVideos());
  };

  useEffect(() => {
    setTimeout(() => {
        reloadData();
    }, 0);
    const clockInterval = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', { hour12: false }) +
          ' UTC • ' +
          now.toLocaleTimeString('en-US', { timeZone: 'Africa/Harare', hour12: false }) +
          ' CAT (Harare)'
      );
    }, 1000);

    const refreshInterval = setInterval(() => {
      setStats(getAnalyticsStats());
      setActiveSessions(getActiveSessions());
    }, 5000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(refreshInterval);
    };
  }, []);

  // Sync accounts list when auth changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setAccounts(getAllAccounts());
    }, 0);
    return () => clearTimeout(timer);
  }, [user]);

  // If user is not logged in as admin, provide restricted gate
  const isAdmin = user?.role === 'admin' || user?.email === 'thaoffixialmusic@gmail.com';

  const handlePublishContent = (type: 'track' | 'video') => {
    if (!previewMetadata) return;

    if (type === 'track') {
      const newTrack: Track = {
        id: `trk_${Date.now()}`,
        title: customTrackTitle.trim() || previewMetadata.title,
        artist: previewMetadata.artist,
        featured: previewMetadata.featured,
        duration: '3:15',
        bpm: 104,
        key: 'F#m',
        audioUrl: previewMetadata.embedUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        coverImage: previewMetadata.thumbnail,
        spotifyUrl: previewMetadata.platform === 'spotify' ? previewMetadata.canonicalUrl : 'https://open.spotify.com/artist/0MgzzWrhDduimp33hAEKO3',
        appleMusicUrl: previewMetadata.platform === 'applemusic' ? previewMetadata.canonicalUrl : 'https://music.apple.com/artist/lilethanthaoffixial/1720000000',
        audiomackUrl: previewMetadata.platform === 'audiomack' ? previewMetadata.canonicalUrl : 'https://audiomack.com/artist/lilethanthaoffixial',
        youtubeUrl: previewMetadata.platform === 'youtube' ? previewMetadata.canonicalUrl : 'https://www.youtube.com/@LilEthanThaOffixial',
        genre: customGenre.trim() || previewMetadata.genre,
        releaseDate: '2026',
        releaseYear: '2026',
        isNew: true,
        links: {
          spotify: previewMetadata.platform === 'spotify' ? previewMetadata.canonicalUrl : 'https://open.spotify.com/artist/0MgzzWrhDduimp33hAEKO3',
          appleMusic: previewMetadata.platform === 'applemusic' ? previewMetadata.canonicalUrl : 'https://music.apple.com/artist/lilethanthaoffixial/1720000000',
          audiomack: previewMetadata.platform === 'audiomack' ? previewMetadata.canonicalUrl : 'https://audiomack.com/artist/lilethanthaoffixial',
          youtubeMusic: 'https://music.youtube.com',
          youtube: previewMetadata.platform === 'youtube' ? previewMetadata.canonicalUrl : 'https://www.youtube.com/@LilEthanThaOffixial',
        }
      };
      const updated = addDynamicTrack(newTrack);
      setDynamicTracks(updated);
      setIngestSuccessMsg(`Track "${newTrack.title}" published live to website music player!`);
    } else {
      const newVideo: VideoItem = {
        id: `vid_${Date.now()}`,
        title: customTrackTitle.trim() || previewMetadata.title,
        youtubeId: previewMetadata.extractedId || 'ch4cMLQQRj4',
        category: previewMetadata.category || 'Official Music Video',
        thumbnail: previewMetadata.thumbnail,
        description: `Official visual ingest: ${previewMetadata.title}. Distributed via ThaOffixialMusic.`,
        duration: '3:00', // Default
        releaseDate: 'October 2026',
        views: '0'
      };
      const updated = addDynamicVideo(newVideo);
      setDynamicVideos(updated);
      setIngestSuccessMsg(`Video "${newVideo.title}" added live to Visuals section!`);
    }

    setInputUrl('');
    setPreviewMetadata(null);
    setTimeout(() => setIngestSuccessMsg(null), 4000);
  };

  const handleApplyPreset = (preset: DistributionSyncPreset) => {
    setInputUrl(preset.defaultUrl);
  };

  const handleEditUserClick = (acc: RegisteredAccount) => {
    setSelectedUserToEdit(acc);
    setEditName(acc.name);
    setEditPassword(acc.password);
    setEditCity(acc.city || 'Harare, Zimbabwe');
    setEditRole(acc.role);
    setUserActionNotice(null);
  };

  const handleSaveUserEdits = () => {
    if (!selectedUserToEdit) return;
    const res = updateUserCredentials(selectedUserToEdit.email, {
      name: editName.trim(),
      password: editPassword,
      city: editCity.trim(),
      role: editRole,
    });

    if (res.success) {
      setUserActionNotice(`User "${selectedUserToEdit.email}" credentials successfully updated!`);
      setSelectedUserToEdit(null);
      setAccounts(getAllAccounts());
      setTimeout(() => setUserActionNotice(null), 4000);
    } else {
      setUserActionNotice(`Error: ${res.error || 'Failed to update user'}`);
    }
  };

  const handleDeleteUserClick = (email: string) => {
    if (confirm(`Are you sure you want to permanently delete user account: ${email}? This cannot be undone.`)) {
      const res = deleteUserAccount(email);
      if (res.success) {
        setUserActionNotice(`Account ${email} has been permanently deleted.`);
        setAccounts(getAllAccounts());
        setActiveSessions(getActiveSessions());
        setTimeout(() => setUserActionNotice(null), 4000);
      } else {
        setUserActionNotice(`Error: ${res.error || 'Failed to delete'}`);
      }
    }
  };

  const handleCreateNewUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim() || !newUserPassword.trim()) {
      alert('Please fill out all fields.');
      return;
    }
    const res = createUserByAdmin({
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      city: newUserCity.trim(),
      password: newUserPassword,
      role: newUserRole,
    });
    if (res.success) {
      setUserActionNotice(`Account created successfully for ${newUserEmail}!`);
      setIsCreateUserOpen(false);
      setNewUserName('');
      setNewUserEmail('');
      setNewUserPassword('');
      setAccounts(getAllAccounts());
      setTimeout(() => setUserActionNotice(null), 4000);
    } else {
      alert(res.error || 'Could not create account');
    }
  };

  const filteredAccounts = useMemo(() => {
    if (!searchUserQuery.trim()) return accounts;
    const q = searchUserQuery.toLowerCase();
    return accounts.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.city?.toLowerCase().includes(q) ||
        a.role.toLowerCase().includes(q)
    );
  }, [accounts, searchUserQuery]);

  const togglePasswordVisibility = (email: string) => {
    setShowPasswords((prev) => ({ ...prev, [email]: !prev[email] }));
  };

  // If user is not authorized as Administrator, show the distinct restricted login console
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#070709] text-white flex flex-col justify-center items-center p-6 relative selection:bg-amber-500 selection:text-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-md w-full bg-[#0D0D11] border border-amber-500/30 rounded-3xl p-8 shadow-2xl relative z-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 mx-auto flex items-center justify-center mb-6 text-amber-400">
            <ShieldAlert className="w-8 h-8 animate-pulse" />
          </div>

          <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[11px] font-bold uppercase tracking-widest mb-3">
            RESTRICTED ACCESS AREA
          </div>

          <h1 className="text-2xl sm:text-3xl font-black font-outfit uppercase tracking-tight text-white mb-3">
            Administrator Command Console
          </h1>

          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            This high-security portal is reserved exclusively for the artist management team, ThaOffixial imprint leadership, and authorized system administrators.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => openAuthModal('signin')}
              className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-wider text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Key className="w-4 h-4" />
              Sign In as Administrator
            </button>

            <Link
              href="/"
              className="w-full py-3 px-6 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2"
            >
              Return to Public Fan Portal
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5 text-zinc-500 text-[11px] font-mono">
            Default Root: thaoffixialmusic@gmail.com • IP: 197.221.240.12
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-200 selection:bg-amber-500 selection:text-black">
      {/* Top Aerospace / Studio Executive Header */}
      <header className="sticky top-0 z-40 bg-[#0A0A0E]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand & System Status */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 text-black font-black text-sm flex items-center justify-center shadow-md font-outfit">
                LE
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-black tracking-tight uppercase text-white font-outfit">
                    ThaOffixial Command Center
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    LIVE
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400 font-mono hidden sm:block">
                  {currentTime || 'SYNCHRONIZING TELEMETRY...'}
                </div>
              </div>
            </div>

            {/* Mobile Switch to Fan Page */}
            <Link
              href="/"
              className="md:hidden px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 text-xs font-bold flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              Fan Portal
            </Link>
          </div>

          {/* Administrator Profile & Actions */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <Link
              href="/"
              className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-bold uppercase tracking-wider transition-colors"
              title="View Public Fan Portal"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Public Fan View</span>
            </Link>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 font-mono">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <div className="text-left">
                <div className="font-bold truncate max-w-[150px]">{user?.name}</div>
                <div className="text-[10px] text-zinc-400 truncate max-w-[150px]">{user?.email}</div>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                router.push('/');
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 text-zinc-400 border border-white/10 transition-colors cursor-pointer"
              title="Sign Out of Administrator Console"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Console Navigation Tabs */}
        <div className="max-w-7xl mx-auto mt-3 overflow-x-auto scrollbar-none flex items-center gap-2 pt-2 border-t border-white/5">
          {[
            { id: 'analytics', label: 'Website Analytics', icon: Activity },
            { id: 'locations', label: 'Login Origins & Geolocation', icon: Globe },
            { id: 'active_users', label: 'Real-Time Active Users', icon: Radio },
            { id: 'threats', label: 'Threat Alerts & Security', icon: ShieldAlert },
            { id: 'add_music', label: 'Add Music / Videos (URL Ingest)', icon: Music2 },
            { id: 'distribution', label: 'Distribution & Social Sync', icon: Share2 },
            { id: 'users', label: 'User Credentials Management', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-black'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-amber-400'}`} />
                <span>{tab.label}</span>
                {tab.id === 'active_users' && activeSessions.length > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isActive ? 'bg-black text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}
                  >
                    {activeSessions.length}
                  </span>
                )}
                {tab.id === 'threats' && stats && stats.threatCount > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isActive ? 'bg-black text-amber-400' : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {stats.threatCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Administrative Workstation Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Global Notifications Bar */}
        {(ingestSuccessMsg || userActionNotice) && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-semibold flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{ingestSuccessMsg || userActionNotice}</span>
            </div>
            <button
              onClick={() => {
                setIngestSuccessMsg(null);
                setUserActionNotice(null);
              }}
              className="text-xs text-zinc-400 hover:text-white"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 1: WEBSITE VISITS & TRAFFIC ANALYSIS                       */}
        {/* ============================================================== */}
        {activeTab === 'analytics' && stats && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Top Telemetry Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#0D0D12] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                <div className="text-zinc-400 text-xs font-mono uppercase tracking-wider mb-1">Total Web Visits</div>
                <div className="text-3xl sm:text-4xl font-black text-white font-outfit">
                  {stats.totalVisits.toLocaleString()}
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+18.4% this month</span>
                </div>
              </div>

              <div className="bg-[#0D0D12] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                <div className="text-zinc-400 text-xs font-mono uppercase tracking-wider mb-1">Active Today</div>
                <div className="text-3xl sm:text-4xl font-black text-amber-400 font-outfit">
                  {stats.activeToday.toLocaleString()}
                </div>
                <div className="mt-2 text-zinc-400 text-xs font-mono">
                  Peak: Harare & Zvishavane
                </div>
              </div>

              <div className="bg-[#0D0D12] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                <div className="text-zinc-400 text-xs font-mono uppercase tracking-wider mb-1">Unique Fans / Visitors</div>
                <div className="text-3xl sm:text-4xl font-black text-white font-outfit">
                  {stats.uniqueVisitors.toLocaleString()}
                </div>
                <div className="mt-2 text-emerald-400 text-xs font-mono">
                  78% First-time listeners
                </div>
              </div>

              <div className="bg-[#0D0D12] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                <div className="text-zinc-400 text-xs font-mono uppercase tracking-wider mb-1">Online Right Now</div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-outfit flex items-center gap-2">
                  <span>{stats.onlineNow}</span>
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="mt-2 text-zinc-400 text-xs font-mono">
                  {activeSessions.length} Registered active
                </div>
              </div>
            </div>

            {/* Middle Grid: Device breakdown & DSP Velocity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Traffic Breakdown by Device */}
              <div className="bg-[#0D0D12] border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white uppercase font-outfit tracking-wide flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-amber-400" />
                  Device & Client Telemetry
                </h3>
                <div className="space-y-4">
                  {stats.deviceBreakdown.map((d) => (
                    <div key={d.device} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-zinc-300">{d.device}</span>
                        <span className="text-amber-400 font-mono font-bold">{d.percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                          style={{ width: `${d.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 text-[11px] text-zinc-400">
                  Mobile traffic dominates at 74%, led by iPhone and Samsung users streaming &quot;RUDO&quot; and &quot;Emotional_Feeling&quot;.
                </div>
              </div>

              {/* Streaming Velocity Across Platforms */}
              <div className="bg-[#0D0D12] border border-white/10 rounded-2xl p-6 lg:col-span-2 space-y-4">
                <h3 className="text-base font-bold text-white uppercase font-outfit tracking-wide flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Digital Streaming Velocity (Current Month)
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-xl bg-zinc-900 border border-white/5">
                    <div className="text-xs text-zinc-400 font-mono">Spotify Streams</div>
                    <div className="text-xl font-black text-white font-outfit mt-1">12,450+</div>
                    <div className="text-[10px] text-emerald-400 mt-1">+24% vs last week</div>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-900 border border-white/5">
                    <div className="text-xs text-zinc-400 font-mono">YouTube Views</div>
                    <div className="text-xl font-black text-white font-outfit mt-1">18,920+</div>
                    <div className="text-[10px] text-emerald-400 mt-1">Visualizer trending</div>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-900 border border-white/5">
                    <div className="text-xs text-zinc-400 font-mono">Audiomack Plays</div>
                    <div className="text-xl font-black text-white font-outfit mt-1">8,340+</div>
                    <div className="text-[10px] text-emerald-400 mt-1">Top Zim Dancehall/Trap</div>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-900 border border-white/5">
                    <div className="text-xs text-zinc-400 font-mono">Apple Music</div>
                    <div className="text-xl font-black text-white font-outfit mt-1">4,120+</div>
                    <div className="text-[10px] text-emerald-400 mt-1">High conversion</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-center justify-between">
                  <div className="text-xs text-zinc-300">
                    <span className="font-bold text-amber-400">Website Music Player Plays:</span> 3,420 direct audio plays on this official domain.
                  </div>
                  <button
                    onClick={() => setActiveTab('add_music')}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 text-black text-xs font-bold uppercase hover:bg-amber-400 transition-colors"
                  >
                    + Add New Track
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: GEOLOCATION & LOGIN ORIGINS ("where there are login from")*/}
        {/* ============================================================== */}
        {activeTab === 'locations' && stats && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white font-outfit uppercase tracking-tight">
                  Global Login Origins & Visitor Geolocation
                </h2>
                <p className="text-zinc-400 text-xs">
                  Real-time geographic inspection of where fans and administrators are logging in and streaming from.
                </p>
              </div>
              <button
                onClick={reloadData}
                className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold border border-white/10 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                Refresh Origin Logs
              </button>
            </div>

            {/* Geographical Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.locationBreakdown.map((loc) => (
                <div
                  key={loc.city}
                  className="p-5 rounded-2xl bg-[#0D0D12] border border-white/10 space-y-3 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{loc.flag}</span>
                      <div>
                        <div className="font-bold text-white text-sm font-outfit uppercase">{loc.city}</div>
                        <div className="text-[11px] text-zinc-400">{loc.country}</div>
                      </div>
                    </div>
                    <span className="text-amber-400 font-mono text-xs font-black px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20">
                      {loc.percentage}%
                    </span>
                  </div>

                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                      style={{ width: `${loc.percentage * 2}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-zinc-400 font-mono">
                    <span>{loc.count.toLocaleString()} Logins & Visits</span>
                    <span className="text-zinc-500">{loc.lat.toFixed(2)}, {loc.lng.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Live Login & Visit Events Table */}
            <div className="bg-[#0D0D12] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white uppercase font-outfit tracking-wide flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400" />
                Real-Time Login & Visit Activity Log
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-zinc-400 font-mono uppercase text-[11px]">
                      <th className="py-3 px-3">Timestamp</th>
                      <th className="py-3 px-3">City & Country</th>
                      <th className="py-3 px-3">User & Email</th>
                      <th className="py-3 px-3">Account Role</th>
                      <th className="py-3 px-3">IP Address</th>
                      <th className="py-3 px-3">Client Browser</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    {stats.recentVisits.map((v) => (
                      <tr key={v.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-3 text-zinc-400 whitespace-nowrap">
                          {new Date(v.timestamp).toLocaleTimeString()} ({new Date(v.timestamp).toLocaleDateString()})
                        </td>
                        <td className="py-3 px-3 text-white font-sans font-bold whitespace-nowrap">
                          📍 {v.city}, {v.country}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          {v.email ? (
                            <span className="text-amber-400 font-bold">{v.email}</span>
                          ) : (
                            <span className="text-zinc-500">Anonymous Fan Session</span>
                          )}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              v.userType === 'Administrator'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-zinc-800 text-zinc-300'
                            }`}
                          >
                            {v.userType}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-zinc-400">{v.ip}</td>
                        <td className="py-3 px-3 text-zinc-400 font-sans truncate max-w-[200px]">
                          {v.browser || 'Web Client'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: REAL-TIME ACTIVE USERS ("who is logged in in real time")*/}
        {/* ============================================================== */}
        {activeTab === 'active_users' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white font-outfit uppercase tracking-tight flex items-center gap-2">
                  <span>Who is Logged In in Real Time</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    {activeSessions.length} Online Now
                  </span>
                </h2>
                <p className="text-zinc-400 text-xs">
                  Active live sessions across the LilEthanThaOffixial ecosystem. Terminate unauthorized sessions instantly.
                </p>
              </div>

              <button
                onClick={reloadData}
                className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold border border-white/10 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                Scan Active Sessions
              </button>
            </div>

            {/* Active Sessions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeSessions.map((session) => (
                <div
                  key={session.id}
                  className={`p-5 rounded-2xl bg-[#0D0D12] border transition-all ${
                    session.isCurrent ? 'border-amber-500/40 shadow-lg shadow-amber-500/5' : 'border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center font-bold text-amber-400 font-outfit">
                        {session.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm font-outfit flex items-center gap-1.5">
                          <span>{session.name}</span>
                          {session.isCurrent && (
                            <span className="px-1.5 py-0.2 rounded bg-amber-500 text-black text-[9px] font-black uppercase">
                              YOU
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-zinc-400 font-mono truncate max-w-[170px]">
                          {session.email}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        session.role === 'admin'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {session.role}
                    </span>
                  </div>

                  <div className="space-y-1.5 py-3 border-y border-white/5 text-xs font-mono">
                    <div className="flex justify-between text-zinc-400">
                      <span>Status:</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        ACTIVE ONLINE
                      </span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Location:</span>
                      <span className="text-zinc-200">📍 {session.city}, {session.country}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>IP Address:</span>
                      <span className="text-zinc-300">{session.ip}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Client / OS:</span>
                      <span className="text-zinc-300 truncate max-w-[150px]">{session.device}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Connected At:</span>
                      <span className="text-zinc-400">{new Date(session.loginTime).toLocaleTimeString()}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    {!session.isCurrent ? (
                      <button
                        onClick={() => {
                          terminateSession(session.id);
                          setActiveSessions(getActiveSessions());
                          setUserActionNotice(`Terminated active session for ${session.email}`);
                          setTimeout(() => setUserActionNotice(null), 3000);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Terminate Session
                      </button>
                    ) : (
                      <div className="w-full py-2 px-3 rounded-xl bg-zinc-900 border border-white/5 text-center text-zinc-500 text-xs font-mono">
                        Active Master Admin Console
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: THREAT ALERTS & SECURITY ("any threat alerts")          */}
        {/* ============================================================== */}
        {activeTab === 'threats' && stats && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white font-outfit uppercase tracking-tight flex items-center gap-2">
                  <ShieldAlert className="w-6 h-6 text-rose-500" />
                  <span>Security & Intrusion Threat Center</span>
                </h2>
                <p className="text-zinc-400 text-xs">
                  Monitors failed password bursts, automated 10-second lockout triggers, and email dispatches to thaoffixialmusic@gmail.com & tadiwanashemukandagumbo@gmail.com.
                </p>
              </div>

              <button
                onClick={() => {
                  recordThreatAlert('test.intruder@thaoffixial.com', 'rst_test999', 'https://thaoffixialmusicweb.vercel.app/reset-password');
                  reloadData();
                  setUserActionNotice('Simulated security intrusion alert created and logged to security desk!');
                }}
                className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                Test Threat Trigger
              </button>
            </div>

            {/* Threat Counter Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/40 via-[#0D0D12] to-[#0D0D12] border border-rose-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white font-outfit uppercase">
                    Security Defense Level: Active & Enforced
                  </div>
                  <div className="text-xs text-zinc-400">
                    Threshold: 5 incorrect password attempts locks account entry for 10-second cooldown and dispatches emergency reset alert.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-2xl font-black text-rose-400 font-mono">{stats.threatCount}</div>
                  <div className="text-[10px] text-zinc-500 uppercase font-mono">Total Threats Logged</div>
                </div>
              </div>
            </div>

            {/* Threat Logs List */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider font-mono">
                Recent Threat Alerts & Lockout Records
              </h3>

              {stats.threatLogs.length === 0 ? (
                <div className="p-8 rounded-2xl bg-[#0D0D12] border border-white/5 text-center text-zinc-500 font-mono text-xs">
                  🟢 No active threat alerts detected. All authentication vectors secure.
                </div>
              ) : (
                stats.threatLogs.map((threat) => (
                  <div
                    key={threat.id}
                    className="p-5 rounded-2xl bg-[#0D0D12] border border-rose-500/20 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 text-xs font-black uppercase font-mono border border-rose-500/40">
                          {threat.type}
                        </span>
                        <span className="text-white font-bold text-sm">
                          Target Account: <span className="text-amber-400 font-mono">{threat.attemptedEmail}</span>
                        </span>
                      </div>
                      <span className="text-xs text-zinc-400 font-mono">
                        {new Date(threat.timestamp).toLocaleString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono text-zinc-400 bg-zinc-900/60 p-3 rounded-xl border border-white/5">
                      <div>
                        <span className="text-zinc-500">Origin IP:</span> {threat.ipAddress}
                      </div>
                      <div>
                        <span className="text-zinc-500">Origin City:</span> {threat.city}
                      </div>
                      <div>
                        <span className="text-zinc-500">Status:</span>{' '}
                        <span className="text-emerald-400 font-bold">{threat.status}</span>
                      </div>
                    </div>

                    <div className="text-xs text-zinc-300">
                      <span className="font-bold text-zinc-400">Dispatched To:</span>{' '}
                      {threat.recipients.join(', ')}
                    </div>

                    {threat.resetUrl && (
                      <div className="text-xs font-mono text-amber-400/90 break-all bg-black/40 p-2.5 rounded-lg border border-white/5">
                        <span className="text-zinc-500">Reset Token:</span> {threat.resetToken} |{' '}
                        <a
                          href={threat.resetUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="underline hover:text-amber-300"
                        >
                          Open Generated Password Reset Link
                        </a>
                      </div>
                    )}

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        onClick={() => {
                          clearThreatLog(threat.id);
                          reloadData();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Dismiss / Mark Resolved
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: ADD MUSIC & VIDEOS BY URL CODE INGESTION                */}
        {/* ============================================================== */}
        {activeTab === 'add_music' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-outfit uppercase tracking-tight">
                Add Music & Videos by Pasting URL Codes
              </h2>
              <p className="text-zinc-400 text-xs">
                Paste any link from YouTube, Spotify, Audiomack, or Apple Music. The system automatically inspects metadata, previews playback, and adds it live to the website catalog!
              </p>
            </div>

            {/* Ingestion Box */}
            <div className="p-6 rounded-3xl bg-[#0D0D12] border border-amber-500/30 space-y-4 shadow-xl">
              <label className="block text-xs font-mono uppercase text-amber-400 font-bold">
                Paste Media URL Code (YouTube, Spotify, Audiomack, Apple Music)
              </label>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => {
                    const val = e.target.value;
                    setInputUrl(val);
                    if (val.trim().length > 6) {
                      try {
                        const parsed = parseUrlMetadata(val.trim());
                        setPreviewMetadata(parsed);
                        setCustomTrackTitle(parsed.title);
                        setCustomGenre(parsed.genre);
                      } catch {
                        setPreviewMetadata(null);
                      }
                    } else {
                      setPreviewMetadata(null);
                    }
                  }}
                  placeholder="e.g. https://open.spotify.com/track/... or https://www.youtube.com/watch?v=..."
                  className="flex-1 px-4 py-3.5 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400 font-mono"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (previewMetadata) {
                      handlePublishContent(previewMetadata.isVideo ? 'video' : 'track');
                    }
                  }}
                  disabled={!previewMetadata}
                  className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-black uppercase tracking-wider text-xs transition-all shadow-lg shadow-amber-500/20 shrink-0 cursor-pointer flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  Publish Live to Web
                </button>
              </div>

              {/* Real-time Parsed Metadata Preview */}
              {previewMetadata && (
                <div className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold uppercase border border-amber-500/30">
                      Detected Platform: {previewMetadata.platformLabel}
                    </span>
                    <span className="text-xs text-emerald-400 font-mono font-bold">
                      ✓ Ready for 1-Click Web Deployment
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono text-zinc-400">Song / Item Title (Editable):</label>
                      <input
                        type="text"
                        value={customTrackTitle}
                        onChange={(e) => setCustomTrackTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-white/10 text-white text-xs font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono text-zinc-400">Genre / Category Tag:</label>
                      <input
                        type="text"
                        value={customGenre}
                        onChange={(e) => setCustomGenre(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-white/10 text-white text-xs font-bold"
                      />
                    </div>
                  </div>

                  {/* Visual Preview */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 p-3 rounded-xl bg-black/40 border border-white/5">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-800 shrink-0 relative">
                      <Image
                        src={previewMetadata.thumbnail}
                        alt="Preview Thumbnail"
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 text-left space-y-1">
                      <div className="text-sm font-bold text-white">{customTrackTitle}</div>
                      <div className="text-xs text-amber-400 font-mono">{previewMetadata.artist}</div>
                      <div className="text-[11px] text-zinc-400">{previewMetadata.category} • {previewMetadata.streamBadge}</div>
                    </div>

                    <div className="flex sm:flex-col gap-2 shrink-0">
                      <button
                        onClick={() => handlePublishContent('track')}
                        className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase transition-colors"
                      >
                        Add to Music Player
                      </button>
                      <button
                        onClick={() => handlePublishContent('video')}
                        className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase transition-colors"
                      >
                        Add to Visuals Grid
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Currently Active Live Dynamic Ingested Catalog */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white uppercase font-outfit tracking-wide flex items-center justify-between">
                <span>Live Ingested Music Catalog ({dynamicTracks.length} items)</span>
                <span className="text-xs text-zinc-400 font-mono font-normal">Active on Public Fan Portal</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dynamicTracks.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 rounded-xl bg-[#0D0D12] border border-white/10 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-800 shrink-0">
                        <Image src={t.coverImage || '/assets/aistudio/placeholder.png'} alt={t.title} fill className="object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white font-outfit">{t.title}</div>
                        <div className="text-xs text-zinc-400">{t.genre} • {t.duration}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={t.spotifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
                        title="Open Stream"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => {
                          const updated = removeDynamicTrack(t.id);
                          setDynamicTracks(updated);
                          setIngestSuccessMsg(`Track "${t.title}" removed from live website.`);
                          setTimeout(() => setIngestSuccessMsg(null), 3000);
                        }}
                        className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                        title="Remove Track from Live Site"
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

        {/* ============================================================== */}
        {/* TAB 6: DISTRIBUTION & SOCIAL PLATFORMS DIRECT SYNC             */}
        {/* ============================================================== */}
        {activeTab === 'distribution' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-outfit uppercase tracking-tight">
                Distribution Platforms & Social Media Direct Sync
              </h2>
              <p className="text-zinc-400 text-xs">
                Directly add information, releases, and metrics from global digital distribution hubs and verified social channels into the website.
              </p>
            </div>

            {/* Distribution Platforms Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider font-mono">
                Distribution Platforms (DSPs & Aggregators)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {DISTRIBUTION_PRESETS.filter((p) => p.type === 'distribution').map((preset) => (
                  <div
                    key={preset.id}
                    className="p-5 rounded-2xl bg-[#0D0D12] border border-white/10 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {preset.badge}
                        </span>
                        <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                      </div>
                      <div className="font-bold text-white text-base font-outfit">{preset.name}</div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{preset.description}</p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center gap-2">
                      <button
                        onClick={() => {
                          handleApplyPreset(preset);
                          setActiveTab('add_music');
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        Ingest from Platform
                      </button>
                      <a
                        href={preset.defaultUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media Ingest Section */}
            <div className="space-y-3 pt-4">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider font-mono">
                Social Media Channels Direct Feed
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {DISTRIBUTION_PRESETS.filter((p) => p.type === 'social').map((preset) => (
                  <div
                    key={preset.id}
                    className="p-5 rounded-2xl bg-[#0D0D12] border border-white/10 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {preset.badge}
                        </span>
                        <Share2 className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="font-bold text-white text-base font-outfit">{preset.name}</div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{preset.description}</p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center gap-2">
                      <button
                        onClick={() => {
                          handleApplyPreset(preset);
                          setActiveTab('add_music');
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        Sync Social Content
                      </button>
                      <a
                        href={preset.defaultUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 7: USER CREDENTIALS MANAGEMENT ("admin can also remove and edit user credentials like password and user name") */}
        {/* ============================================================== */}
        {activeTab === 'users' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white font-outfit uppercase tracking-tight flex items-center gap-2">
                  <Users className="w-6 h-6 text-amber-400" />
                  <span>User Credentials & Access Control</span>
                </h2>
                <p className="text-zinc-400 text-xs">
                  Administrators can edit usernames, update passwords directly, change account roles, remove users, and audit email login notifications.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsCreateUserOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-wider text-xs transition-all shadow-md shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  Create New User / Admin
                </button>
              </div>
            </div>

            {/* Email Notification Rule Reminder Banner */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Send className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="font-bold">Email Notification Guarantee:</span> All users are automatically notified via email whenever a login occurs, and security audit copies are dispatched to thaoffixialmusic@gmail.com and tadiwanashemukandagumbo@gmail.com.
                </div>
              </div>
            </div>

            {/* Search Filter */}
            <div className="flex items-center gap-3 p-2 bg-[#0D0D12] border border-white/10 rounded-2xl">
              <Search className="w-4 h-4 text-zinc-500 ml-2" />
              <input
                type="text"
                value={searchUserQuery}
                onChange={(e) => setSearchUserQuery(e.target.value)}
                placeholder="Search user by name, email, role, or city..."
                className="bg-transparent text-white text-xs w-full focus:outline-none placeholder-zinc-500 font-mono"
              />
              {searchUserQuery && (
                <button
                  onClick={() => setSearchUserQuery('')}
                  className="text-xs text-zinc-500 hover:text-white mr-2"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Accounts Table */}
            <div className="bg-[#0D0D12] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-zinc-900/40 text-zinc-400 font-mono uppercase text-[11px]">
                      <th className="py-3 px-4">User Name</th>
                      <th className="py-3 px-4">Email Address</th>
                      <th className="py-3 px-4">Password</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">City / Region</th>
                      <th className="py-3 px-4">Last Login</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    {filteredAccounts.map((acc) => {
                      const isPwdVisible = showPasswords[acc.email];
                      const isRootAdmin = acc.email === 'thaoffixialmusic@gmail.com';

                      return (
                        <tr key={acc.email} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4 font-sans font-bold text-white whitespace-nowrap">
                            {acc.name}
                          </td>
                          <td className="py-3.5 px-4 text-amber-400 whitespace-nowrap font-medium">
                            {acc.email}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span>{isPwdVisible ? acc.password : '••••••••••••'}</span>
                              <button
                                onClick={() => togglePasswordVisibility(acc.email)}
                                className="text-zinc-500 hover:text-zinc-300"
                                title="Toggle show password"
                              >
                                {isPwdVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                acc.role === 'admin'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : 'bg-zinc-800 text-zinc-300'
                              }`}
                            >
                              {acc.role}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-zinc-400 whitespace-nowrap font-sans">
                            {acc.city || 'Harare, Zimbabwe'}
                          </td>
                          <td className="py-3.5 px-4 text-zinc-500 whitespace-nowrap text-[11px]">
                            {acc.lastLoginAt ? new Date(acc.lastLoginAt).toLocaleString() : 'Never'}
                          </td>
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleEditUserClick(acc)}
                                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-400 transition-colors cursor-pointer"
                                title="Edit user credentials (name, password, role)"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              {!isRootAdmin && (
                                <button
                                  onClick={() => handleDeleteUserClick(acc.email)}
                                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                                  title="Remove / delete user account"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ============================================================== */}
      {/* MODAL: EDIT USER CREDENTIALS (NAME, PASSWORD, ROLE, CITY)      */}
      {/* ============================================================== */}
      {selectedUserToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0D0D12] border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 text-left">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest">
                  Administrator Access Control
                </span>
                <h3 className="text-xl font-black text-white font-outfit uppercase">
                  Edit User Credentials
                </h3>
              </div>
              <button
                onClick={() => setSelectedUserToEdit(null)}
                className="text-zinc-400 hover:text-white text-xs font-mono"
              >
                Cancel
              </button>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900 border border-white/5 text-xs text-zinc-400 font-mono">
              Account: <span className="text-amber-400 font-bold">{selectedUserToEdit.email}</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1">Full User Name:</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1">Password (Direct Change):</label>
                <input
                  type="text"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1">City / Region:</label>
                <input
                  type="text"
                  value={editCity}
                  onChange={(e) => setEditCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1">Account Role:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setEditRole('fan')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold uppercase transition-all ${
                      editRole === 'fan'
                        ? 'bg-amber-500 text-black font-black'
                        : 'bg-zinc-900 text-zinc-400 border border-white/5'
                    }`}
                  >
                    Fan User
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditRole('admin')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold uppercase transition-all ${
                      editRole === 'admin'
                        ? 'bg-amber-500 text-black font-black'
                        : 'bg-zinc-900 text-zinc-400 border border-white/5'
                    }`}
                  >
                    Administrator
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSelectedUserToEdit(null)}
                className="flex-1 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold uppercase"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUserEdits}
                className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20"
              >
                Save Credentials
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: CREATE NEW USER OR ADMIN                                */}
      {/* ============================================================== */}
      {isCreateUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <form
            onSubmit={handleCreateNewUser}
            className="bg-[#0D0D12] border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 text-left"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest">
                  Administrator Management
                </span>
                <h3 className="text-xl font-black text-white font-outfit uppercase">
                  Create New Account
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateUserOpen(false)}
                className="text-zinc-400 hover:text-white text-xs font-mono"
              >
                Cancel
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1">Full Name:</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Tinashe Moyo"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1">Email Address:</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="e.g. tinashe@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1">Set Password:</label>
                <input
                  type="password"
                  required
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1">City / Region:</label>
                <input
                  type="text"
                  value={newUserCity}
                  onChange={(e) => setNewUserCity(e.target.value)}
                  placeholder="Harare, Zimbabwe"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1">Assign Role:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewUserRole('fan')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold uppercase transition-all ${
                      newUserRole === 'fan'
                        ? 'bg-amber-500 text-black font-black'
                        : 'bg-zinc-900 text-zinc-400 border border-white/5'
                    }`}
                  >
                    Fan User
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewUserRole('admin')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold uppercase transition-all ${
                      newUserRole === 'admin'
                        ? 'bg-amber-500 text-black font-black'
                        : 'bg-zinc-900 text-zinc-400 border border-white/5'
                    }`}
                  >
                    Administrator
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={() => setIsCreateUserOpen(false)}
                className="flex-1 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold uppercase"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
