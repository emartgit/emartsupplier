import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';

const COUNTDOWN = 5;

export default function SuccessPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const supplier: string = location.state?.supplier ?? '';
  const [seconds, setSeconds] = useState(COUNTDOWN);

  if (!supplier) return <Navigate to="/" replace />;

  useEffect(() => {
    if (seconds <= 0) { navigate('/', { replace: true }); return; }
    const id = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(id);
  }, [seconds, navigate]);

  return (
    <Layout>
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
