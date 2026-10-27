'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

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
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; remainingAttempts?: number }>;
  signup: (name: string, email: string, city: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  resetPassword: (email: string, token: string, newPassword: string) => { success: boolean; error?: string };
  clearSecurityAlert: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'thaoffixial_fan_user';
const ACCOUNTS_STORAGE_KEY = 'thaoffixial_registered_accounts';
const FAILED_ATTEMPTS_STORAGE_KEY = 'thaoffixial_failed_attempts';

// Default seeded accounts: Administrator & Official Fan
const DEFAULT_ACCOUNTS: Record<string, { name: string; email: string; city: string; password: string; role: 'admin' | 'fan'; joinedAt: string }> = {
  'thaoffixialmusic@gmail.com': {
    name: 'Administrator (Mr Arts)',
    email: 'thaoffixialmusic@gmail.com',
    city: 'Harare, Zimbabwe',
    password: 'Deminoh19o5',
    role: 'admin',
    joinedAt: '2026-01-01T00:00:00.000Z',
  },
  'fan@thaofficial.com': {
    name: 'Official Fan',
    email: 'fan@thaofficial.com',
    city: 'Harare, Zimbabwe',
    password: 'thaoffixial2026',
    role: 'fan',
    joinedAt: '2026-01-01T00:00:00.000Z',
  },
};

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
          // Initialize accounts and ensure administrator account is populated
          const existingAccountsStr = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
          let accounts: Record<string, { name: string; email: string; city: string; password: string; role: 'admin' | 'fan'; joinedAt: string }> = {
            ...DEFAULT_ACCOUNTS,
          };
          if (existingAccountsStr) {
            try {
              accounts = { ...accounts, ...JSON.parse(existingAccountsStr) };
            } catch (e) {
              console.error(e);
            }
          }
          // Ensure administrator account is set with latest Deminoh19o5 password if not customized
          if (!accounts['thaoffixialmusic@gmail.com']) {
            accounts['thaoffixialmusic@gmail.com'] = DEFAULT_ACCOUNTS['thaoffixialmusic@gmail.com'];
          }
          localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));

          // Check current user session
          const stored = localStorage.getItem(USER_STORAGE_KEY);
          if (stored) {
            const parsed = JSON.parse(stored) as FanUser;
            setUser(parsed);
          } else {
            // Prompt user to login or sign up every time the web opens (if unauthenticated)
            setIsAuthModalOpen(true);
          }
        }
      } catch {
        setIsAuthModalOpen(true);
      }
    }, 600);

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
    setLockoutSeconds(10); // 10 second countdown before attempting to re-enter password

    // Dispatch to server API route
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

  const login = async (email: string, passwordAttempt: string): Promise<{ success: boolean; error?: string; remainingAttempts?: number }> => {
    if (lockoutSeconds > 0) {
      return {
        success: false,
        error: `Account entry is temporarily locked. Please wait ${lockoutSeconds} seconds before re-attempting.`,
      };
    }

    const normalizedEmail = email.trim().toLowerCase();
    let accounts: Record<string, { name: string; email: string; city?: string; password: string; role?: 'admin' | 'fan'; joinedAt: string }> = { ...DEFAULT_ACCOUNTS };

    try {
      const stored = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      if (stored) {
        accounts = JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }

    // Always recognize administrator credentials
    if (normalizedEmail === 'thaoffixialmusic@gmail.com' && !accounts['thaoffixialmusic@gmail.com']) {
      accounts['thaoffixialmusic@gmail.com'] = DEFAULT_ACCOUNTS['thaoffixialmusic@gmail.com'];
    }

    const account = accounts[normalizedEmail];

    // If account exists and password matches
    if (account && account.password === passwordAttempt) {
      const fanUser: FanUser = {
        name: account.name,
        email: account.email,
        city: account.city,
        role: account.role || (normalizedEmail === 'thaoffixialmusic@gmail.com' ? 'admin' : 'fan'),
        joinedAt: account.joinedAt,
      };
      setUser(fanUser);
      setFailedAttempts(0);
      setSecurityAlert(null);
      try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(fanUser));
        localStorage.removeItem(`${FAILED_ATTEMPTS_STORAGE_KEY}_${normalizedEmail}`);
      } catch (e) {
        console.error(e);
      }
      return { success: true };
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
      // Send security alert to thaoffixialmusic@gmail.com & tadiwanashemukandagumbo@gmail.com & start 10s countdown
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

  const signup = (name: string, email: string, city: string, password: string): { success: boolean; error?: string } => {
    const normalizedEmail = email.trim().toLowerCase();

    let accounts: Record<string, { name: string; email: string; city: string; password: string; role?: 'admin' | 'fan'; joinedAt: string }> = { ...DEFAULT_ACCOUNTS };
    try {
      const stored = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      if (stored) {
        accounts = JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }

    const newAccount = {
      name,
      email: normalizedEmail,
      city,
      password,
      role: (normalizedEmail === 'thaoffixialmusic@gmail.com' ? 'admin' : 'fan') as 'admin' | 'fan',
      joinedAt: new Date().toISOString(),
    };

    accounts[normalizedEmail] = newAccount;

    const fanUser: FanUser = {
      name,
      email: normalizedEmail,
      city,
      role: newAccount.role,
      joinedAt: newAccount.joinedAt,
    };

    setUser(fanUser);
    setFailedAttempts(0);
    setSecurityAlert(null);

    try {
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(fanUser));
    } catch (e) {
      console.error(e);
    }

    return { success: true };
  };

  const resetPassword = (email: string, token: string, newPassword: string): { success: boolean; error?: string } => {
    const normalizedEmail = email.trim().toLowerCase();

    let accounts: Record<string, { name: string; email: string; city?: string; password: string; role?: 'admin' | 'fan'; joinedAt: string }> = { ...DEFAULT_ACCOUNTS };
    try {
      const stored = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      if (stored) {
        accounts = JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }

    const isAdmin = normalizedEmail === 'thaoffixialmusic@gmail.com';

    // If account doesn't exist yet, create it with this email
    if (!accounts[normalizedEmail]) {
      accounts[normalizedEmail] = {
        name: isAdmin ? 'Administrator (Mr Arts)' : normalizedEmail.split('@')[0],
        email: normalizedEmail,
        city: 'Harare, Zimbabwe',
        password: newPassword,
        role: isAdmin ? 'admin' : 'fan',
        joinedAt: new Date().toISOString(),
      };
    } else {
      accounts[normalizedEmail].password = newPassword;
    }

    try {
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
      localStorage.removeItem(`${FAILED_ATTEMPTS_STORAGE_KEY}_${normalizedEmail}`);
    } catch (e) {
      console.error(e);
    }

    // Reset failed attempts & lockout
    setFailedAttempts(0);
    setLockoutSeconds(0);
    setSecurityAlert(null);

    // Sign user in automatically with new password
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

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to remove user session', e);
    }
    // Re-prompt upon logging out
    setIsAuthModalOpen(true);
  };

  const clearSecurityAlert = () => {
    setSecurityAlert(null);
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
        logout,
        resetPassword,
        clearSecurityAlert,
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
