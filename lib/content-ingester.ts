'use client';

import { Track, VideoItem, TRACKS, VIDEOS } from '@/config/artist';

export interface ParsedUrlMetadata {
  platform: 'youtube' | 'spotify' | 'audiomack' | 'applemusic' | 'instagram' | 'tiktok' | 'generic';
  extractedId?: string;
  title: string;
  artist: string;
  featured: string;
  genre: string;
  thumbnail: string;
  embedUrl: string;
  canonicalUrl: string;
  category: string;
}

const DYNAMIC_TRACKS_KEY = 'thaoffixial_dynamic_tracks';
const DYNAMIC_VIDEOS_KEY = 'thaoffixial_dynamic_videos';

/**
 * Intelligent URL Parser that detects URL codes from YouTube, Spotify, Audiomack, Apple Music, and Social Media
 */
export function parseUrlMetadata(inputUrl: string): ParsedUrlMetadata {
  const url = inputUrl.trim();

  // 1. YOUTUBE URL Detection
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId = 'ch4cMLQQRj4';
    if (url.includes('youtu.be/')) {
      const parts = url.split('youtu.be/')[1];
      videoId = parts ? parts.split('?')[0] : 'ch4cMLQQRj4';
    } else if (url.includes('v=')) {
      const parts = url.split('v=')[1];
      videoId = parts ? parts.split('&')[0] : 'ch4cMLQQRj4';
    }

    return {
      platform: 'youtube',
      extractedId: videoId,
      title: `LilEthanThaOffixial — Music Visual (${videoId.substring(0, 6)})`,
      artist: 'LilEthanThaOffixial',
      featured: 'ThaOffixialMusic Official',
      genre: 'Official Video / Visualizer',
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      canonicalUrl: url,
      category: 'Official Music Video',
    };
  }

  // 2. SPOTIFY URL Detection
  if (url.includes('spotify.com')) {
    let trackId = '0MgzzWrhDduimp33hAEKO3';
    if (url.includes('/track/')) {
      trackId = url.split('/track/')[1].split('?')[0];
    }

    return {
      platform: 'spotify',
      extractedId: trackId,
      title: 'LilEthanThaOffixial — Fresh Spotify Release',
      artist: 'LilEthanThaOffixial',
      featured: 'ThaOffixialMusic Flagship',
      genre: 'Afrobeats / R&B Single',
      thumbnail: '/assets/aistudio/Screenshot_2026-10-25_230800_b04248de.png',
      embedUrl: `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`,
      canonicalUrl: url,
      category: 'Spotify Stream Hit',
    };
  }

  // 3. AUDIOMACK URL Detection
  if (url.includes('audiomack.com')) {
    return {
      platform: 'audiomack',
      title: 'LilEthanThaOffixial — Audiomack Exclusive Drop',
      artist: 'LilEthanThaOffixial',
      featured: 'Official DSP Distribution',
      genre: 'Afro-Trap Hit',
      thumbnail: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_00.48.10_c299ed54.jpeg',
      embedUrl: url,
      canonicalUrl: url,
      category: 'Audiomack Stream',
    };
  }

  // 4. APPLE MUSIC URL Detection
  if (url.includes('apple.com') || url.includes('music.apple.com')) {
    return {
      platform: 'applemusic',
      title: 'LilEthanThaOffixial — Apple Music Catalog Item',
      artist: 'LilEthanThaOffixial',
      featured: 'Official Release',
      genre: 'Melodic R&B',
      thumbnail: '/assets/aistudio/Screenshot_2026-10-25_230948_af26f812.png',
      embedUrl: url,
      canonicalUrl: url,
      category: 'Apple Music Hit',
    };
  }

  // 5. INSTAGRAM / TIKTOK / SOCIAL MEDIA Detection
  if (url.includes('instagram.com') || url.includes('tiktok.com')) {
    const platform = url.includes('instagram.com') ? 'instagram' : 'tiktok';
    return {
      platform,
      title: `LilEthanThaOffixial — ${platform === 'instagram' ? 'Instagram Clip' : 'TikTok Viral Sound'}`,
      artist: 'LilEthanThaOffixial',
      featured: '@lil_ethan_tha_official',
      genre: 'Social Media Feature',
      thumbnail: '/assets/aistudio/Screenshot_2026-10-25_230822_af17c83e.png',
      embedUrl: url,
      canonicalUrl: url,
      category: 'Social Vault Clip',
    };
  }

  // Generic fallback
  return {
    platform: 'generic',
    title: 'LilEthanThaOffixial — Custom Distribution Release',
    artist: 'LilEthanThaOffixial',
    featured: 'ThaOffixialMusic',
    genre: 'Afrobeats / Trap',
    thumbnail: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_00.48.10_c299ed54.jpeg',
    embedUrl: url,
    canonicalUrl: url,
    category: 'Custom URL Item',
  };
}

export function getStoredTracks(): Track[] {
  if (typeof window === 'undefined') return TRACKS;

  try {
    const raw = localStorage.getItem(DYNAMIC_TRACKS_KEY);
    if (raw) {
      const customTracks: Track[] = JSON.parse(raw);
      // Combine seeded tracks with custom tracks, avoiding duplicates
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
  const updated = [track, ...current];
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
  const updated = [video, ...current];
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
