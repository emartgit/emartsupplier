import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

const FAQS = ['1', '2', '3', '4'] as const;

export default function HelpButton() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const faqs = FAQS.map(n => ({
    q: t[`helpQ${n}` as keyof typeof t] as string,
    a: t[`helpA${n}` as keyof typeof t] as string,
  }));

  return (
    <>
      {/* Floating button wrapper */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2">

        {/* Tooltip */}
        <div
          className="text-xs font-semibold text-white px-2.5 py-1 rounded-lg pointer-events-none transition-all duration-200"
          style={{
            background: 'rgba(30,41,59,0.85)',
            backdropFilter: 'blur(6px)',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(4px)',
          }}
        >
          {t.helpTitle}
        </div>

        {/* Pulse ring + button */}
        <div className="relative flex items-center justify-center">
          {/* Ping ring */}
          <span
            className="absolute inline-flex rounded-full opacity-60"
            style={{
              width: '52px', height: '52px',
              background: 'rgba(59,130,246,0.35)',
              animation: 'help-ping 2s ease-out infinite',
            }}
          />
          <button
            onClick={() => setOpen(true)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            aria-label="Help"
            className="relative w-12 h-12 rounded-full text-white flex items-center justify-center text-xl font-black transition-all duration-200 active:scale-95"
            style={{
              background: 'linear-gradient(135deg,#3b82f6 0%,#6366f1 100%)',
              boxShadow: hovered
                ? '0 6px 28px rgba(99,102,241,0.7), 0 0 0 3px rgba(99,102,241,0.25)'
                : '0 4px 18px rgba(59,130,246,0.5)',
              transform: hovered ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            ?
          </button>
        </div>
      </div>

      {/* Modal backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold">?</span>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">{t.helpTitle}</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-lg leading-none"
              >
                ×
              </button>
            </div>

            {/* FAQ list */}
            <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-[60vh] overflow-y-auto custom-scroll">
              {faqs.map(({ q, a }, i) => (
                <div key={i} className="px-5 py-4">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">{q}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-700 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
              >
                {t.helpClose}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
