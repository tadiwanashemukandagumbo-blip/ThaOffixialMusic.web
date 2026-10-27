'use client';

import React, { createContext, useContext, useState } from 'react';
import { translations, Language, TranslationDict } from '@/lib/i18n';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  cycleLang: () => void;
  t: TranslationDict;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'EN',
  setLang: () => {},
  cycleLang: () => {},
  t: translations.EN,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('thaoffixial_lang');
        if (stored === 'EN' || stored === 'SN' || stored === 'ND') {
          return stored;
        }
      } catch {
        // ignore
      }
    }
    return 'EN';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('thaoffixial_lang', newLang);
      } catch {
        // ignore
      }
    }
  };

  const cycleLang = () => {
    const next: Language = lang === 'EN' ? 'SN' : lang === 'SN' ? 'ND' : 'EN';
    setLang(next);
  };

  const value: LanguageContextType = {
    lang,
    setLang,
    cycleLang,
    t: translations[lang] || translations.EN,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
export type { Language, TranslationDict };
