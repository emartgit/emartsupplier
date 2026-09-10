import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';

function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const colors = ['#3b82f6','#22c55e','#f59e0b','#ec4899','#8b5cf6','#06b6d4','#f97316'];
    const particles = Array.from({ length: 140 }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight * 0.45,
      vx: (Math.random() - 0.5) * 18,
      vy: Math.random() * -16 - 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      w: Math.random() * 9 + 4,
      h: Math.random() * 5 + 3,
      rotation: Math.random() * Math.PI * 2,
      rs: (Math.random() - 0.5) * 0.25,
    }));
    let id: number;
    let frame = 0;
    const TOTAL = 160;
    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35;
        p.vx *= 0.98;
        p.rotation += p.rs;
        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.rotate(p.rotation);
        ctx!.globalAlpha = Math.max(0, 1 - frame / TOTAL);
        ctx!.fillStyle = p.color;
        ctx!.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx!.restore();
      });
      frame++;
      if (frame < TOTAL) id = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(id);
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />;
}

const COUNTDOWN = 5;

export default function SuccessPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const supplier: string = location.state?.supplier ?? '';
  const [seconds, setSeconds] = useState(COUNTDOWN);

  useEffect(() => {
    if (!supplier) return;
    if (seconds <= 0) { navigate('/', { replace: true }); return; }
    const id = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(id);
  }, [seconds, navigate, supplier]);

  if (!supplier) return <Navigate to="/" replace />;

  return (
    <Layout>
      <Confetti />
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 my-6 text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t.successTitle}</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          {t.thankYouPrefix}<span className="font-medium text-gray-700 dark:text-gray-200">{supplier}</span>.{' '}
          {t.codesRecorded}
        </p>

        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-200 dark:text-gray-700" />
              <circle
                cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="3"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - seconds / COUNTDOWN)}`}
                strokeLinecap="round"
                className="text-blue-500 transition-all duration-1000 ease-linear"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700 dark:text-gray-200">
              {seconds}
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {t.redirecting.replace('{n}', String(seconds))}
          </p>
        </div>
      </div>
    </Layout>
  );
}
