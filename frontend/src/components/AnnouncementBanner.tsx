import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

const EVENT_START = new Date('2026-09-12T00:00:00+08:00');
const EVENT_END   = new Date('2026-09-16T23:59:59+08:00');
const SLIDE_INTERVAL = 4000;
const BANNER_HEIGHT  = 260;

const SLIDES = [
  { src: '/logos/916.jpeg',            alt: '916 Member Day',  showCountdown: true  },
  { src: '/logos/goceli.jpg',          alt: 'Goceli Opening Soon', showCountdown: false },
  { src: '/logos/keningauoutlet.jpeg', alt: 'Keningau Outlet', showCountdown: false },
];

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
  const [slide, setSlide]       = useState(0);
  const [fading, setFading]     = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now());
      setTimeLeft(getTimeLeft(EVENT_START));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setSlide(s => (s + 1) % SLIDES.length);
        setFading(false);
      }, 400);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  const isLive = now >= EVENT_START.getTime() && now <= EVENT_END.getTime();
  const isOver = now > EVENT_END.getTime();
  if (isOver) return null;

  const labels = lang === 'zh'
    ? { days: '天', hours: '时', mins: '分', secs: '秒', live: '🎉 活动正在进行中！' }
    : lang === 'ms'
    ? { days: 'Hari', hours: 'Jam', mins: 'Min', secs: 'Saat', live: '🎉 Acara sedang berlangsung!' }
    : { days: 'Days', hours: 'Hrs', mins: 'Min', secs: 'Sec', live: '🎉 Event is LIVE now!' };

  const current = SLIDES[slide];

  return (
    <div className="w-full max-w-md mx-auto mb-4 rounded-2xl overflow-hidden shadow-lg border border-yellow-400/30"
         style={{ background: '#0f1f5c' }}>

      {/* Fixed-height image area */}
      <div className="relative w-full" style={{ height: `${BANNER_HEIGHT}px` }}>

        {/* Slide — image + overlay fade together */}
        <div className="absolute inset-0"
             style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.4s ease' }}>
          {/* Blurred background fills any gaps — same image scaled+blurred */}
          <img
            src={current.src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover scale-110"
            style={{ filter: 'blur(14px) brightness(0.55)' }}
          />
          {/* Foreground — full image, no cropping */}
          <img
            src={current.src}
            alt={current.alt}
            className="relative w-full h-full object-contain z-10"
          />

          {/* Countdown overlay — only on slides that want it */}
          {current.showCountdown && (
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 text-center z-20"
                 style={{ background: 'linear-gradient(to top, rgba(10,20,70,0.75) 60%, transparent)' }}>
              {isLive ? (
                <p className="text-green-300 font-bold text-sm animate-pulse drop-shadow">{labels.live}</p>
              ) : timeLeft ? (
                <div className="flex justify-center gap-2">
                  {[
                    { v: timeLeft.days,    l: labels.days  },
                    { v: timeLeft.hours,   l: labels.hours },
                    { v: timeLeft.minutes, l: labels.mins  },
                    { v: timeLeft.seconds, l: labels.secs  },
                  ].map(({ v, l }) => (
                    <div key={l} className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl tabular-nums text-white"
                           style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                        {String(v).padStart(2, '0')}
                      </div>
                      <span className="text-yellow-300 text-[10px] font-semibold mt-1 uppercase tracking-wide drop-shadow">{l}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-2 right-3 flex gap-1.5 z-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setFading(true); setTimeout(() => { setSlide(i); setFading(false); }, 400); }}
              className="w-1.5 h-1.5 rounded-full transition-all"
              style={{ background: i === slide ? '#ffd700' : 'rgba(255,255,255,0.4)' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
