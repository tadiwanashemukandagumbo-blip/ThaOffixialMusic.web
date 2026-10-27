export interface Track {
  id: string;
  title: string;
  featured: string;
  genre: string;
  releaseDate: string;
  duration: string;
  streams: string;
  coverImage: string;
  previewUrl?: string;
  links: {
    spotify: string;
    appleMusic: string;
    audiomack: string;
    youtubeMusic: string;
    youtube: string;
  };
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
  duration: string;
  releaseDate: string;
  views: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Portrait' | 'Live' | 'Studio' | 'BTS';
  image: string;
  span?: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface Shoutout {
  id: string;
  name: string;
  location: string;
  song: string;
  message: string;
  timeAgo: string;
  likes: number;
}

export const ARTIST_CONFIG = {
  name: "LilEthanThaOffixial",
  realName: "Austin Mtomba",
  genre: "Afrobeats • R&B • Trap",
  origin: "Zvishavane & Harare, Zimbabwe",
  tagline: "FROM AFRICA TO THE WORLD.",
  youtubeChannelId: "UCis0NzN0qBmTuFoXojUb8VQ",
  youtubeChannelUrl: "https://www.youtube.com/channel/UCis0NzN0qBmTuFoXojUb8VQ",
  spotifyArtistUrl: "https://open.spotify.com/artist/0MgzzWrhDduimp33hAEKO3?si=NNoZyA2iS12DwOq33C8PQA",
  spotifyEmbedUrl: "https://open.spotify.com/embed/artist/0MgzzWrhDduimp33hAEKO3?utm_source=generator&theme=0",
  appleMusicArtistUrl: "https://music.apple.com/us/artist/lilethanthaoffixial/1865291994",
  stats: {
    youtubeStreams: "5,000+",
    youtubeLabel: "YouTube & DSP Streams",
    spotifyMonthly: "Spotify • Apple",
    spotifyLabel: "Active Distribution",
    youtubeHandle: "@LilEthan",
    youtubeHandleLabel: "YouTube Official",
    hometown: "Zvishavane",
    hometownLabel: "Hometown Roots",
    appleMusicStreams: "Official Catalog",
    audiomackStreams: "6,500+ Plays",
    instagramFollowers: "12.8K Followers",
    totalCommunity: "38,000+ Fans",
    monthlyListenersDetail: "Active streaming data on Spotify (ID: 0MgzzWrhDduimp33hAEKO3) & Apple Music (ID: 1865291994)",
  },
  bioShort: "Austin Mtomba, known professionally as LilEthanThaOffixial, is an authentic Afrobeats, RnB, and Trap artist hailing from Zvishavane and Harare, Zimbabwe.",
  bioFull: "Austin Mtomba, known professionally as LilEthanThaOffixial, is an authentic Afrobeats, RnB, and Trap artist hailing from Zvishavane and Harare, Zimbabwe. Releasing under his flagship imprint ThaOffixialMusic, LilEthan has rapidly built an engaged audience across YouTube (@LilEthanThaOffixial), Spotify, Apple Music, and Audiomack with acclaimed drops including 'RUDO' (produced by Loui27s / Law Keyz), 'Hold You' (featuring Arcade X & Stunt Master), 'Emotional Feeling', and 'Wangu Moyo' (featuring Yvng B). Fusing emotive African songwriting with crisp trap rhythms, LilEthan chronicles loyalty, love, ambition, and youth reality in southern Africa. For professional bookings, synchronization, and features, contact artist management Mr Arts (thaoffixialmusic@gmail.com).",
  images: {
    hero: "/assets/aistudio/WhatsApp_Image_2026-10-28_at_00.48.10_c299ed54.jpeg",
    aboutStudio: "/assets/aistudio/Screenshot_2026-10-25_230722_d2343140.png",
    rudoCover: "/assets/aistudio/Screenshot_2026-10-25_230800_b04248de.png",
    sunsetGoldenHour: "/assets/aistudio/Screenshot_2026-10-25_230822_af17c83e.png",
    poolsideBreak: "/assets/aistudio/Screenshot_2026-10-25_230722_d2343140.png",
    spotifyPoster: "/assets/aistudio/Screenshot_2026-10-25_230948_af26f812.png",
    rudoVisualiser: "/assets/aistudio/Screenshot_2026-10-26_004855_0c4fa999.png",
  },
  socials: {
    spotify: "https://open.spotify.com/artist/0MgzzWrhDduimp33hAEKO3?si=NNoZyA2iS12DwOq33C8PQA",
    appleMusic: "https://music.apple.com/us/artist/lilethanthaoffixial/1865291994",
    instagram: "https://www.instagram.com/lil_ethan_tha_official?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw==",
    youtube: "https://www.youtube.com/channel/UCis0NzN0qBmTuFoXojUb8VQ",
    tiktok: "https://tiktok.com",
    twitter: "https://twitter.com",
    audiomack: "https://audiomack.com/lilethanthaoffixial",
  },
  management: "Mr Arts",
  managementEmail: "thaoffixialmusic@gmail.com",
  managementDesk: "Official Management & Booking Desk (Secure Portal)",
  imprint: "ThaOffixialMusic",
};

export const TRACKS: Track[] = [
  {
    id: "rudo",
    title: "Rudo",
    featured: "Loui27s / Law Keyz de mentor",
    genre: "Afro-fusion Single",
    releaseDate: "2026",
    duration: "2:02",
    streams: "Top Single",
    coverImage: "/assets/aistudio/Screenshot_2026-10-25_230800_b04248de.png",
    links: {
      spotify: "https://open.spotify.com/artist/0MgzzWrhDduimp33hAEKO3?si=NNoZyA2iS12DwOq33C8PQA",
      appleMusic: "https://music.apple.com/us/artist/lilethanthaoffixial/1865291994",
      audiomack: "https://audiomack.com/lilethanthaoffixial",
      youtubeMusic: "https://music.youtube.com",
      youtube: "https://www.youtube.com/channel/UCis0NzN0qBmTuFoXojUb8VQ",
    }
  },
  {
    id: "hold-you",
    title: "Hold You",
    featured: "Arcade X & Stunt Master",
    genre: "R&B / Afrobeats",
    releaseDate: "2026",
    duration: "3:24",
    streams: "Streaming Now",
    coverImage: "/assets/aistudio/Screenshot_2026-10-25_230948_af26f812.png",
    links: {
      spotify: "https://open.spotify.com/artist/0MgzzWrhDduimp33hAEKO3?si=NNoZyA2iS12DwOq33C8PQA",
      appleMusic: "https://music.apple.com/us/artist/lilethanthaoffixial/1865291994",
      audiomack: "https://audiomack.com/lilethanthaoffixial",
      youtubeMusic: "https://music.youtube.com",
      youtube: "https://www.youtube.com/channel/UCis0NzN0qBmTuFoXojUb8VQ",
    }
  },
  {
    id: "kumbofara",
    title: "Kumbofara",
    featured: "CB3zw & Stunt Master",
    genre: "Afro-Trap Hit",
    releaseDate: "2025",
    duration: "3:40",
    streams: "Top Track",
    coverImage: "/assets/aistudio/Screenshot_2026-10-25_230902_352307e5.png",
    links: {
      spotify: "https://open.spotify.com/artist/0MgzzWrhDduimp33hAEKO3?si=NNoZyA2iS12DwOq33C8PQA",
      appleMusic: "https://music.apple.com/us/artist/lilethanthaoffixial/1865291994",
      audiomack: "https://audiomack.com/lilethanthaoffixial",
      youtubeMusic: "https://music.youtube.com",
      youtube: "https://www.youtube.com/channel/UCis0NzN0qBmTuFoXojUb8VQ",
    }
  },
  {
    id: "emotional-feeling",
    title: "Emotional_Feeling",
    featured: "Solo",
    genre: "Melodic R&B",
    releaseDate: "2025",
    duration: "3:12",
    streams: "Fan Favorite",
    coverImage: "/assets/aistudio/Screenshot_2026-10-25_230722_d2343140.png",
    links: {
      spotify: "https://open.spotify.com/artist/0MgzzWrhDduimp33hAEKO3?si=NNoZyA2iS12DwOq33C8PQA",
      appleMusic: "https://music.apple.com/us/artist/lilethanthaoffixial/1865291994",
      audiomack: "https://audiomack.com/lilethanthaoffixial",
      youtubeMusic: "https://music.youtube.com",
      youtube: "https://www.youtube.com/channel/UCis0NzN0qBmTuFoXojUb8VQ",
    }
  },
  {
    id: "wangu-moyo",
    title: "Wangu Moyo",
    featured: "Yvng B",
    genre: "Soulful Afrobeats",
    releaseDate: "2026",
    duration: "3:18",
    streams: "Fresh Drop",
    coverImage: "/assets/aistudio/Screenshot_2026-10-25_230822_af17c83e.png",
    links: {
      spotify: "https://open.spotify.com/artist/0MgzzWrhDduimp33hAEKO3?si=NNoZyA2iS12DwOq33C8PQA",
      appleMusic: "https://music.apple.com/us/artist/lilethanthaoffixial/1865291994",
      audiomack: "https://audiomack.com/lilethanthaoffixial",
      youtubeMusic: "https://music.youtube.com",
      youtube: "https://www.youtube.com/channel/UCis0NzN0qBmTuFoXojUb8VQ",
    }
  }
];

export const VIDEOS: VideoItem[] = [
  {
    id: "v-hold-you",
    title: "LilEthanThaOffixial - Hold You (feat. Arcade X & Stunt Master)",
    category: "Official Music Video",
    description: "Official music video featuring LilEthanThaOffixial alongside Arcade X & Stunt Master. Exclusively streamed from the official channel.",
    youtubeId: "ch4cMLQQRj4",
    thumbnail: "/assets/aistudio/Screenshot_2026-10-25_230948_af26f812.png",
    duration: "3:24",
    releaseDate: "Official Release",
    views: "Official YouTube Video"
  },
  {
    id: "v-rudo",
    title: "LilEthanThaOffixial - _Rudo_(OFFIXIAL_VISUALISER )",
    category: "Official Visualiser",
    description: "The official visualizer for ' _Rudo_ ' by LilEthanThaOffixial (Produced by Loui27s / Law Keyz de mentor) from official channel UCis0NzN0qBmTuFoXojUb8VQ.",
    youtubeId: "He7qh9v6peU",
    thumbnail: "/assets/aistudio/Screenshot_2026-10-26_004855_0c4fa999.png",
    duration: "2:02",
    releaseDate: "11 months ago",
    views: "1.3K+ Views"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "“RUDO” — Official Single Release",
    category: "Live",
    image: "/assets/aistudio/Screenshot_2026-10-25_230800_b04248de.png",
    span: "col-span-1 md:col-span-2 row-span-2"
  },
  {
    id: "g2",
    title: "Golden Hour · Zvishavane",
    category: "Studio",
    image: "/assets/aistudio/Screenshot_2026-10-25_230822_af17c83e.png",
    span: "col-span-1 row-span-1"
  },
  {
    id: "g3",
    title: "Downtime & Studio Break",
    category: "BTS",
    image: "/assets/aistudio/Screenshot_2026-10-25_230722_d2343140.png",
    span: "col-span-1 row-span-1"
  },
  {
    id: "g4",
    title: "ThaOffixial Poster Archive",
    category: "Portrait",
    image: "/assets/aistudio/Screenshot_2026-10-25_230948_af26f812.png",
    span: "col-span-1 md:col-span-2 row-span-1"
  },
  {
    id: "g5",
    title: "LilEthanThaOffixial — Official Outdoor Portrait",
    category: "Portrait",
    image: "/assets/aistudio/WhatsApp_Image_2026-10-28_at_00.48.10_c299ed54.jpeg",
    span: "col-span-1 row-span-1"
  }
];

export const INITIAL_SHOUTOUTS: Shoutout[] = [
  {
    id: "s1",
    name: "Kudakwashe R.",
    location: "Zvishavane, Zimbabwe",
    song: "RUDO",
    message: "Watched the Rudo visualizer on YouTube (UCis0NzN0qBmTuFoXojUb8VQ). Beautiful scenes of Harare and clean production from Loui27s!",
    timeAgo: "1 hour ago",
    likes: 74
  },
  {
    id: "s2",
    name: "Sharon N.",
    location: "Harare",
    song: "Hold You",
    message: "Hold You with Arcade X and Stunt Master is fire! Subscribed to the official YouTube channel immediately.",
    timeAgo: "3 hours ago",
    likes: 52
  },
  {
    id: "s3",
    name: "David T.",
    location: "Johannesburg, SA",
    song: "Emotional Feeling",
    message: "Afrobeats, RnB, and Trap from Africa! Proud to see Austin Mtomba putting Zvish and Zim on the global map.",
    timeAgo: "1 day ago",
    likes: 93
  }
];
