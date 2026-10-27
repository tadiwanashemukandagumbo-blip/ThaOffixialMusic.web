'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GALLERY_ITEMS, GalleryItem } from '@/config/artist';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LightboxModal from '@/components/LightboxModal';
import { Maximize2 } from 'lucide-react';

export default function GalleryPage() {
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Live', 'Studio', 'Portrait', 'BTS'];

  const filteredItems = filter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === filter);

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#FAFAFA] overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-red-500 font-outfit">Visual Archive</span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white font-outfit tracking-tight mt-2">
                Photo Gallery
              </h1>
              <p className="text-zinc-400 text-sm md:text-base mt-4 max-w-2xl font-light">
                High-resolution photography from live concert performances, studio recording sessions, and editorial shoots.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-white/10 rounded-full overflow-x-auto max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full transition-all whitespace-nowrap ${
                    filter === cat
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px] sm:auto-rows-[300px]">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveImage(item)}
                className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 cursor-pointer min-h-[280px]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-red-500 font-semibold uppercase tracking-wider">{item.category}</span>
                      <h3 className="text-lg font-bold text-white font-outfit mt-0.5">{item.title}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white shrink-0">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {activeImage && (
        <LightboxModal
          image={activeImage.image}
          title={activeImage.title}
          category={activeImage.category}
          isOpen={!!activeImage}
          onClose={() => setActiveImage(null)}
        />
      )}
    </div>
  );
}
