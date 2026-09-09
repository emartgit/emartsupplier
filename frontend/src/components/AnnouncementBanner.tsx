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

      {/* Promo image */}
      <img
        src="/logos/916.jpeg"
        alt="916 Member Day"
        className="w-full object-cover"
        style={{ maxHeight: '220px', objectPosition: 'center top' }}
      />

      {/* Countdown or LIVE strip */}
      <div className="px-4 py-3 text-center">
        {isLive ? (
          <div className="py-2">
            <p className="text-green-300 font-bold text-sm animate-pulse">{labels.live}</p>
            <p className="text-blue-200 text-xs mt-0.5">12–16 Sept 2026</p>
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
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl tabular-nums text-white"
                       style={{ background: 'linear-gradient(135deg,#1e3a8a,#1d4ed8)', boxShadow: '0 0 12px rgba(250,204,21,0.25)' }}>
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
  );
}
