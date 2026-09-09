import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { translations, type Lang, type Translations } from './translations';

interface LangContextValue {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
}

const CYCLE: Lang[] = ['en', 'ms', 'zh'];
const LANG_TAG: Record<Lang, string> = { en: 'en', ms: 'ms', zh: 'zh-Hans' };

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try { return (localStorage.getItem('lang') as Lang) ?? 'en'; } catch { return 'en'; }
  });

  useEffect(() => {
    try { localStorage.setItem('lang', lang); } catch {}
    document.documentElement.lang = LANG_TAG[lang];
  }, [lang]);

  function toggleLang() {
    setLang(l => {
      const idx = CYCLE.indexOf(l);
      return CYCLE[(idx + 1) % CYCLE.length];
    });
  }

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
