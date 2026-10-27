'use client';

export interface VisitLocationLog {
  id: string;
  city: string;
  country: string;
  ip: string;
  timestamp: string;
  userType: 'Fan' | 'Administrator' | 'Guest';
  email?: string;
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

export interface AnalyticsStats {
  totalVisits: number;
  uniqueVisitors: number;
  activeToday: number;
  threatCount: number;
  locationBreakdown: { city: string; country: string; count: number; percentage: number }[];
  recentVisits: VisitLocationLog[];
  threatLogs: SecurityThreatLog[];
}

const VISITS_STORAGE_KEY = 'thaoffixial_analytics_visits';
const THREATS_STORAGE_KEY = 'thaoffixial_analytics_threats';

const SEEDED_LOCATIONS = [
  { city: 'Harare', country: 'Zimbabwe', count: 6240, percentage: 42 },
  { city: 'Zvishavane', country: 'Zimbabwe', count: 4150, percentage: 28 },
  { city: 'Johannesburg', country: 'South Africa', count: 2230, percentage: 15 },
  { city: 'London', country: 'United Kingdom', count: 1180, percentage: 8 },
  { city: 'New York', country: 'United States', count: 1020, percentage: 7 },
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
  },
  {
    id: 'v2',
    city: 'Zvishavane',
    country: 'Zimbabwe',
    ip: '197.221.192.44',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    userType: 'Fan',
    email: 'fan@thaofficial.com',
  },
  {
    id: 'v3',
    city: 'Johannesburg',
    country: 'South Africa',
    ip: '105.22.18.91',
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    userType: 'Guest',
  },
  {
    id: 'v4',
    city: 'London',
    country: 'United Kingdom',
    ip: '86.14.92.102',
    timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
    userType: 'Fan',
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

    const cities = ['Harare', 'Zvishavane', 'Bulawayo', 'Johannesburg', 'London', 'New York'];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];

    const newLog: VisitLocationLog = {
      id: `v_${Date.now()}`,
      city: randomCity,
      country: randomCity === 'Johannesburg' ? 'South Africa' : randomCity === 'London' ? 'United Kingdom' : randomCity === 'New York' ? 'United States' : 'Zimbabwe',
      ip: `197.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      timestamp: new Date().toISOString(),
      userType,
      email,
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

export function getAnalyticsStats(): AnalyticsStats {
  if (typeof window === 'undefined') {
    return {
      totalVisits: 14820,
      uniqueVisitors: 8430,
      activeToday: 412,
      threatCount: 1,
      locationBreakdown: SEEDED_LOCATIONS,
      recentVisits: SEEDED_RECENT_VISITS,
      threatLogs: SEEDED_THREAT_LOGS,
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
      locationBreakdown: SEEDED_LOCATIONS,
      recentVisits,
      threatLogs,
    };
  } catch {
    return {
      totalVisits: 14820,
      uniqueVisitors: 8430,
      activeToday: 412,
      threatCount: 1,
      locationBreakdown: SEEDED_LOCATIONS,
      recentVisits: SEEDED_RECENT_VISITS,
      threatLogs: SEEDED_THREAT_LOGS,
    };
  }
}
