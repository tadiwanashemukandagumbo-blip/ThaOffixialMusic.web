'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { recordVisit } from './analytics-tracker';

export interface FanUser {
  name: string;
  email: string;
  city?: string;
  role?: 'admin' | 'fan';
  joinedAt: string;
}

export interface SecurityAlertData {
  email: string;
  recipients: string[];
  resetUrl: string;
  resetToken: string;
  timestamp: string;
  subject: string;
  body: string;
}

export interface RegisteredAccount {
  name: string;
  email: string;
  city: string;
  password: string;
  role: 'admin' | 'fan';
  joinedAt: string;
  lastLoginAt?: string;
  lastIp?: string;
}

export interface ActiveSession {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'fan';
  loginTime: string;
  lastActive: string;
  city: string;
  country: string;
  ip: string;
  device: string;
  isCurrent: boolean;
}

interface AuthContextType {
  user: FanUser | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authTab: 'signin' | 'signup';
  failedAttempts: number;
  lockoutSeconds: number;
  securityAlert: SecurityAlertData | null;
  openAuthModal: (tab?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; remainingAttempts?: number; notFound?: boolean; role?: 'admin' | 'fan' }>;
  signup: (name: string, email: string, city: string, password: string, role?: 'admin' | 'fan') => { success: boolean; error?: string };
  checkAccountExists: (email: string) => boolean;
  logout: () => void;
  resetPassword: (email: string, token: string, newPassword: string) => { success: boolean; error?: string };
  clearSecurityAlert: () => void;
  // Administrator User & Session Management
  getAllAccounts: () => RegisteredAccount[];
  updateUserCredentials: (email: string, updates: Partial<RegisteredAccount>) => { success: boolean; error?: string };
  deleteUserAccount: (email: string) => { success: boolean; error?: string };
  createUserByAdmin: (account: { name: string; email: string; city?: string; password: string; role: 'admin' | 'fan' }) => { success: boolean; error?: string };
  getActiveSessions: () => ActiveSession[];
  terminateSession: (sessionId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'thaoffixial_fan_user';
const ACCOUNTS_STORAGE_KEY = 'thaoffixial_registered_accounts';
const FAILED_ATTEMPTS_STORAGE_KEY = 'thaoffixial_failed_attempts';
const ACTIVE_SESSIONS_STORAGE_KEY = 'thaoffixial_active_sessions';

// Default seeded accounts: Administrator & Official Fan
const DEFAULT_ACCOUNTS: Record<string, RegisteredAccount> = {
  'thaoffixialmusic@gmail.com': {
    name: 'Administrator (Mr Arts)',
    email: 'thaoffixialmusic@gmail.com',
    city: 'Harare, Zimbabwe',
    password: 'Deminoh19o5',
    role: 'admin',
    joinedAt: '2026-01-01T00:00:00.000Z',
    lastLoginAt: '2026-10-27T14:30:00.000Z',
    lastIp: '197.221.240.12',
  },
  'fan@thaofficial.com': {
    name: 'Official Fan',
    email: 'fan@thaofficial.com',
    city: 'Harare, Zimbabwe',
    password: 'thaoffixial2026',
    role: 'fan',
    joinedAt: '2026-01-01T00:00:00.000Z',
    lastLoginAt: '2026-10-27T16:15:00.000Z',
    lastIp: '197.221.192.44',
  },
  'tadiwanashemukandagumbo@gmail.com': {
    name: 'Tadiwanashe Mukandagumbo (Security Admin)',
    email: 'tadiwanashemukandagumbo@gmail.com',
    city: 'Harare, Zimbabwe',
    password: 'Deminoh19o5',
    role: 'admin',
    joinedAt: '2026-01-15T00:00:00.000Z',
    lastLoginAt: '2026-10-26T20:00:00.000Z',
    lastIp: '197.221.200.15',
  },
  'zvishavane.superfan@gmail.com': {
    name: 'Zvishavane Vibe Fan',
    email: 'zvishavane.superfan@gmail.com',
    city: 'Zvishavane, Zimbabwe',
    password: 'rudovibe2026',
    role: 'fan',
    joinedAt: '2026-02-10T12:00:00.000Z',
    lastLoginAt: '2026-10-27T11:20:00.000Z',
    lastIp: '197.221.140.78',
  },
};

const SEEDED_ACTIVE_SESSIONS: ActiveSession[] = [
  {
    id: 'sess_admin_live',
    email: 'thaoffixialmusic@gmail.com',
    name: 'Administrator (Mr Arts)',
    role: 'admin',
    loginTime: new Date(Date.now() - 12 * 60000).toISOString(),
    lastActive: new Date().toISOString(),
    city: 'Harare',
    country: 'Zimbabwe',
    ip: '197.221.240.12',
    device: 'Desktop Chrome / macOS',
    isCurrent: true,
  },
  {
    id: 'sess_fan_live1',
    email: 'fan@thaofficial.com',
    name: 'Official Fan',
    role: 'fan',
    loginTime: new Date(Date.now() - 34 * 60000).toISOString(),
    lastActive: new Date(Date.now() - 2 * 60000).toISOString(),
    city: 'Zvishavane',
    country: 'Zimbabwe',
    ip: '197.221.192.44',
    device: 'iPhone 15 Pro / Safari iOS',
    isCurrent: false,
  },
  {
    id: 'sess_fan_live2',
    email: 'zvishavane.superfan@gmail.com',
    name: 'Zvishavane Vibe Fan',
    role: 'fan',
    loginTime: new Date(Date.now() - 85 * 60000).toISOString(),
    lastActive: new Date(Date.now() - 10 * 60000).toISOString(),
    city: 'Johannesburg',
    country: 'South Africa',
    ip: '105.22.18.91',
    device: 'Samsung Galaxy S24 / Android',
    isCurrent: false,
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FanUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);
  const [securityAlert, setSecurityAlert] = useState<SecurityAlertData | null>(null);

  // Initialize accounts & session
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (typeof window !== 'undefined') {
          // Initialize accounts
          const existingAccountsStr = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
          let accounts: Record<string, RegisteredAccount> = { ...DEFAULT_ACCOUNTS };
          if (existingAccountsStr) {
            try {
              accounts = { ...accounts, ...JSON.parse(existingAccountsStr) };
            } catch (e) {
              console.error(e);
            }
          }
          // Ensure default admin is set
          if (!accounts['thaoffixialmusic@gmail.com']) {
            accounts['thaoffixialmusic@gmail.com'] = DEFAULT_ACCOUNTS['thaoffixialmusic@gmail.com'];
          }
          localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));

          // Initialize active sessions if absent
          if (!localStorage.getItem(ACTIVE_SESSIONS_STORAGE_KEY)) {
            localStorage.setItem(ACTIVE_SESSIONS_STORAGE_KEY, JSON.stringify(SEEDED_ACTIVE_SESSIONS));
          }

          // Check current user session
          const stored = localStorage.getItem(USER_STORAGE_KEY);
          if (stored) {
            const parsed = JSON.parse(stored) as FanUser;
            setUser(parsed);
          } else {
            // Prompt user to login or sign up if unauthenticated
            setIsAuthModalOpen(true);
          }
        }
      } catch {
        setIsAuthModalOpen(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 10-second countdown timer for security lockout
  useEffect(() => {
    if (lockoutSeconds <= 0) return;

    const interval = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [lockoutSeconds]);

  const openAuthModal = useCallback((tab: 'signin' | 'signup' = 'signin') => {
    setAuthTab(tab);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const triggerSecurityAlert = async (attemptedEmail: string) => {
    const token = 'rst_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const resetUrl = `${origin}/reset-password?email=${encodeURIComponent(attemptedEmail)}&token=${token}`;

    const alertData: SecurityAlertData = {
      email: attemptedEmail,
      recipients: ['thaoffixialmusic@gmail.com', 'tadiwanashemukandagumbo@gmail.com'],
      resetUrl,
      resetToken: token,
      timestamp: new Date().toISOString(),
      subject: `🚨 SECURITY ALERT: 5 Failed Password Attempts Detected (${attemptedEmail})`,
      body: `5 incorrect password attempts were entered on account (${attemptedEmail}). Account entry is locked for a 10-second security cooldown. Use the link below to reset the password to a new one if necessary. Alert sent to thaoffixialmusic@gmail.com & tadiwanashemukandagumbo@gmail.com.`,
    };

    setSecurityAlert(alertData);
    setLockoutSeconds(10); // 10 second countdown

    try {
      await fetch('/api/auth/security-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alertData),
      });
    } catch (err) {
      console.error('Failed to dispatch security alert email', err);
    }
  };

  /**
   * Dispatches login notification email to the user AND official management
   */
  const notifyUserOfLogin = async (account: RegisteredAccount) => {
    const isMobile = typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const device = isMobile ? 'Mobile Device / Mobile Browser' : 'Desktop Workstation / Browser';
    const city = account.city?.split(',')[0]?.trim() || 'Harare';
    const country = account.city?.includes('South Africa') ? 'South Africa' : 'Zimbabwe';
    const ip = account.lastIp || '197.221.240.12';

    try {
      await fetch('/api/auth/login-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: account.email,
          name: account.name,
          role: account.role,
          city,
          country,
          ip,
          device,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error('Failed to dispatch login notification email:', err);
    }

    // Also update active session in local store
    try {
      if (typeof window !== 'undefined') {
        const storedSessions = localStorage.getItem(ACTIVE_SESSIONS_STORAGE_KEY);
        let sessions: ActiveSession[] = storedSessions ? JSON.parse(storedSessions) : SEEDED_ACTIVE_SESSIONS;

        // Mark previous sessions of same user as non-current
        sessions = sessions.filter((s) => s.email !== account.email);

        const currentSession: ActiveSession = {
          id: `sess_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          email: account.email,
          name: account.name,
          role: account.role,
          loginTime: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          city,
          country,
          ip,
          device,
          isCurrent: true,
        };

        sessions = [currentSession, ...sessions.slice(0, 20)];
        localStorage.setItem(ACTIVE_SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
      }
    } catch (err) {
      console.error('Failed to update active sessions storage', err);
    }
  };

  const checkAccountExists = useCallback((emailToCheck: string): boolean => {
    const normalized = emailToCheck.trim().toLowerCase();
    if (!normalized) return false;
    if (normalized === 'thaoffixialmusic@gmail.com') return true;
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
        if (stored) {
          const accs = JSON.parse(stored);
          return Boolean(accs[normalized]);
        }
      }
    } catch {
      // ignore
    }
    return Boolean(DEFAULT_ACCOUNTS[normalized]);
  }, []);

  const login = async (
    email: string,
    passwordAttempt: string
  ): Promise<{ success: boolean; error?: string; remainingAttempts?: number; notFound?: boolean; role?: 'admin' | 'fan' }> => {
    if (lockoutSeconds > 0) {
      return {
        success: false,
        error: `Account entry is temporarily locked. Please wait ${lockoutSeconds} seconds before re-attempting.`,
      };
    }

    const normalizedEmail = email.trim().toLowerCase();
    let accounts: Record<string, RegisteredAccount> = { ...DEFAULT_ACCOUNTS };

    try {
      const stored = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      if (stored) {
        accounts = JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }

    // Always recognize default administrator credentials
    if (normalizedEmail === 'thaoffixialmusic@gmail.com' && !accounts['thaoffixialmusic@gmail.com']) {
      accounts['thaoffixialmusic@gmail.com'] = DEFAULT_ACCOUNTS['thaoffixialmusic@gmail.com'];
    }

    const account = accounts[normalizedEmail];

    // If account does not exist at all
    if (!account) {
      return {
        success: false,
        notFound: true,
        error: 'No account found with this email. Moving your details to Create Account...',
      };
    }

    // If account exists and password matches
    if (account && account.password === passwordAttempt) {
      const detectedRole = account.role || (normalizedEmail === 'thaoffixialmusic@gmail.com' ? 'admin' : 'fan');
      const fanUser: FanUser = {
        name: account.name,
        email: account.email,
        city: account.city,
        role: detectedRole,
        joinedAt: account.joinedAt,
      };

      // Update account's last login
      const updatedAccount: RegisteredAccount = {
        ...account,
        lastLoginAt: new Date().toISOString(),
        lastIp: `197.221.${Math.floor(Math.random() * 200 + 10)}.${Math.floor(Math.random() * 250 + 1)}`,
      };
      accounts[normalizedEmail] = updatedAccount;

      setUser(fanUser);
      setFailedAttempts(0);
      setSecurityAlert(null);

      try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(fanUser));
        localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
        localStorage.removeItem(`${FAILED_ATTEMPTS_STORAGE_KEY}_${normalizedEmail}`);
      } catch (e) {
        console.error(e);
      }

      // 1. Send Login Email Notification to the user and security management
      notifyUserOfLogin(updatedAccount);

      // 2. Record analytics visit
      recordVisit(detectedRole === 'admin' ? 'Administrator' : 'Fan', account.email);

      return { success: true, role: detectedRole };
    }

    // Wrong password handling
    const newAttemptCount = failedAttempts + 1;
    setFailedAttempts(newAttemptCount);

    try {
      localStorage.setItem(`${FAILED_ATTEMPTS_STORAGE_KEY}_${normalizedEmail}`, String(newAttemptCount));
    } catch (e) {
      console.error(e);
    }

    if (newAttemptCount >= 5) {
      await triggerSecurityAlert(normalizedEmail);
      return {
        success: false,
        error: `5 incorrect password attempts entered! A security alert email with a password reset link has been dispatched to thaoffixialmusic@gmail.com and tadiwanashemukandagumbo@gmail.com. A 10-second lockout is active.`,
        remainingAttempts: 0,
      };
    }

    return {
      success: false,
      error: `Incorrect password. Attempt ${newAttemptCount} of 5.`,
      remainingAttempts: 5 - newAttemptCount,
    };
  };

  const signup = (name: string, email: string, city: string, password: string, role: 'admin' | 'fan' = 'fan'): { success: boolean; error?: string } => {
    const normalizedEmail = email.trim().toLowerCase();

    let accounts: Record<string, RegisteredAccount> = { ...DEFAULT_ACCOUNTS };
    try {
      const stored = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      if (stored) {
        accounts = JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }

    const assignedRole = (normalizedEmail === 'thaoffixialmusic@gmail.com' || role === 'admin') ? 'admin' : 'fan';

    const newAccount: RegisteredAccount = {
      name,
      email: normalizedEmail,
      city: city || 'Harare, Zimbabwe',
      password,
      role: assignedRole,
      joinedAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      lastIp: `197.221.${Math.floor(Math.random() * 200 + 10)}.${Math.floor(Math.random() * 250 + 1)}`,
    };

    accounts[normalizedEmail] = newAccount;

    const fanUser: FanUser = {
      name,
      email: normalizedEmail,
      city: newAccount.city,
      role: assignedRole,
      joinedAt: newAccount.joinedAt,
    };

    setUser(fanUser);
    setFailedAttempts(0);
    setSecurityAlert(null);

    try {
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(fanUser));
      localStorage.removeItem(`${FAILED_ATTEMPTS_STORAGE_KEY}_${normalizedEmail}`);
    } catch (e) {
      console.error(e);
    }

    // Send login/welcome notice via email
    notifyUserOfLogin(newAccount);
    recordVisit(assignedRole === 'admin' ? 'Administrator' : 'Fan', newAccount.email);

    return { success: true };
  };

  const resetPassword = (email: string, token: string, newPassword: string): { success: boolean; error?: string } => {
    const normalizedEmail = email.trim().toLowerCase();

    let accounts: Record<string, RegisteredAccount> = { ...DEFAULT_ACCOUNTS };
    try {
      const stored = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      if (stored) {
        accounts = JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }

    const isAdmin = normalizedEmail === 'thaoffixialmusic@gmail.com';

    if (!accounts[normalizedEmail]) {
      accounts[normalizedEmail] = {
        name: isAdmin ? 'Administrator (Mr Arts)' : normalizedEmail.split('@')[0],
        email: normalizedEmail,
        city: 'Harare, Zimbabwe',
        password: newPassword,
        role: isAdmin ? 'admin' : 'fan',
        joinedAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };
    } else {
      accounts[normalizedEmail].password = newPassword;
      accounts[normalizedEmail].lastLoginAt = new Date().toISOString();
    }

    try {
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
      localStorage.removeItem(`${FAILED_ATTEMPTS_STORAGE_KEY}_${normalizedEmail}`);
    } catch (e) {
      console.error(e);
    }

    setFailedAttempts(0);
    setLockoutSeconds(0);
    setSecurityAlert(null);

    const updatedUser: FanUser = {
      name: accounts[normalizedEmail].name,
      email: normalizedEmail,
      city: accounts[normalizedEmail].city,
      role: accounts[normalizedEmail].role || (isAdmin ? 'admin' : 'fan'),
      joinedAt: accounts[normalizedEmail].joinedAt,
    };

    setUser(updatedUser);
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
    } catch (e) {
      console.error(e);
    }

    notifyUserOfLogin(accounts[normalizedEmail]);

    return { success: true };
  };

  const logout = () => {
    // If there's an active session, mark as terminated
    if (user && typeof window !== 'undefined') {
      try {
        const storedSessions = localStorage.getItem(ACTIVE_SESSIONS_STORAGE_KEY);
        if (storedSessions) {
          const sessions: ActiveSession[] = JSON.parse(storedSessions);
          const updated = sessions.filter((s) => s.email !== user.email);
          localStorage.setItem(ACTIVE_SESSIONS_STORAGE_KEY, JSON.stringify(updated));
        }
      } catch (err) {
        console.error(err);
      }
    }

    setUser(null);
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to remove user session', e);
    }
    setIsAuthModalOpen(true);
  };

  const clearSecurityAlert = () => {
    setSecurityAlert(null);
  };

  // ==========================================
  // Administrator Management Functions
  // ==========================================

  const getAllAccounts = (): RegisteredAccount[] => {
    if (typeof window === 'undefined') return Object.values(DEFAULT_ACCOUNTS);
    try {
      const stored = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      if (stored) {
        const accs: Record<string, RegisteredAccount> = JSON.parse(stored);
        return Object.values(accs);
      }
    } catch (e) {
      console.error(e);
    }
    return Object.values(DEFAULT_ACCOUNTS);
  };

  const updateUserCredentials = (
    emailToUpdate: string,
    updates: Partial<RegisteredAccount>
  ): { success: boolean; error?: string } => {
    const normalized = emailToUpdate.trim().toLowerCase();
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
        let accs: Record<string, RegisteredAccount> = { ...DEFAULT_ACCOUNTS };
        if (stored) {
          accs = JSON.parse(stored);
        }

        if (!accs[normalized]) {
          return { success: false, error: 'Account not found' };
        }

        accs[normalized] = {
          ...accs[normalized],
          ...updates,
          email: updates.email ? updates.email.trim().toLowerCase() : accs[normalized].email,
        };

        // If email was changed, update key in map
        if (updates.email && updates.email.trim().toLowerCase() !== normalized) {
          const newEmail = updates.email.trim().toLowerCase();
          accs[newEmail] = accs[normalized];
          delete accs[normalized];
        }

        localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accs));

        // If currently logged-in user was modified, update active state
        if (user && user.email === normalized) {
          const updatedFanUser: FanUser = {
            name: updates.name || user.name,
            email: updates.email || user.email,
            city: updates.city || user.city,
            role: updates.role || user.role,
            joinedAt: user.joinedAt,
          };
          setUser(updatedFanUser);
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedFanUser));
        }

        return { success: true };
      }
    } catch (err) {
      console.error('Error updating user credentials', err);
      return { success: false, error: 'Database update failed' };
    }
    return { success: false, error: 'Environment unavailable' };
  };

  const deleteUserAccount = (emailToDelete: string): { success: boolean; error?: string } => {
    const normalized = emailToDelete.trim().toLowerCase();
    if (normalized === 'thaoffixialmusic@gmail.com') {
      return { success: false, error: 'Cannot delete primary root administrator account' };
    }

    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
        if (stored) {
          const accs: Record<string, RegisteredAccount> = JSON.parse(stored);
          if (accs[normalized]) {
            delete accs[normalized];
            localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accs));

            // Also clean up any active sessions
            const sessionsStored = localStorage.getItem(ACTIVE_SESSIONS_STORAGE_KEY);
            if (sessionsStored) {
              const sessions: ActiveSession[] = JSON.parse(sessionsStored);
              localStorage.setItem(
                ACTIVE_SESSIONS_STORAGE_KEY,
                JSON.stringify(sessions.filter((s) => s.email !== normalized))
              );
            }

            // If deleted self, logout
            if (user && user.email === normalized) {
              logout();
            }

            return { success: true };
          }
        }
      }
    } catch (err) {
      console.error('Error deleting user account', err);
      return { success: false, error: 'Database removal failed' };
    }
    return { success: false, error: 'Account not found' };
  };

  const createUserByAdmin = (account: {
    name: string;
    email: string;
    city?: string;
    password: string;
    role: 'admin' | 'fan';
  }): { success: boolean; error?: string } => {
    const normalized = account.email.trim().toLowerCase();
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
        let accs: Record<string, RegisteredAccount> = { ...DEFAULT_ACCOUNTS };
        if (stored) {
          accs = JSON.parse(stored);
        }

        if (accs[normalized]) {
          return { success: false, error: 'An account with this email already exists' };
        }

        const newAccount: RegisteredAccount = {
          name: account.name.trim(),
          email: normalized,
          city: account.city?.trim() || 'Harare, Zimbabwe',
          password: account.password,
          role: account.role,
          joinedAt: new Date().toISOString(),
          lastLoginAt: 'Never logged in yet',
        };

        accs[normalized] = newAccount;
        localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accs));
        return { success: true };
      }
    } catch (err) {
      console.error('Error creating user by admin', err);
      return { success: false, error: 'Failed to create user' };
    }
    return { success: false, error: 'Environment unavailable' };
  };

  const getActiveSessions = (): ActiveSession[] => {
    if (typeof window === 'undefined') return SEEDED_ACTIVE_SESSIONS;
    try {
      const stored = localStorage.getItem(ACTIVE_SESSIONS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.error('Failed to get active sessions', err);
    }
    return SEEDED_ACTIVE_SESSIONS;
  };

  const terminateSession = (sessionId: string) => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(ACTIVE_SESSIONS_STORAGE_KEY);
      if (stored) {
        const sessions: ActiveSession[] = JSON.parse(stored);
        const filtered = sessions.filter((s) => s.id !== sessionId);
        localStorage.setItem(ACTIVE_SESSIONS_STORAGE_KEY, JSON.stringify(filtered));
      }
    } catch (err) {
      console.error('Failed to terminate session', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authTab,
        failedAttempts,
        lockoutSeconds,
        securityAlert,
        openAuthModal,
        closeAuthModal,
        login,
        signup,
        checkAccountExists,
        logout,
        resetPassword,
        clearSecurityAlert,
        getAllAccounts,
        updateUserCredentials,
        deleteUserAccount,
        createUserByAdmin,
        getActiveSessions,
        terminateSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
