import { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/components/Layout';
import { supplierService } from '@/services/SupplierService';
import { OUTLET_FIELDS, type OutletCodes } from '@/types';
import { useLanguage } from '@/i18n/LanguageContext';

const EMPTY_CODES: OutletCodes = { bk: '', sbk: '', ri: '', sri: '', bt: '', sbu: '' };

export default function EnterCodesPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const supplier: string = location.state?.supplier ?? '';

  const [codes, setCodes] = useState<OutletCodes>(EMPTY_CODES);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  if (!supplier) return <Navigate to="/" replace />;

  function updateCode(field: keyof OutletCodes, value: string) {
    setCodes((prev) => ({ ...prev, [field]: value }));
  }

  async function handleConfirmedSubmit() {
    setSubmitting(true);
    setSubmitError('');
    try {
      await supplierService.submit({ supplier, ...codes });
      navigate('/success', { state: { supplier }, replace: true });
    } catch (e) {
      setSubmitError((e as Error).message);
      setShowConfirm(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layout showMarquee={false}>
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 my-6">
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-4"
          >
            {t.back}
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t.enterCodesTitle}</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t.supplierPrefix}<span className="font-medium text-gray-700 dark:text-gray-200">{supplier}</span>
          </p>
        </div>

        {submitError && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {submitError}
          </div>
        )}

        <div className="space-y-4">
          {OUTLET_FIELDS.map(({ key, label }, index) => (
            <div key={key} className="space-y-1">
              <Label htmlFor={key}>{index + 1}. {label}</Label>
              <Input
                id={key}
                placeholder={t.codePlaceholder}
                value={codes[key]}
                onChange={(e) => updateCode(key, e.target.value)}
                disabled={submitting}
              />
            </div>
          ))}
        </div>

        <Button className="mt-8 w-full" onClick={() => setShowConfirm(true)} disabled={submitting}>
          {t.submit}
        </Button>
      </div>

      {/* Confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{t.confirmTitle}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t.confirmDesc}</p>

            <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-sm mb-5">
              <div className="flex items-start gap-4 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border-b border-gray-200 dark:border-gray-700">
                <span className="shrink-0 w-32 font-semibold text-gray-600 dark:text-gray-300">{t.confirmSupplier}</span>
                <span className="flex-1 font-medium text-gray-900 dark:text-white break-words">{supplier}</span>
              </div>
              {OUTLET_FIELDS.map(({ key, label }, i) => (
                <div
                  key={key}
                  className={`flex items-center gap-4 px-4 py-2.5 ${i % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/40'} ${i < OUTLET_FIELDS.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}
                >
                  <span className="shrink-0 w-52 text-gray-500 dark:text-gray-400">{label}</span>
                  <span className={`flex-1 font-mono ${codes[key].trim() ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500 italic'}`}>
                    {codes[key].trim() || t.notProvided}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                disabled={submitting}
              >
                {t.confirmCancel}
              </button>
              <button
                onClick={handleConfirmedSubmit}
                className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors disabled:opacity-60"
                disabled={submitting}
              >
                {submitting ? t.submitting : t.confirmSubmit}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
