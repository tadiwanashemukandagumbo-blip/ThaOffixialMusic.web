'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { KeyRound, ShieldAlert, CheckCircle2, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { ARTIST_CONFIG } from '@/config/artist';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || '';
  const tokenParam = searchParams.get('token') || '';

  const { resetPassword } = useAuth();

  const [email, setEmail] = useState(emailParam || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please provide your fan account email address.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = resetPassword(email.trim(), tokenParam, newPassword);
      if (res.success) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setError(res.error || 'Failed to update password');
        setIsSubmitting(false);
      }
    } catch {
      setError('An unexpected error occurred while resetting password');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-md bg-[#0D0D11] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest font-mono mb-3">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>THAOFFIXIAL SECURITY DESK</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white font-outfit uppercase tracking-tight mb-2">
          RESET FAN PASSWORD
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
          This secure portal was triggered after 5 failed password attempts on your fan account. Set a new password to restore full access.
        </p>

        {tokenParam && (
          <div className="mb-6 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-between text-xs text-amber-300">
            <span className="font-mono truncate">Token: {tokenParam}</span>
            <span className="text-[10px] font-bold uppercase bg-amber-400/20 px-2 py-0.5 rounded text-amber-300">VERIFIED</span>
          </div>
        )}

        {isSuccess ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-white font-outfit mb-2">Password Reset Successful!</h2>
            <p className="text-xs text-zinc-400 max-w-xs leading-relaxed mb-6">
              Your account password has been successfully updated. You are now authenticated with official portal access. Redirecting to home...
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFB800] text-black font-black text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors"
            >
              <span>Go to Home Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1.5">Account Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="fan@thaofficial.com"
                className="w-full bg-[#15151A] border border-white/10 rounded-xl px-4 py-3 text-white text-xs sm:text-sm placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1.5">New Password (min 6 characters)</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#15151A] border border-white/10 rounded-xl px-4 py-3 pl-11 text-white text-xs sm:text-sm placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1.5">Confirm New Password</label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#15151A] border border-white/10 rounded-xl px-4 py-3 pl-11 text-white text-xs sm:text-sm placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 py-3.5 rounded-xl bg-[#FFB800] hover:bg-amber-400 text-black font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'UPDATING CREDENTIALS...' : 'CONFIRM NEW PASSWORD'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="mt-6 pt-5 border-t border-white/10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to ThaOffixial Hub</span>
          </Link>
          <p className="text-[11px] text-zinc-600 mt-2 font-mono">
            {ARTIST_CONFIG.imprint} · Managed by Mr Arts
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-zinc-400 text-xs font-mono">Loading Security Portal...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
