'use client';

import { Track, VideoItem, TRACKS, VIDEOS } from '@/config/artist';

export type PlatformType =
  | 'youtube'
  | 'spotify'
  | 'audiomack'
  | 'applemusic'
  | 'distrokid'
  | 'tunecore'
  | 'cdbaby'
  | 'amuse'
  | 'instagram'
  | 'tiktok'
  | 'twitter'
  | 'generic';

export interface ParsedUrlMetadata {
  platform: PlatformType;
  platformLabel: string;
  extractedId?: string;
  title: string;
  artist: string;
  featured: string;
  genre: string;
  thumbnail: string;
  embedUrl: string;
  canonicalUrl: string;
  category: string;
  streamBadge: string;
  isAudio: boolean;
  isVideo: boolean;
  isSocialOrDistro: boolean;
}

export interface DistributionSyncPreset {
  id: string;
  name: string;
  type: 'distribution' | 'social';
  icon: string;
  defaultUrl: string;
  description: string;
  badge: string;
}

export const DISTRIBUTION_PRESETS: DistributionSyncPreset[] = [
  {
    id: 'distrokid',
    name: 'DistroKid HyperFollow',
    type: 'distribution',
    icon: 'Radio',
    defaultUrl: 'https://distrokid.com/hyperfollow/lilethanthaoffixial/rudo',
    description: 'Auto-sync pre-saves, Spotify canvas, Apple Music and Amazon delivery across global DSPs.',
    badge: 'Worldwide DSP Distribution',
  },
  {
    id: 'tunecore',
    name: 'TuneCore Artist Portal',
    type: 'distribution',
    icon: 'Globe',
    defaultUrl: 'https://tunecore.com/artist/lilethanthaoffixial',
    description: 'Direct ingestion from TuneCore live releases, royalty metrics, and global playlist submissions.',
    badge: 'Direct Streaming Ingestion',
  },
  {
    id: 'cdbaby',
    name: 'CD Baby Global Distribution',
    type: 'distribution',
    icon: 'Disc',
    defaultUrl: 'https://cdbaby.com/cd/lilethanthaoffixial',
    description: 'Sync digital sales, YouTube Content ID monetized audio, and sync licensing catalogues.',
    badge: 'Sync & Publishing Ingest',
  },
  {
    id: 'amuse',
    name: 'Amuse Pro Distribution',
    type: 'distribution',
    icon: 'Music2',
    defaultUrl: 'https://amuse.io/artist/lilethan',
    description: 'Fast track single releases, TikTok sound generation, and Shazam recognition catalogue.',
    badge: 'Fast Release Pipeline',
  },
  {
    id: 'spotify_artists',
    name: 'Spotify for Artists Direct',
    type: 'distribution',
    icon: 'Activity',
    defaultUrl: 'https://artists.spotify.com/c/artist/0MgzzWrhDduimp33hAEKO3/profile',
    description: 'Real-time listener count sync, editorial playlist pitches, and Artist Pick updates.',
    badge: 'DSP Verified API',
  },
  {
    id: 'apple_artists',
    name: 'Apple Music for Artists',
    type: 'distribution',
    icon: 'Music',
    defaultUrl: 'https://artists.apple.com/a/artist/lilethanthaoffixial',
    description: 'Milestone tracking, Shazam city charts, and Spatial Audio release indicators.',
    badge: 'Spatial Audio DSP',
  },
  {
    id: 'audiomack_creator',
    name: 'Audiomack Creator Hub',
    type: 'distribution',
    icon: 'Radio',
    defaultUrl: 'https://audiomack.com/artist/lilethanthaoffixial',
    description: 'African stream velocity, trending badges, and supporter badges for ThaOffixial fan circle.',
    badge: 'African DSP Leader',
  },
  {
    id: 'instagram',
    name: 'Instagram Official (@lil_ethan_tha_official)',
    type: 'social',
    icon: 'Instagram',
    defaultUrl: 'https://www.instagram.com/lil_ethan_tha_official',
    description: 'Auto-ingest Reels, story teasers, behind-the-scenes studio sessions, and fan comments.',
    badge: 'Visual & Fan Community',
  },
  {
    id: 'tiktok',
    name: 'TikTok Viral Sound Hub',
    type: 'social',
    icon: 'Video',
    defaultUrl: 'https://www.tiktok.com/@lilethanthaoffixial',
    description: 'Track viral audio creations, duet challenges, and hashtag #LilEthanThaOffixial streams.',
    badge: 'Short-Form Sound Trends',
  },
  {
    id: 'twitter',
    name: 'X (Twitter) Official Channel',
    type: 'social',
    icon: 'Twitter',
    defaultUrl: 'https://x.com/ThaOffixial',
    description: 'Official press releases, live tour updates, and direct interaction with the African music scene.',
    badge: 'Live Announcements',
  },
];

const DYNAMIC_TRACKS_KEY = 'thaoffixial_dynamic_tracks';
const DYNAMIC_VIDEOS_KEY = 'thaoffixial_dynamic_videos';

/**
 * Intelligent URL Parser that detects URL codes from YouTube, Spotify, Audiomack, Apple Music,
 * Distribution Platforms (DistroKid, TuneCore, CD Baby, Amuse), and Social Media (Instagram, TikTok, X).
 */
export function parseUrlMetadata(inputUrl: string): ParsedUrlMetadata {
  const url = inputUrl.trim();
  const lowerUrl = url.toLowerCase();

  // 1. YOUTUBE URL Detection (Regular, Shorts, Embed)
  if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) {
    let videoId = 'ch4cMLQQRj4';
    if (lowerUrl.includes('youtu.be/')) {
      const parts = url.split('youtu.be/')[1];
      videoId = parts ? parts.split('?')[0] : 'ch4cMLQQRj4';
    } else if (lowerUrl.includes('/shorts/')) {
      const parts = url.split('/shorts/')[1];
      videoId = parts ? parts.split('?')[0] : 'ch4cMLQQRj4';
    } else if (lowerUrl.includes('v=')) {
      const parts = url.split('v=')[1];
      videoId = parts ? parts.split('&')[0] : 'ch4cMLQQRj4';
    }

    const isShort = lowerUrl.includes('/shorts/');

    return {
      platform: 'youtube',
      platformLabel: isShort ? 'YouTube Shorts' : 'YouTube Official',
      extractedId: videoId,
      title: isShort
        ? `LilEthanThaOffixial — Viral Short (${videoId.substring(0, 6)})`
        : `LilEthanThaOffixial — Official Music Visual (${videoId.substring(0, 6)})`,
      artist: 'LilEthanThaOffixial',
      featured: 'ThaOffixialMusic Flagship',
      genre: 'Official Video / Visualizer',
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      canonicalUrl: url,
      category: isShort ? 'Viral YouTube Short' : 'Official Visualizer',
      streamBadge: 'YouTube 4K HD',
      isAudio: true,
      isVideo: true,
      isSocialOrDistro: false,
    };
  }

  // 2. SPOTIFY URL Detection
  if (lowerUrl.includes('spotify.com')) {
    let trackId = '0MgzzWrhDduimp33hAEKO3';
    if (lowerUrl.includes('/track/')) {
      trackId = url.split('/track/')[1].split('?')[0];
    } else if (lowerUrl.includes('/album/')) {
      trackId = url.split('/album/')[1].split('?')[0];
    }

    const isArtist = lowerUrl.includes('artists.spotify.com') || lowerUrl.includes('/artist/');

    return {
      platform: 'spotify',
      platformLabel: isArtist ? 'Spotify for Artists' : 'Spotify Music',
      extractedId: trackId,
      title: isArtist ? 'LilEthanThaOffixial — Verified Spotify Catalog' : 'LilEthanThaOffixial — Spotify DSP Release',
      artist: 'LilEthanThaOffixial',
      featured: 'ThaOffixialMusic Official',
      genre: 'Afrobeats / R&B Single',
      thumbnail: '/assets/aistudio/Screenshot_2026-10-25_230800_b04248de.png',
      embedUrl: `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`,
      canonicalUrl: url,
      category: 'Spotify Global Stream',
      streamBadge: 'Spotify Verified',
      isAudio: true,
      isVideo: false,
      isSocialOrDistro: isArtist,
    };
  }

  // 3. AUDIOMACK URL Detection
  if (lowerUrl.includes('audiomack.com')) {
    const slug = url.split('/').filter(Boolean).pop() || 'rudo';
    const cleanTitle = slug.replace(/[-_]/g, ' ').toUpperCase();

    return {
      platform: 'audiomack',
      platformLabel: 'Audiomack Music',
      extractedId: slug,
      title: `LilEthanThaOffixial — ${cleanTitle || 'Exclusive DSP Drop'}`,
      artist: 'LilEthanThaOffixial',
      featured: 'Official DSP Distribution',
      genre: 'Afro-Trap / Soul Hit',
      thumbnail: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_00.48.10_c299ed54.jpeg',
      embedUrl: url,
      canonicalUrl: url,
      category: 'Audiomack Top Drop',
      streamBadge: 'Audiomack Trending',
      isAudio: true,
      isVideo: false,
      isSocialOrDistro: false,
    };
  }

  // 4. APPLE MUSIC URL Detection
  if (lowerUrl.includes('apple.com') || lowerUrl.includes('music.apple.com')) {
    return {
      platform: 'applemusic',
      platformLabel: 'Apple Music',
      title: 'LilEthanThaOffixial — Apple Music Master Release',
      artist: 'LilEthanThaOffixial',
      featured: 'Mastered for Apple Music',
      genre: 'Melodic R&B / Afro-Fusion',
      thumbnail: '/assets/aistudio/Screenshot_2026-10-25_230948_af26f812.png',
      embedUrl: url,
      canonicalUrl: url,
      category: 'Apple Music Hit',
      streamBadge: 'Apple Digital Master',
      isAudio: true,
      isVideo: false,
      isSocialOrDistro: false,
    };
  }

  // 5. DISTROKID / HYPERFOLLOW Detection
  if (lowerUrl.includes('distrokid.com') || lowerUrl.includes('hyperfollow.com')) {
    return {
      platform: 'distrokid',
      platformLabel: 'DistroKid HyperFollow',
      title: 'LilEthanThaOffixial — Worldwide HyperFollow Pre-Save',
      artist: 'LilEthanThaOffixial',
      featured: 'Global DSP Launch via DistroKid',
      genre: 'All-Platform Pre-Save & Direct Stream',
      thumbnail: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_00.48.10_c299ed54.jpeg',
      embedUrl: url,
      canonicalUrl: url,
      category: 'Distribution Pre-Save',
      streamBadge: 'DistroKid Verified',
      isAudio: true,
      isVideo: false,
      isSocialOrDistro: true,
    };
  }

  // 6. TUNECORE Detection
  if (lowerUrl.includes('tunecore.com')) {
    return {
      platform: 'tunecore',
      platformLabel: 'TuneCore Distribution',
      title: 'LilEthanThaOffixial — TuneCore Direct Catalog Ingest',
      artist: 'LilEthanThaOffixial',
      featured: 'Digital Stores Ingest',
      genre: 'Afrobeats / Global Trap',
      thumbnail: '/assets/aistudio/Screenshot_2026-10-25_230800_b04248de.png',
      embedUrl: url,
      canonicalUrl: url,
      category: 'TuneCore Master',
      streamBadge: 'TuneCore Direct',
      isAudio: true,
      isVideo: false,
      isSocialOrDistro: true,
    };
  }

  // 7. CD BABY Detection
  if (lowerUrl.includes('cdbaby.com')) {
    return {
      platform: 'cdbaby',
      platformLabel: 'CD Baby Digital',
      title: 'LilEthanThaOffixial — CD Baby Sync & Publishing Ingest',
      artist: 'LilEthanThaOffixial',
      featured: 'ThaOffixialMusic Publishing',
      genre: 'Afrobeats / Contemporary',
      thumbnail: '/assets/aistudio/Screenshot_2026-10-25_230948_af26f812.png',
      embedUrl: url,
      canonicalUrl: url,
      category: 'Publishing & Sync Ingest',
      streamBadge: 'CD Baby Sync',
      isAudio: true,
      isVideo: false,
      isSocialOrDistro: true,
    };
  }

  // 8. AMUSE Detection
  if (lowerUrl.includes('amuse.io')) {
    return {
      platform: 'amuse',
      platformLabel: 'Amuse Pro Distribution',
      title: 'LilEthanThaOffixial — Amuse Pro Fast-Track Release',
      artist: 'LilEthanThaOffixial',
      featured: 'Licensed to ThaOffixialMusic',
      genre: 'Modern Afrobeats',
      thumbnail: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_00.48.10_c299ed54.jpeg',
      embedUrl: url,
      canonicalUrl: url,
      category: 'Amuse Pro Drop',
      streamBadge: 'Amuse Pro Pipeline',
      isAudio: true,
      isVideo: false,
      isSocialOrDistro: true,
    };
  }

  // 9. INSTAGRAM Detection
  if (lowerUrl.includes('instagram.com')) {
    return {
      platform: 'instagram',
      platformLabel: 'Instagram Reel / Clip',
      title: 'LilEthanThaOffixial — Instagram Studio Exclusive',
      artist: 'LilEthanThaOffixial',
      featured: '@lil_ethan_tha_official',
      genre: 'Studio Footage / Behind The Scenes',
      thumbnail: '/assets/aistudio/Screenshot_2026-10-25_230822_af17c83e.png',
      embedUrl: url,
      canonicalUrl: url,
      category: 'Instagram Reel Feed',
      streamBadge: 'Instagram Official',
      isAudio: false,
      isVideo: true,
      isSocialOrDistro: true,
    };
  }

  // 10. TIKTOK Detection
  if (lowerUrl.includes('tiktok.com')) {
    return {
      platform: 'tiktok',
      platformLabel: 'TikTok Viral Sound',
      title: 'LilEthanThaOffixial — TikTok Trending Audio',
      artist: 'LilEthanThaOffixial',
      featured: '@lilethanthaoffixial',
      genre: 'Short-Form Sound Drop',
      thumbnail: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_00.48.10_c299ed54.jpeg',
      embedUrl: url,
      canonicalUrl: url,
      category: 'TikTok Sound Track',
      streamBadge: 'Viral TikTok Sound',
      isAudio: true,
      isVideo: true,
      isSocialOrDistro: true,
    };
  }

  // 11. X / TWITTER Detection
  if (lowerUrl.includes('x.com') || lowerUrl.includes('twitter.com')) {
    return {
      platform: 'twitter',
      platformLabel: 'X (Twitter) Update',
      title: 'LilEthanThaOffixial — Official Announcement & Drop',
      artist: 'LilEthanThaOffixial',
      featured: 'ThaOffixial Press Desk',
      genre: 'Official Release Tweet',
      thumbnail: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_00.48.10_c299ed54.jpeg',
      embedUrl: url,
      canonicalUrl: url,
      category: 'Official Social Announcement',
      streamBadge: 'X Verified Feed',
      isAudio: false,
      isVideo: false,
      isSocialOrDistro: true,
    };
  }

  // Generic fallback
  return {
    platform: 'generic',
    platformLabel: 'Direct Media Link',
    title: 'LilEthanThaOffixial — Custom Distribution Release',
    artist: 'LilEthanThaOffixial',
    featured: 'ThaOffixialMusic',
    genre: 'Afrobeats / Trap',
    thumbnail: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_00.48.10_c299ed54.jpeg',
    embedUrl: url,
    canonicalUrl: url,
    category: 'Custom Direct Media Item',
    streamBadge: 'Live Web Catalog',
    isAudio: true,
    isVideo: false,
    isSocialOrDistro: false,
  };
}

export function getStoredTracks(): Track[] {
  if (typeof window === 'undefined') return TRACKS;

  try {
    const raw = localStorage.getItem(DYNAMIC_TRACKS_KEY);
    if (raw) {
      const customTracks: Track[] = JSON.parse(raw);
      const mergedMap = new Map<string, Track>();
      TRACKS.forEach((t) => mergedMap.set(t.id, t));
      customTracks.forEach((t) => mergedMap.set(t.id, t));
      return Array.from(mergedMap.values());
    }
  } catch (err) {
    console.error('Failed to load dynamic tracks', err);
  }
  return TRACKS;
}

export function getStoredVideos(): VideoItem[] {
  if (typeof window === 'undefined') return VIDEOS;

  try {
    const raw = localStorage.getItem(DYNAMIC_VIDEOS_KEY);
    if (raw) {
      const customVideos: VideoItem[] = JSON.parse(raw);
      const mergedMap = new Map<string, VideoItem>();
      VIDEOS.forEach((v) => mergedMap.set(v.id, v));
      customVideos.forEach((v) => mergedMap.set(v.id, v));
      return Array.from(mergedMap.values());
    }
  } catch (err) {
    console.error('Failed to load dynamic videos', err);
  }
  return VIDEOS;
}

export function addDynamicTrack(track: Track): Track[] {
  const current = getStoredTracks();
  const updated = [track, ...current.filter((t) => t.id !== track.id)];
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(DYNAMIC_TRACKS_KEY, JSON.stringify(updated));
    }
  } catch (err) {
    console.error('Failed to save dynamic track', err);
  }
  return updated;
}

export function addDynamicVideo(video: VideoItem): VideoItem[] {
  const current = getStoredVideos();
  const updated = [video, ...current.filter((v) => v.id !== video.id)];
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(DYNAMIC_VIDEOS_KEY, JSON.stringify(updated));
    }
  } catch (err) {
    console.error('Failed to save dynamic video', err);
  }
  return updated;
}

export function removeDynamicTrack(id: string): Track[] {
  const current = getStoredTracks();
  const updated = current.filter((t) => t.id !== id);
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(DYNAMIC_TRACKS_KEY, JSON.stringify(updated));
    }
  } catch (err) {
    console.error('Failed to remove track', err);
  }
  return updated;
}

export function removeDynamicVideo(id: string): VideoItem[] {
  const current = getStoredVideos();
  const updated = current.filter((v) => v.id !== id);
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(DYNAMIC_VIDEOS_KEY, JSON.stringify(updated));
    }
  } catch (err) {
    console.error('Failed to remove video', err);
  }
  return updated;
}
