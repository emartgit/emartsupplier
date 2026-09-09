import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function Clock() {
  const { lang } = useLanguage();
  const locale = lang === 'zh' ? 'zh-CN' : 'en-GB';
  const [now, setNow] = useState(() => getMalaysiaTime(locale));

  useEffect(() => {
    const id = setInterval(() => setNow(getMalaysiaTime(locale)), 1000);
    return () => clearInterval(id);
  }, [locale]);

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      <div className="tabular-nums">
        <span className="font-semibold text-gray-800 dark:text-white">{now.time}</span>
        <span className="hidden sm:inline">
          <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
          <span>{now.date}</span>
          <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">(MYT · GMT+8)</span>
        </span>
      </div>
    </div>
  );
}

function getMalaysiaTime(locale: string) {
  const opts: Intl.DateTimeFormatOptions = { timeZone: 'Asia/Kuala_Lumpur' };
  const date = new Date();
  return {
    time: date.toLocaleTimeString('en-GB', { ...opts, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    date: date.toLocaleDateString(locale, { ...opts, weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }),
  };
}
