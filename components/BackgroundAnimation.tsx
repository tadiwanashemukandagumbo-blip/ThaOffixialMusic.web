'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export default function BackgroundAnimation() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subtle floating luxury embers/particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle pool
    const particleCount = 38;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.6,
      alpha: Math.random() * 0.45 + 0.15,
      speedY: -(Math.random() * 0.35 + 0.15),
      speedX: (Math.random() - 0.5) * 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulse += 0.02;

        // Reset if off top or sides
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${currentAlpha})`;
        ctx.shadowColor = 'rgba(245, 158, 11, 0.4)';
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Top Gold Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 origin-left z-50 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
        style={{ scaleX }}
      />

      {/* Background Animated Atmosphere Layer */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
        {/* Soft Noise & Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#050505]/60 to-[#050505] z-10" />

        {/* Ambient Gradient Mesh Orb 1: Rich Golden Amber */}
        <motion.div
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.15, 0.95, 1],
            opacity: [0.18, 0.28, 0.16, 0.18],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-[15%] left-[10%] w-[620px] h-[620px] rounded-full bg-gradient-to-br from-amber-500/40 via-amber-600/20 to-transparent blur-[130px]"
        />

        {/* Ambient Gradient Mesh Orb 2: Deep Crimson / Flame Aura */}
        <motion.div
          animate={{
            x: [0, -70, 50, 0],
            y: [0, 60, -30, 0],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.12, 0.22, 0.14, 0.12],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[40%] -right-[10%] w-[580px] h-[580px] rounded-full bg-gradient-to-bl from-orange-600/30 via-amber-600/15 to-transparent blur-[140px]"
        />

        {/* Ambient Gradient Mesh Orb 3: Violet / Obsidian Studio Glow */}
        <motion.div
          animate={{
            x: [0, 40, -50, 0],
            y: [0, -40, 60, 0],
            scale: [0.95, 1.15, 1, 0.95],
            opacity: [0.1, 0.2, 0.12, 0.1],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-[10%] left-[25%] w-[680px] h-[680px] rounded-full bg-gradient-to-tr from-purple-900/25 via-amber-700/15 to-transparent blur-[150px]"
        />

        {/* Floating Golden Studio Particle Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-60 z-20"
        />

        {/* Subtle Geometric Studio Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] z-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>
    </>
  );
}
