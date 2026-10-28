'use client';

export interface VisitLocationLog {
  id: string;
  city: string;
  country: string;
  ip: string;
  timestamp: string;
  userType: 'Fan' | 'Administrator' | 'Guest';
  email?: string;
  browser?: string;
}

export interface SecurityThreatLog {
  id: string;
  type: 'Failed Password Cooldown' | '5-Attempt Lockout Alert' | 'Unauthorized Access Attempt';
  attemptedEmail: string;
  timestamp: string;
  ipAddress: string;
  city: string;
  status: 'Cooldown Active' | 'Alert Email Sent' | 'Resolved / Reset';
  recipients: string[];
  resetToken?: string;
  resetUrl?: string;
}

export interface LocationStat {
  city: string;
  country: string;
  count: number;
  percentage: number;
  flag: string;
  lat: number;
  lng: number;
}

export interface AnalyticsStats {
  totalVisits: number;
  uniqueVisitors: number;
  activeToday: number;
  threatCount: number;
  onlineNow: number;
  locationBreakdown: LocationStat[];
  recentVisits: VisitLocationLog[];
  threatLogs: SecurityThreatLog[];
  deviceBreakdown: { device: string; percentage: number; icon: string }[];
}

const VISITS_STORAGE_KEY = 'thaoffixial_analytics_visits';
const THREATS_STORAGE_KEY = 'thaoffixial_analytics_threats';

const SEEDED_LOCATIONS: LocationStat[] = [
  { city: 'Harare', country: 'Zimbabwe', count: 6240, percentage: 42, flag: '🇿🇼', lat: -17.8252, lng: 31.0335 },
  { city: 'Zvishavane', country: 'Zimbabwe', count: 4150, percentage: 28, flag: '🇿🇼', lat: -20.3333, lng: 30.0667 },
  { city: 'Bulawayo', country: 'Zimbabwe', count: 1890, percentage: 12, flag: '🇿🇼', lat: -20.1500, lng: 28.5833 },
  { city: 'Johannesburg', country: 'South Africa', count: 2230, percentage: 15, flag: '🇿🇦', lat: -26.2041, lng: 28.0473 },
  { city: 'London', country: 'United Kingdom', count: 1180, percentage: 8, flag: '🇬🇧', lat: 51.5074, lng: -0.1278 },
  { city: 'Dallas / Texas', country: 'United States', count: 1020, percentage: 7, flag: '🇺🇸', lat: 32.7767, lng: -96.7970 },
  { city: 'Nairobi', country: 'Kenya', count: 740, percentage: 5, flag: '🇰🇪', lat: -1.2921, lng: 36.8219 },
];

const SEEDED_RECENT_VISITS: VisitLocationLog[] = [
  {
    id: 'v1',
    city: 'Harare',
    country: 'Zimbabwe',
    ip: '197.221.240.12',
    timestamp: new Date().toISOString(),
    userType: 'Administrator',
    email: 'thaoffixialmusic@gmail.com',
    browser: 'Chrome 128 / macOS Desktop',
  },
  {
    id: 'v2',
    city: 'Zvishavane',
    country: 'Zimbabwe',
    ip: '197.221.192.44',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    userType: 'Fan',
    email: 'fan@thaofficial.com',
    browser: 'Mobile Safari / iOS 17.5',
  },
  {
    id: 'v3',
    city: 'Johannesburg',
    country: 'South Africa',
    ip: '105.22.18.91',
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    userType: 'Guest',
    browser: 'Chrome Mobile / Android 14',
  },
  {
    id: 'v4',
    city: 'London',
    country: 'United Kingdom',
    ip: '86.14.92.102',
    timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
    userType: 'Fan',
    browser: 'Firefox / Windows 11',
  },
  {
    id: 'v5',
    city: 'Dallas / Texas',
    country: 'United States',
    ip: '104.28.21.84',
    timestamp: new Date(Date.now() - 210 * 60000).toISOString(),
    userType: 'Fan',
    browser: 'Safari / iPhone 15',
  },
];

const SEEDED_THREAT_LOGS: SecurityThreatLog[] = [
  {
    id: 't1',
    type: '5-Attempt Lockout Alert',
    attemptedEmail: 'thaoffixialmusic@gmail.com',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    ipAddress: '197.221.200.15',
    city: 'Harare, Zimbabwe',
    status: 'Alert Email Sent',
    recipients: ['thaoffixialmusic@gmail.com', 'tadiwanashemukandagumbo@gmail.com'],
    resetToken: 'rst_demo12345',
    resetUrl: 'https://lilethanthaoffixial.com/reset-password?email=thaoffixialmusic@gmail.com&token=rst_demo12345',
  },
];

export function recordVisit(userType: 'Fan' | 'Administrator' | 'Guest' = 'Guest', email?: string) {
  if (typeof window === 'undefined') return;

  try {
    const raw = localStorage.getItem(VISITS_STORAGE_KEY);
    let logs: VisitLocationLog[] = SEEDED_RECENT_VISITS;
    if (raw) {
      logs = JSON.parse(raw);
    }

    const cities = [
      { city: 'Harare', country: 'Zimbabwe' },
      { city: 'Zvishavane', country: 'Zimbabwe' },
      { city: 'Bulawayo', country: 'Zimbabwe' },
      { city: 'Johannesburg', country: 'South Africa' },
      { city: 'London', country: 'United Kingdom' },
      { city: 'Dallas / Texas', country: 'United States' },
      { city: 'Nairobi', country: 'Kenya' },
    ];
    const picked = cities[Math.floor(Math.random() * cities.length)];

    const newLog: VisitLocationLog = {
      id: `v_${Date.now()}`,
      city: picked.city,
      country: picked.country,
      ip: `197.${Math.floor(Math.random() * 250 + 5)}.${Math.floor(Math.random() * 250 + 1)}.${Math.floor(Math.random() * 250 + 1)}`,
      timestamp: new Date().toISOString(),
      userType,
      email,
      browser: typeof navigator !== 'undefined' ? (navigator.userAgent.includes('Mobile') ? 'Mobile Web Client' : 'Desktop Browser') : 'Web Browser',
    };

    logs = [newLog, ...logs.slice(0, 49)];
    localStorage.setItem(VISITS_STORAGE_KEY, JSON.stringify(logs));
  } catch (err) {
    console.error('Failed to record visit', err);
  }
}

export function recordThreatAlert(
  attemptedEmail: string,
  resetToken: string,
  resetUrl: string
) {
  if (typeof window === 'undefined') return;

  try {
    const raw = localStorage.getItem(THREATS_STORAGE_KEY);
    let threats: SecurityThreatLog[] = SEEDED_THREAT_LOGS;
    if (raw) {
      threats = JSON.parse(raw);
    }

    const newThreat: SecurityThreatLog = {
      id: `t_${Date.now()}`,
      type: '5-Attempt Lockout Alert',
      attemptedEmail,
      timestamp: new Date().toISOString(),
      ipAddress: `197.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      city: 'Harare, Zimbabwe',
      status: 'Alert Email Sent',
      recipients: ['thaoffixialmusic@gmail.com', 'tadiwanashemukandagumbo@gmail.com'],
      resetToken,
      resetUrl,
    };

    threats = [newThreat, ...threats];
    localStorage.setItem(THREATS_STORAGE_KEY, JSON.stringify(threats));
  } catch (err) {
    console.error('Failed to log threat alert', err);
  }
}

export function clearThreatLog(threatId: string) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(THREATS_STORAGE_KEY);
    if (raw) {
      const threats: SecurityThreatLog[] = JSON.parse(raw);
      const filtered = threats.filter((t) => t.id !== threatId);
      localStorage.setItem(THREATS_STORAGE_KEY, JSON.stringify(filtered));
    }
  } catch (err) {
    console.error('Failed to clear threat log', err);
  }
}

export function getAnalyticsStats(): AnalyticsStats {
  const deviceBreakdown = [
    { device: 'Mobile Phones (iOS & Android)', percentage: 74, icon: 'Smartphone' },
    { device: 'Desktop & Workstations', percentage: 21, icon: 'Laptop' },
    { device: 'Tablets & Consoles', percentage: 5, icon: 'Tablet' },
  ];

  if (typeof window === 'undefined') {
    return {
      totalVisits: 14820,
      uniqueVisitors: 8430,
      activeToday: 412,
      threatCount: 1,
      onlineNow: 8,
      locationBreakdown: SEEDED_LOCATIONS,
      recentVisits: SEEDED_RECENT_VISITS,
      threatLogs: SEEDED_THREAT_LOGS,
      deviceBreakdown,
    };
  }

  try {
    const rawVisits = localStorage.getItem(VISITS_STORAGE_KEY);
    const recentVisits: VisitLocationLog[] = rawVisits ? JSON.parse(rawVisits) : SEEDED_RECENT_VISITS;

    const rawThreats = localStorage.getItem(THREATS_STORAGE_KEY);
    const threatLogs: SecurityThreatLog[] = rawThreats ? JSON.parse(rawThreats) : SEEDED_THREAT_LOGS;

    const extraVisits = recentVisits.length;

    return {
      totalVisits: 14820 + extraVisits,
      uniqueVisitors: 8430 + Math.floor(extraVisits * 0.7),
      activeToday: 412 + extraVisits,
      threatCount: threatLogs.length,
      onlineNow: Math.max(3, 4 + Math.floor(Math.random() * 6)),
      locationBreakdown: SEEDED_LOCATIONS,
      recentVisits,
      threatLogs,
      deviceBreakdown,
    };
  } catch {
    return {
      totalVisits: 14820,
      uniqueVisitors: 8430,
      activeToday: 412,
      threatCount: 1,
      onlineNow: 6,
      locationBreakdown: SEEDED_LOCATIONS,
      recentVisits: SEEDED_RECENT_VISITS,
      threatLogs: SEEDED_THREAT_LOGS,
      deviceBreakdown,
    };
  }
}
