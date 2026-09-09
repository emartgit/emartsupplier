import { useLanguage } from '@/i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  return (
    <footer className="mt-8 py-6 text-center text-xs text-gray-500 dark:text-gray-400 space-y-1">
      <p>
        &copy; {year}{' '}
        <span className="font-semibold text-gray-700 dark:text-gray-200">Emart Holdings Sdn Bhd</span>. {t.allRightsReserved}
      </p>
      <p className="text-gray-400 dark:text-gray-500">
        {t.builtBy} <span className="font-medium text-gray-600 dark:text-gray-300">Shawn</span> · {t.dept}
      </p>
    </footer>
  );
}
