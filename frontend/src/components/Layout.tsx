import { type ReactNode, useEffect, useState } from 'react';
import Clock from '@/components/Clock';
import LogoMarquee from '@/components/LogoMarquee';
import Footer from '@/components/Footer';
import { useLanguage } from '@/i18n/LanguageContext';
import { useNav } from '@/NavContext';

interface Props {
  children: ReactNode;
  showMarquee?: boolean;
}

export default function Layout({ children, showMarquee = true }: Props) {
  const { t, toggleLang } = useLanguage();
  const { goHome } = useNav();
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('theme') === 'dark'; } catch { return false; }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) { root.classList.add('dark'); localStorage.setItem('theme', 'dark'); }
    else { root.classList.remove('dark'); localStorage.setItem('theme', 'light'); }
  }, [dark]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-10">
        <div className="w-full px-6 py-3 flex items-center justify-between">
          <button onClick={goHome} className="flex items-center gap-3 focus:outline-none" title="Go to home">
            <img
              src="/logos/GROUPHOLDING_TRADEMARK_BLACK.png"
              alt="Emart Holdings"
              className="h-10 md:h-12 w-auto object-contain dark:[filter:drop-shadow(0_0_1px_rgba(255,255,255,0.85))] hover:opacity-80 transition-opacity"
            />
          </button>
          <div className="flex items-center gap-4">
            <Clock />
            <button
              onClick={toggleLang}
              className="px-2.5 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-xs font-semibold tracking-wide"
              title="切换语言 / Switch language"
            >
              {t.switchLang}
            </button>
            <button
              onClick={() => setDark(d => !d)}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={dark ? t.switchLight : t.switchDark}
            >
              {dark ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14A7 7 0 0012 5z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {children}
      </main>

      {/* Brand marquee */}
      {showMarquee && (
        <div className="bg-white/60 dark:bg-transparent">
          <p className="text-center text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 pt-3">
            {t.ourBrands}
          </p>
          <LogoMarquee />
        </div>
      )}

      <Footer />
    </div>
  );
}
