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

            {/* Header — gradient */}
            <div className="relative px-5 py-5 overflow-hidden"
                 style={{ background: 'linear-gradient(135deg,#1e3a8a 0%,#4f46e5 100%)' }}>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white font-black text-lg backdrop-blur-sm">?</div>
                  <div>
                    <h2 className="text-base font-bold text-white">{t.helpTitle}</h2>
                    <p className="text-xs text-blue-200 mt-0.5">Quick answers for you</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors text-lg leading-none"
                >×</button>
              </div>
              {/* Decorative circles */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
            </div>

            {/* FAQ list */}
            <div className="p-4 space-y-3 max-h-[55vh] overflow-y-auto custom-scroll">
              {faqs.map(({ q, a }, i) => {
                const accents = [
                  { border: '#3b82f6', bg: 'rgba(59,130,246,0.08)', icon: '💡' },
                  { border: '#10b981', bg: 'rgba(16,185,129,0.08)', icon: '🔍' },
                  { border: '#f59e0b', bg: 'rgba(245,158,11,0.08)', icon: '⚠️' },
                  { border: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', icon: '📞' },
                ];
                const acc = accents[i];
                return (
                  <div
                    key={i}
                    className="rounded-xl p-4 transition-all duration-200"
                    style={{
                      borderLeft: `3px solid ${acc.border}`,
                      background: acc.bg,
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-base leading-none mt-0.5 shrink-0">{acc.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{q}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-4 pb-4 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-5 py-2 rounded-xl text-white text-sm font-semibold transition-all duration-200 active:scale-95"
                style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)' }}
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
