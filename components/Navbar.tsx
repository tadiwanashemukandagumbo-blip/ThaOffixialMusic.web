'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, User, Calendar, LogOut, ShieldCheck } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { ARTIST_CONFIG } from '@/config/artist';
import { useLanguage, Language } from '@/lib/language-context';
import { useAuth } from '@/lib/auth-context';
import BioMegaMenu from '@/components/BioMegaMenu';
import AdminDashboardModal from '@/components/AdminDashboardModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBioHovered, setIsBioHovered] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, cycleLang, t } = useLanguage();
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnterBio = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsBioHovered(true);
  };

  const handleMouseLeaveBio = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsBioHovered(false);
    }, 150);
  };

  const navLinks = [
    { name: t.nav.bio, href: '/#bio', isBio: true },
    { name: t.nav.music, href: '/#music', isBio: false },
    { name: t.nav.visuals, href: '/#visuals', isBio: false },
    { name: t.nav.tour, href: '/#tour', isBio: false },
    { name: t.nav.social, href: '/#social', isBio: false },
    { name: t.nav.store, href: '/#store', isBio: false },
    { name: t.nav.community, href: '/#community', isBio: false },
  ];

  const languages: { code: Language; label: string; full: string }[] = [
    { code: 'EN', label: 'EN', full: 'English' },
    { code: 'SN', label: 'SN', full: 'Shona' },
    { code: 'ND', label: 'ND', full: 'Ndebele' },
  ];

  if (pathname === '/admin') {
    return null;
  }

  return (
    <div className="navbar-container">
      {/* Administrator Banner on Public Pages when Admin is logged in */}
      {isAuthenticated && user?.role === 'admin' && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-black px-4 py-1.5 text-xs font-black uppercase tracking-wider flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2 truncate">
            <ShieldCheck className="w-4 h-4" />
            <span className="truncate">Administrator Mode Active: {user.name} ({user.email})</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/admin"
              className="px-2.5 py-0.5 rounded-md bg-black text-amber-400 font-mono text-[11px] font-bold hover:bg-zinc-900 transition-colors"
            >
              Open Command Center →
            </Link>
            <button
              onClick={logout}
              className="text-black/80 hover:text-black underline text-[11px]"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          isAuthenticated && user?.role === 'admin' ? 'top-8' : 'top-0'
        } ${
          isScrolled || isBioHovered
            ? 'bg-[#050505]/95 backdrop-blur-md border-b border-white/10 py-4 shadow-xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Wordmark with LE Badge */}
          <Link
            href="/"
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-black font-black text-xs flex items-center justify-center font-outfit shadow-md group-hover:scale-105 transition-transform">
              LE
            </div>
            <span className="text-sm sm:text-base md:text-lg font-extrabold tracking-tighter text-white font-outfit uppercase truncate">
              {ARTIST_CONFIG.name}
            </span>
          </Link>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden xl:flex items-center gap-7 text-xs font-semibold text-zinc-300 tracking-wider uppercase">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.isBio) {
                return (
                  <div
                    key={link.name}
                    onMouseEnter={handleMouseEnterBio}
                    onMouseLeave={handleMouseLeaveBio}
                    className="relative py-1"
                  >
                    <Link
                      href={link.href}
                      className={`transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                        isActive || isBioHovered ? 'text-amber-400 font-bold' : 'hover:text-white text-zinc-400'
                      }`}
                    >
                      <span>{link.name}</span>
                      <span className="text-[10px] text-amber-400/80">▾</span>
                    </Link>
                    {(isActive || isBioHovered) && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-colors whitespace-nowrap py-1 relative ${
                    isActive ? 'text-amber-400 font-bold' : 'hover:text-white text-zinc-400'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Language Selector EN | SN | ND, User Profile / Sign In, Book Artist) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Language Switcher Control */}
            <div className="flex items-center bg-zinc-900 border border-white/10 rounded-full p-1 text-xs shadow-sm">
              <div className="px-2 text-zinc-500 flex items-center gap-1 font-mono">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
              </div>
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLang(l.code)}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    lang === l.code
                      ? 'bg-amber-500 text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title={`Switch website language to ${l.full}`}
                >
                  <span>{l.label}</span>
                  <span className="hidden 2xl:inline ml-1 text-[10px] opacity-80">({l.full})</span>
                </button>
              ))}
            </div>

            {/* User Auth or Sign In button */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2 pl-1">
                {user.role === 'admin' ? (
                  <Link
                    href="/admin"
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-black flex items-center gap-1.5 hover:scale-105 transition-all shadow-md shadow-amber-500/10 cursor-pointer"
                    title="Open Administrator Command Center"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span className="truncate max-w-[150px]">ADMIN CONSOLE</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => openAuthModal('signin')}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-500/20 transition-colors cursor-pointer"
                    title="Account Profile"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span className="truncate max-w-[130px]">
                      {`${t.nav.fan}: ${user.name}`}
                    </span>
                  </button>
                )}
                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-white/5 transition-colors cursor-pointer"
                  title={t.nav.signOut}
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('signin')}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                {t.nav.signIn}
              </button>
            )}

            <Link
              href="/#booking"
              className="px-5 py-2.5 text-xs font-extrabold uppercase tracking-widest text-black bg-amber-500 hover:bg-amber-400 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              {t.nav.bookArtist}
            </Link>
          </div>

          {/* Mobile Menu & Quick Lang Button */}
          <div className="xl:hidden flex items-center gap-2">
            {/* Mobile direct cycle language button */}
            <button
              type="button"
              onClick={cycleLang}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-xs text-amber-400 font-mono font-bold"
              title="Switch Language (EN / SN / ND)"
            >
              <Globe className="w-3 h-3" />
              <span>{lang}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Hover Bio Mega Menu Container */}
        <div
          onMouseEnter={handleMouseEnterBio}
          onMouseLeave={handleMouseLeaveBio}
          className="hidden xl:block"
        >
          <AnimatePresence>
            {isBioHovered && <BioMegaMenu onClose={() => setIsBioHovered(false)} />}
          </AnimatePresence>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden absolute top-full left-0 right-0 bg-[#0F0F11]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            {/* Mobile Language Switcher */}
            <div className="flex flex-col gap-2 pb-4 border-b border-white/10">
              <span className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                Language / Mutauro / Ulimi:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLang(l.code)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold font-mono transition-all text-center ${
                      lang === l.code
                        ? 'bg-amber-500 text-black shadow-md font-extrabold'
                        : 'bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white'
                    }`}
                  >
                    {l.label} ({l.full})
                  </button>
                ))}
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold py-1.5 uppercase tracking-wider transition-colors ${
                  pathname === link.href ? 'text-amber-400 font-bold' : 'text-zinc-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              {isAuthenticated && user ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    {user.role === 'admin' ? `${t.nav.admin}: ${user.name}` : `${t.nav.fan}: ${user.name}`}
                  </span>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="text-rose-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" /> {t.nav.signOut}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('signin');
                  }}
                  className="w-full py-3 text-center text-xs font-bold uppercase tracking-widest text-zinc-200 bg-zinc-900 border border-white/10 rounded-xl"
                >
                  {t.nav.signIn} / Fan Portal
                </button>
              )}

              <Link
                href="/#booking"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 text-center text-xs font-extrabold uppercase tracking-widest text-black bg-amber-500 rounded-xl shadow-lg shadow-amber-500/20"
              >
                {t.nav.bookArtist}
              </Link>
            </div>
          </div>
        )}

        {/* Admin Command Center Dashboard Modal */}
        <AdminDashboardModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
        />
      </header>
    </div>
  );
}
