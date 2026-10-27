'use client';

import React, { useState } from 'react';
import { ARTIST_CONFIG } from '@/config/artist';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, CheckCircle2, Send, MapPin, Clock, FileText, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function ContactPage() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    inquiryCategory: 'Festival Headline / Stage Performance',
    promoter: '',
    contactPerson: '',
    email: '',
    showDate: '',
    cityCountry: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.promoter || !formData.email || !formData.message) {
      setError('Please fill in all required fields (Organization, Email, and Notes).');
      return;
    }
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#FAFAFA] overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-outfit">
                {t.booking.kicker}
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white font-outfit tracking-tight mt-2">
                {t.booking.title}
              </h1>
              <p className="text-zinc-400 text-sm md:text-base mt-4 max-w-2xl font-light">
                {t.booking.subtitle}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-zinc-500 block">{t.booking.managementLabel}</span>
              <span className="text-sm font-bold text-amber-400">{ARTIST_CONFIG.management}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Info Card */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-[#0F0F11] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">{t.booking.officialContacts}</span>
                <h3 className="text-2xl font-extrabold text-white font-outfit mb-4">{t.booking.managementOffice}</h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                  {t.booking.managementText}
                </p>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-zinc-500 block">{t.booking.managementLabel} ({ARTIST_CONFIG.management})</span>
                      <p className="text-sm font-bold text-white mt-0.5 font-mono">
                        {ARTIST_CONFIG.managementEmail}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-zinc-500 block">Origin / Operations</span>
                      <p className="text-sm font-semibold text-white">{t.booking.originLabel}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-start gap-3">
                    <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-zinc-500 block">Response Window</span>
                      <p className="text-sm font-semibold text-white">{t.booking.responseWindow}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href={`mailto:${ARTIST_CONFIG.managementEmail}?subject=LilEthan%20Booking%20Inquiry`}
                    className="w-full py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-amber-400" /> {t.booking.emailDirectly} ↗
                  </a>
                </div>
              </div>

              {/* Advance Booking Note */}
              <div className="bg-[#0F0F11] border border-white/10 rounded-2xl p-6 flex items-start gap-4">
                <FileText className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t.booking.contractTitle}</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {t.booking.contractText}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Booking Form */}
            <div className="lg:col-span-7 bg-[#0F0F11] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
              {submitted ? (
                <div className="py-20 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-outfit mb-2">{t.booking.inquiryReceived}</h3>
                  <p className="text-zinc-400 text-sm max-w-md mb-8">
                    {t.booking.inquirySuccess}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        inquiryCategory: 'Festival Headline / Stage Performance',
                        promoter: '',
                        contactPerson: '',
                        email: '',
                        showDate: '',
                        cityCountry: '',
                        budget: '',
                        message: '',
                      });
                    }}
                    className="px-8 py-3.5 rounded-full bg-amber-500 text-black font-extrabold text-xs uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Submit Another Proposal
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white font-outfit mb-1">{t.booking.formTitle}</h3>
                    <p className="text-xs text-zinc-400">{t.booking.subtitle}</p>
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-red-950/50 border border-red-600/30 text-red-400 text-xs font-medium">
                      {error}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">{t.booking.categoryLabel}</label>
                    <select
                      value={formData.inquiryCategory}
                      onChange={(e) => setFormData({ ...formData, inquiryCategory: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500"
                    >
                      <option value="Festival Headline / Stage Performance" className="bg-zinc-900">Festival Headline / Stage Performance</option>
                      <option value="Collaborations & Features" className="bg-zinc-900">Collaborations &amp; Features</option>
                      <option value="Corporate Appearance & Brand Partnership" className="bg-zinc-900">Corporate Appearance &amp; Brand Partnership</option>
                      <option value="Media Press Interview" className="bg-zinc-900">Media Press Interview</option>
                      <option value="Other" className="bg-zinc-900">Other</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">{t.booking.promoterLabel} *</label>
                      <input
                        type="text"
                        required
                        value={formData.promoter}
                        onChange={(e) => setFormData({ ...formData, promoter: e.target.value })}
                        placeholder={t.booking.promoterPlaceholder}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">{t.booking.contactLabel}</label>
                      <input
                        type="text"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        placeholder={t.booking.contactPlaceholder}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">{t.booking.emailLabel} *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.booking.emailPlaceholder}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">{t.booking.dateLabel}</label>
                      <input
                        type="date"
                        value={formData.showDate}
                        onChange={(e) => setFormData({ ...formData, showDate: e.target.value })}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">{t.booking.cityLabel}</label>
                      <input
                        type="text"
                        value={formData.cityCountry}
                        onChange={(e) => setFormData({ ...formData, cityCountry: e.target.value })}
                        placeholder={t.booking.cityPlaceholder}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">{t.booking.budgetLabel}</label>
                      <input
                        type="text"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        placeholder={t.booking.budgetPlaceholder}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">{t.booking.notesLabel} *</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.booking.notesPlaceholder}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 disabled:opacity-50 mt-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending Booking Proposal...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {t.booking.sendBooking}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
