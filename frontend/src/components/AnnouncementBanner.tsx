import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

const EVENT_START = new Date('2026-09-12T00:00:00+08:00');
const EVENT_END   = new Date('2026-09-16T23:59:59+08:00');

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
  };
}

export default function AnnouncementBanner() {
  const { lang } = useLanguage();
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(EVENT_START));
  const [now, setNow]           = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now());
      setTimeLeft(getTimeLeft(EVENT_START));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const isLive = now >= EVENT_START.getTime() && now <= EVENT_END.getTime();
  const isOver = now > EVENT_END.getTime();
  if (isOver) return null;

  const labels = lang === 'zh'
    ? { title: '超级会员日', sub: '会员专属优惠活动', days: '天', hours: '时', mins: '分', secs: '秒', live: '🎉 活动正在进行中！', until: '活动日期' }
    : { title: '916 Member Day', sub: 'Exclusive member promotions', days: 'Days', hours: 'Hrs', mins: 'Min', secs: 'Sec', live: '🎉 Event is LIVE now!', until: 'Event dates' };

  return (
    <div className="w-full max-w-md mx-auto mb-4 rounded-2xl overflow-hidden shadow-lg border border-yellow-400/30"
         style={{ background: 'linear-gradient(135deg, #0f1f5c 0%, #1a3080 50%, #0f1f5c 100%)' }}>

      {/* Top strip */}
      <div className="flex items-center justify-center gap-2 py-1.5 px-4"
           style={{ background: 'linear-gradient(90deg, #b8860b, #ffd700, #b8860b)' }}>
        <span className="text-[11px] font-bold tracking-widest text-[#0f1f5c] uppercase">
          {lang === 'zh' ? '🎊 超级会员日 · 敬请期待' : '🎊 Emart Group · Stay Tuned'}
        </span>
      </div>

      <div className="px-5 py-4 text-center">
        {/* Title */}
        <p className="text-3xl font-black tracking-tight"
           style={{ background: 'linear-gradient(180deg,#ffe066,#ffd700,#b8860b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          916
        </p>
        <p className="text-white font-bold text-base mt-0.5">{labels.title}</p>
        <p className="text-blue-200 text-xs mt-0.5">{labels.sub}</p>

        {/* Date badge */}
        <div className="inline-block mt-3 px-4 py-1 rounded-full border border-yellow-400/50 bg-yellow-400/10">
          <span className="text-yellow-300 text-xs font-semibold">📅 12 – 16 Sept 2026</span>
        </div>

        {/* Countdown or LIVE */}
        <div className="mt-4">
          {isLive ? (
            <div className="rounded-xl py-3 px-4 bg-green-500/20 border border-green-400/40">
              <p className="text-green-300 font-bold text-base animate-pulse">{labels.live}</p>
              <p className="text-green-200 text-xs mt-0.5">
                {lang === 'zh' ? '12–16 Sept 2026' : '12–16 Sept 2026'}
              </p>
            </div>
          ) : timeLeft ? (
            <>
              <p className="text-blue-200 text-[11px] uppercase tracking-widest mb-2">
                {lang === 'zh' ? '倒计时' : 'Countdown'}
              </p>
              <div className="flex justify-center gap-2">
                {[
                  { v: timeLeft.days,    l: labels.days  },
                  { v: timeLeft.hours,   l: labels.hours },
                  { v: timeLeft.minutes, l: labels.mins  },
                  { v: timeLeft.seconds, l: labels.secs  },
                ].map(({ v, l }) => (
                  <div key={l} className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center font-black text-2xl tabular-nums text-white"
                         style={{ background: 'linear-gradient(135deg,#1e3a8a,#1d4ed8)' , boxShadow: '0 0 12px rgba(250,204,21,0.25)' }}>
                      {String(v).padStart(2, '0')}
                    </div>
                    <span className="text-yellow-400 text-[10px] font-semibold mt-1 uppercase tracking-wide">{l}</span>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
