'use client';

import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface LightboxModalProps {
  image: string;
  title: string;
  category?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function LightboxModal({ image, title, category, isOpen, onClose }: LightboxModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-zinc-400 hover:text-white transition-colors rounded-full bg-zinc-900/80 border border-white/10"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="relative w-full aspect-[4/3] md:aspect-[16/10] max-h-[75vh] rounded-xl overflow-hidden bg-zinc-900 border border-white/10">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-lg font-bold text-white font-outfit">{title}</h3>
          {category && <p className="text-xs text-red-500 uppercase tracking-widest mt-1">{category}</p>}
        </div>
      </div>
    </div>
  );
}
