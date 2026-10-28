'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  X,
  Mail,
  Lock,
  User,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Clock,
  ExternalLink,
  Eye,
  EyeOff,
  AlertTriangle,
  Key,
  CheckCircle2,
  Info
} from 'lucide-react';
import { ARTIST_CONFIG } from '@/config/artist';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authTab,
    login,
    signup,
    lockoutSeconds,
    failedAttempts,
    securityAlert,
  } = useAuth();

  const { t } = useLanguage();
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState<'signin' | 'signup' | null>(null);
  const tab = selectedTab ?? authTab ?? 'signin';

  // Credentials and profile fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [isAdminSignInMode, setIsAdminSignInMode] = useState(false);
  const [accountRole, setAccountRole] = useState<'fan' | 'admin'>('fan');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminPasscode, setShowAdminPasscode] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  // Transfer state when user enters credentials on signin without an existing account
  const [transferNotice, setTransferNotice] = useState<{
    fromEmail: string;
    message: string;
    isAdmin: boolean;
  } | null>(null);
  const [highlightBlanks, setHighlightBlanks] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const adminPasscodeRef = useRef<HTMLInputElement>(null);



  if (!isAuthModalOpen) return null;

  const isLocked = lockoutSeconds > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (isLocked) {
      setErrorMsg(`Account is locked for security. Please wait ${lockoutSeconds}s.`);
      return;
    }

    if (tab === 'signin') {
      if (!email.trim() || !password) {
        setErrorMsg('Please enter both email and password.');
        return;
      }

      setIsSubmitting(true);
      const res = await login(email.trim(), password);
      setIsSubmitting(false);

      if (res.success) {
        setSuccess(true);
        const isAdmin = res.role === 'admin' || accountRole === 'admin' || email.trim().toLowerCase() === 'thaoffixialmusic@gmail.com';
        setTimeout(() => {
          setSuccess(false);
          closeAuthModal();
          setEmail('');
          setPassword('');
          setTransferNotice(null);
          setHighlightBlanks(false);
          if (isAdmin) {
            router.push('/admin');
          }
        }, 1000);
      } else if (res.notFound) {
        // User entered credentials on sign in page without an existing account:
        // Move the information to create account and prompt for blank/empty fields!
        const normalized = email.trim().toLowerCase();
        const isAdmin = isAdminSignInMode || normalized === 'thaoffixialmusic@gmail.com' || normalized === 'tadiwanashemukandagumbo@gmail.com';
        
        if (isAdmin) {
          setAccountRole('admin');
        } else {
          setAccountRole('fan');
        }

        setSelectedTab('signup');
        setHighlightBlanks(true);
        setTransferNotice({
          fromEmail: email.trim(),
          isAdmin,
          message: isAdmin
            ? `No administrator account was found for "${email.trim()}". We have transferred your email and password over to account creation. Please enter your Full Name and Administrator Passcode in the highlighted blank field(s) below.`
            : `No account was found for "${email.trim()}". We have transferred your email and password over to account creation. Please enter your Full Name in the highlighted blank field(s) below to complete registration.`,
        });

        // Auto-focus the first blank field
        setTimeout(() => {
          nameInputRef.current?.focus();
        }, 150);
      } else {
        setErrorMsg(res.error || 'Login failed. Please check credentials.');
      }
    } else {
      // Sign up / Create Account mode
      if (!name.trim()) {
        setErrorMsg('Please enter your Full Name in the highlighted field.');
        setHighlightBlanks(true);
        nameInputRef.current?.focus();
        return;
      }

      if (!email.trim()) {
        setErrorMsg('Please enter a valid email address.');
        return;
      }

      if (!password) {
        setErrorMsg('Please provide a password.');
        return;
      }

      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters long.');
        return;
      }

      // Administrator role validation
      if (accountRole === 'admin') {
        const normalized = email.trim().toLowerCase();
        const isOfficialAdminEmail = normalized === 'thaoffixialmusic@gmail.com' || normalized === 'tadiwanashemukandagumbo@gmail.com';
        if (!isOfficialAdminEmail && adminPasscode.trim() !== 'Deminoh19o5') {
          setErrorMsg('Invalid Administrator Passcode. Please enter Deminoh19o5 to authorize administrator account creation.');
          setHighlightBlanks(true);
          adminPasscodeRef.current?.focus();
          return;
        }
      }

      setIsSubmitting(true);
      const res = signup(name.trim(), email.trim(), city.trim() || 'Harare, Zimbabwe', password, accountRole);
      setIsSubmitting(false);

      if (res.success) {
        setSuccess(true);
        const isAdmin = accountRole === 'admin' || email.trim().toLowerCase() === 'thaoffixialmusic@gmail.com';
        setTimeout(() => {
          setSuccess(false);
          closeAuthModal();
          setName('');
          setEmail('');
          setPassword('');
          setCity('');
          setAdminPasscode('');
          setTransferNotice(null);
          setHighlightBlanks(false);
          if (isAdmin) {
            router.push('/admin');
          }
        }, 1000);
      } else {
        setErrorMsg(res.error || 'Failed to create account.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-[500px] my-auto bg-[#0C0C0E] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-left overflow-hidden">
        {/* Top Kicker and Close Button */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-widest font-mono mb-2">
              <Sparkles className="w-4 h-4 fill-amber-400" />
              <span>{accountRole === 'admin' || isAdminSignInMode ? 'Administrator Command Portal' : t.auth.fanPortal}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-outfit uppercase tracking-tight leading-tight">
              {accountRole === 'admin' || isAdminSignInMode ? 'Admin Access' : t.auth.welcomeHub}
            </h2>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-2.5 text-zinc-400 hover:text-white transition-colors rounded-xl bg-zinc-900 border border-white/10 shrink-0 cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
          {accountRole === 'admin' || isAdminSignInMode
            ? 'Sign in or register for verified administrator management tools, live analytics, threat logs, and music catalog publishing.'
            : t.auth.welcomeSub}
        </p>

        {/* Divider */}
        <div className="border-t border-white/10 my-5" />

        {/* Tab Switcher - Sign In vs Create Account */}
        <div className="grid grid-cols-2 p-1.5 bg-[#151518] rounded-2xl border border-white/5 mb-5">
          <button
            type="button"
            onClick={() => {
              setSelectedTab('signin');
              setErrorMsg(null);
            }}
            className={`py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              tab === 'signin'
                ? 'bg-[#FFB800] text-black shadow-lg shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white font-bold'
            }`}
          >
            {t.auth.signInTab}
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedTab('signup');
              setErrorMsg(null);
            }}
            className={`py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              tab === 'signup'
                ? 'bg-[#FFB800] text-black shadow-lg shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white font-bold'
            }`}
          >
            {t.auth.createFanTab}
          </button>
        </div>

        {/* TRANSFERRED NOTICE BANNER: When credentials were moved from Sign In to Create Account */}
        {tab === 'signup' && transferNotice && (
          <div className="mb-5 p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/50 text-left animate-in fade-in slide-in-from-top-2 duration-300 shadow-lg shadow-amber-500/10">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                <ArrowRight className="w-5 h-5 animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 font-mono">
                    Information Transferred
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Auto-Moved
                  </span>
                </div>
                <p className="text-xs text-zinc-200 mt-1.5 leading-relaxed font-medium">
                  {transferNotice.message}
                </p>
                <div className="mt-2.5 flex items-center gap-2 text-[11px] text-amber-300 font-mono bg-black/40 px-2.5 py-1.5 rounded-lg border border-amber-500/20">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>Email and password are preserved. Fill blank fields below.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5 FAILED ATTEMPTS SECURITY LOCKOUT & 10S COUNTDOWN BANNER */}
        {securityAlert && (
          <div className="mb-5 p-4 rounded-2xl bg-red-950/40 border border-red-500/40 text-left animate-in fade-in duration-300">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-red-500/20 text-red-400 shrink-0 mt-0.5">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-red-400 font-mono">
                    {t.auth.securityAlertTitle}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                    {t.auth.failedBadge}
                  </span>
                </div>
                <p className="text-xs text-zinc-300 mt-1 leading-snug">
                  {t.auth.securityAlertBody}
                </p>

                {/* 10-Second Countdown */}
                {isLocked ? (
                  <div className="mt-3 p-3 rounded-xl bg-black/60 border border-red-500/30">
                    <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                      <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                        <Clock className="w-3.5 h-3.5 animate-spin" />
                        {t.auth.cooldownActive}
                      </span>
                      <span className="text-red-400 font-bold text-sm">
                        00:{lockoutSeconds.toString().padStart(2, '0')}s
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 transition-all duration-1000 ease-linear"
                        style={{ width: `${(lockoutSeconds / 10) * 100}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-2">
                      {t.auth.cooldownNotice}
                    </p>
                  </div>
                ) : (
                  <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{t.auth.cooldownFinished}</span>
                  </div>
                )}

                {/* Password Reset Action Link */}
                <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-red-500/20">
                  <Link
                    href={securityAlert.resetUrl}
                    onClick={() => closeAuthModal()}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 px-3 py-1.5 rounded-lg border border-amber-400/30 transition-colors"
                  >
                    <span>{t.auth.resetPasswordNow}</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setShowEmailPreview(!showEmailPreview)}
                    className="text-xs text-zinc-400 hover:text-white underline transition-colors cursor-pointer"
                  >
                    {showEmailPreview ? t.auth.hideEmailDetails : t.auth.viewDispatchedAlert}
                  </button>
                </div>

                {showEmailPreview && (
                  <div className="mt-3 p-3 bg-black/80 rounded-xl border border-white/10 text-[11px] font-mono text-zinc-300 space-y-1">
                    <div className="text-zinc-500 text-[10px]">-- OUTGOING SECURITY ALERT EMAIL --</div>
                    <div><span className="text-zinc-500">Recipients:</span> thaoffixialmusic@gmail.com, tadiwanashemukandagumbo@gmail.com</div>
                    <div><span className="text-zinc-500">Account Attempted:</span> {securityAlert.email}</div>
                    <div><span className="text-zinc-500">Subject:</span> {securityAlert.subject}</div>
                    <div><span className="text-zinc-500">Reset URL:</span> <span className="text-amber-400 break-all">{securityAlert.resetUrl}</span></div>
                    <div className="pt-1 text-zinc-400 border-t border-white/10">{securityAlert.body}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Regular Attempt Error Message */}
        {errorMsg && !securityAlert && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
            <div className="flex-1">
              <span>{errorMsg}</span>
              {failedAttempts > 0 && failedAttempts < 5 && tab === 'signin' && (
                <div className="mt-1 text-[11px] text-red-400/80 font-mono">
                  {t.auth.failedAttemptsWarning.replace('{n}', failedAttempts.toString())}
                </div>
              )}
            </div>
          </div>
        )}

        {success ? (
          <div className="py-10 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 text-2xl font-bold border border-emerald-500/30">
              ✓
            </div>
            <h3 className="text-xl font-bold text-white font-outfit mb-1">
              {tab === 'signin' ? t.auth.welcomeBack : t.auth.accountCreated}
            </h3>
            <p className="text-xs text-zinc-400 max-w-xs">
              {accountRole === 'admin'
                ? 'Welcome Administrator. Accessing Administrator Control Center...'
                : t.auth.signedInMsg}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Create Account Fields */}
            {tab === 'signup' && (
              <>
                {/* Account Type Selector (Fan vs Administrator) */}
                <div className="p-3 bg-zinc-900/60 rounded-xl border border-white/10">
                  <label className="text-xs font-semibold text-zinc-300 block mb-2">Account Role</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAccountRole('fan')}
                      className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        accountRole === 'fan'
                          ? 'bg-amber-500 text-black shadow-sm'
                          : 'bg-black/40 text-zinc-400 hover:text-white border border-white/5'
                      }`}
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>Fan Community</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAccountRole('admin')}
                      className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        accountRole === 'admin'
                          ? 'bg-amber-500 text-black shadow-sm'
                          : 'bg-black/40 text-zinc-400 hover:text-white border border-white/5'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Administrator</span>
                    </button>
                  </div>
                </div>

                {/* Blank Field Prompt: Full Name */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-zinc-300">{t.auth.fullName}</label>
                    {highlightBlanks && !name.trim() && (
                      <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/40 animate-pulse flex items-center gap-1">
                        <span>● Required: Enter Full Name</span>
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      ref={nameInputRef}
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errorMsg) setErrorMsg(null);
                      }}
                      placeholder="e.g. Austin Mtomba / Your Name"
                      className={`w-full rounded-xl px-4 py-3.5 pl-11 text-white text-xs sm:text-sm placeholder-zinc-500 focus:outline-none transition-all ${
                        highlightBlanks && !name.trim()
                          ? 'bg-[#1e1708] border-2 border-amber-400 ring-4 ring-amber-400/25 shadow-lg shadow-amber-500/10'
                          : 'bg-[#141417] border border-white/10 focus:border-amber-400'
                      }`}
                    />
                  </div>
                </div>

                {/* City / Country */}
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1.5">{t.auth.cityCountry}</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Harare & Zvishavane, Zimbabwe"
                      className="w-full bg-[#141417] border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-white text-xs sm:text-sm placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Administrator Passcode Prompt (when Administrator role selected) */}
                {accountRole === 'admin' && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
                        <Key className="w-3.5 h-3.5 text-amber-400" />
                        <span>Administrator Passcode</span>
                      </label>
                      {highlightBlanks && !adminPasscode.trim() && (
                        <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/40 animate-pulse">
                          ● Passcode: Deminoh19o5
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        ref={adminPasscodeRef}
                        type={showAdminPasscode ? 'text' : 'password'}
                        value={adminPasscode}
                        onChange={(e) => setAdminPasscode(e.target.value)}
                        placeholder="Enter Deminoh19o5"
                        className={`w-full rounded-xl px-4 py-3.5 pl-11 pr-11 text-white text-xs sm:text-sm placeholder-zinc-500 focus:outline-none transition-all ${
                          highlightBlanks && !adminPasscode.trim()
                            ? 'bg-[#1e1708] border-2 border-amber-400 ring-4 ring-amber-400/25'
                            : 'bg-[#141417] border border-white/10 focus:border-amber-400'
                        }`}
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowAdminPasscode(!showAdminPasscode)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                      >
                        {showAdminPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      Official ThaOffixialMusic team key is <span className="text-amber-400 font-mono font-bold">Deminoh19o5</span>.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Email Address Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-zinc-300">{t.auth.emailAddress}</label>
                {tab === 'signup' && transferNotice && (
                  <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Transferred
                  </span>
                )}
              </div>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full bg-[#141417] border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-white text-xs sm:text-sm placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-semibold text-zinc-300">{t.auth.password}</label>
                  {tab === 'signup' && transferNotice && (
                    <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Transferred
                    </span>
                  )}
                </div>
                {tab === 'signin' && (
                  <Link
                    href={`/reset-password${email ? `?email=${encodeURIComponent(email)}` : ''}`}
                    onClick={() => closeAuthModal()}
                    className="text-[11px] text-amber-400 hover:underline"
                  >
                    {t.auth.forgotPassword}
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={isLocked}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isLocked ? `Locked (${lockoutSeconds}s)` : '••••••••'}
                  className={`w-full bg-[#141417] border rounded-xl px-4 py-3.5 pl-11 pr-11 text-white text-xs sm:text-sm placeholder-zinc-600 focus:outline-none transition-colors ${
                    isLocked
                      ? 'border-red-500/40 opacity-60 cursor-not-allowed bg-red-950/10'
                      : 'border-white/10 focus:border-amber-400'
                  }`}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Administrator Sign-In Mode Toggle on Sign In Tab */}
            {tab === 'signin' && (
              <div className="pt-1 p-3 bg-zinc-900/40 rounded-xl border border-white/5 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300 hover:text-white select-none">
                  <input
                    type="checkbox"
                    checked={isAdminSignInMode}
                    onChange={(e) => {
                      setIsAdminSignInMode(e.target.checked);
                      if (e.target.checked) setAccountRole('admin');
                    }}
                    className="rounded border-zinc-700 bg-zinc-900 text-amber-500 focus:ring-amber-500/20 w-4 h-4 accent-amber-500 cursor-pointer"
                  />
                  <span className="font-medium flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Sign in as Administrator (Management Team)</span>
                  </span>
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isLocked}
              className={`w-full mt-6 py-4 rounded-xl text-black font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                isLocked
                  ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed shadow-none'
                  : 'bg-[#FFB800] hover:bg-amber-400 shadow-amber-500/25'
              }`}
            >
              <span>
                {isLocked
                  ? `${t.auth.lockedBtn} (${lockoutSeconds}S)`
                  : isSubmitting
                  ? t.auth.verifying
                  : tab === 'signin'
                  ? isAdminSignInMode
                    ? 'Sign In As Administrator'
                    : t.auth.signInBtn
                  : accountRole === 'admin'
                  ? 'Create Administrator Account'
                  : t.auth.createFanBtn}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Footer actions */}
        <div className="mt-8 pt-5 border-t border-white/10 text-center flex flex-col items-center gap-2.5">
          <button
            type="button"
            onClick={closeAuthModal}
            className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer font-medium"
          >
            {t.auth.continueGuest}
          </button>
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
            <span>{t.auth.officialPortal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
