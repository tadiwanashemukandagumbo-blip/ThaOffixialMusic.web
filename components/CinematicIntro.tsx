'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Play, Volume2, ArrowRight } from 'lucide-react';
import { ARTIST_CONFIG } from '@/config/artist';

export default function CinematicIntro() {
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const hasSeen = sessionStorage.getItem('thaoffixial_cinematic_seen');
        return !hasSeen;
      } catch {
        return true;
      }
    }
    return false;
  });

  const [phase, setPhase] = useState<1 | 2 | 3>(1);

  const handleClose = useCallback(() => {
    setVisible(false);
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('thaoffixial_cinematic_seen', 'true');
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    if (!visible) return;

    // Accelerated, crisp timeline phases
    const t1 = setTimeout(() => setPhase(2), 400);
    const t2 = setTimeout(() => setPhase(3), 900);
    const t3 = setTimeout(() => {
      handleClose();
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [visible, handleClose]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-50 bg-[#030304] text-white flex flex-col items-center justify-between p-6 sm:p-12 overflow-hidden select-none cursor-pointer"
          onClick={handleClose}
        >
          {/* Background Ambient Aura */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            {/* Glowing Center Core */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-amber-500/30 via-orange-600/20 to-purple-900/10 blur-[120px]"
            />

            {/* Acoustic Equalizer Wave Visualizer in background */}
            <div className="absolute inset-x-0 bottom-0 h-40 flex items-end justify-center gap-1.5 opacity-20 px-8">
              {Array.from({ length: 48 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: ['15%', `${35 + Math.sin(i * 0.4) * 55}%`, '15%'],
                  }}
                  transition={{
                    duration: 0.8 + (i % 5) * 0.15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: (i % 7) * 0.05,
                  }}
                  className="w-1.5 bg-gradient-to-t from-amber-500 to-amber-300 rounded-t-full"
                />
              ))}
            </div>
          </div>

          {/* Top Bar (Brand & Skip Intro) */}
          <div className="w-full max-w-7xl flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                OFFICIAL EXPERIENCE • 2026
              </span>
            </div>

            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer"
            >
              SKIP INTRO ➔
            </button>
          </div>

          {/* Main Content Animation Stack */}
          <div className="my-auto text-center max-w-4xl mx-auto flex flex-col items-center justify-center z-10 px-4">
            {/* Kicker Phase 1 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.3em] text-amber-400 font-outfit">
                THAOFFIXIAL MUSIC PRESENTS
              </span>
            </motion.div>

            {/* Title Phase 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400 font-outfit leading-none mb-3">
                {ARTIST_CONFIG.name}
              </h1>
            </motion.div>

            {/* Real Name & Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="text-base sm:text-2xl font-bold text-amber-400 font-outfit uppercase tracking-widest mb-4"
            >
              {ARTIST_CONFIG.realName} · AFROBEATS • R&amp;B • TRAP
            </motion.p>

            {/* Subtext Phase 3 */}
            {phase >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-3 max-w-xl mx-auto"
              >
                <p className="text-xs sm:text-sm text-zinc-300 font-light tracking-wider uppercase font-mono">
                  FROM ZVISHAVANE &amp; HARARE, ZIMBABWE TO THE WORLD
                </p>

                {/* Single Banner Highlight */}
                <div className="p-2.5 px-4 rounded-xl bg-zinc-900/90 border border-amber-500/30 flex items-center gap-3 shadow-xl">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500 text-black flex items-center justify-center font-bold text-xs shrink-0">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-amber-400 font-mono font-bold block uppercase tracking-wider">OFFICIAL SINGLE</span>
                    <span className="text-xs font-bold text-white font-outfit">&ldquo;RUDO&rdquo; · OUT NOW ON DSPs</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Enter Portal CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="mt-6"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClose}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-2 cursor-pointer"
              >
                <span>ENTER PORTAL</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="w-full max-w-7xl flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 font-mono gap-2 z-10">
            <span>© 2026 THAOFFIXIALMUSIC RECS</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 text-amber-400" /> TAP ANYWHERE TO ENTER
              </span>
              <span>·</span>
              <span>VERIFIED CATALOG</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
