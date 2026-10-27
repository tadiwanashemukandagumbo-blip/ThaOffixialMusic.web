import type {Metadata} from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/language-context';
import { AuthProvider } from '@/lib/auth-context';
import AuthModal from '@/components/AuthModal';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import CinematicIntro from '@/components/CinematicIntro';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LilEthanThaOffixial | Official Website',
  description: 'From Africa to the world. Explore the official music catalogue, cinematic videos, biography, and booking for LilEthanThaOffixial.',
  openGraph: {
    title: 'LilEthanThaOffixial | Official Website',
    description: 'Afrobeats, R&B, Trap, and Afro-fusion from Zimbabwe to the world.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LilEthanThaOffixial | Official Website',
    description: 'Afrobeats, R&B, Trap, and Afro-fusion from Zimbabwe to the world.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable} dark scroll-smooth`}>
      <body className="bg-[#050505] text-[#FAFAFA] font-sans antialiased selection:bg-amber-500 selection:text-black min-h-screen flex flex-col suppressHydrationWarning relative">
        <AuthProvider>
          <LanguageProvider>
            <CinematicIntro />
            <BackgroundAnimation />
            {children}
            <AuthModal />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
