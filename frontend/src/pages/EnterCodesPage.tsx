import { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout';
import { supplierService } from '@/services/SupplierService';
import { OUTLET_FIELDS, type OutletCodes } from '@/types';
import { useLanguage } from '@/i18n/LanguageContext';

const EMPTY_CODES: OutletCodes = { bk: '', sbk: '', ri: '', rbu: '', sri: '', bt: '', sbu: '' };

const MANUAL_KEYS: (keyof OutletCodes)[] = ['bk', 'sbk', 'ri', 'sri', 'bt', 'sbu'];

const LOCATION_GROUPS: { location: string; color: string; keys: (keyof OutletCodes)[]; cols: 2 | 3 }[] = [
  { location: 'Batu Kawa', color: 'from-blue-500 to-blue-600',      keys: ['bk', 'sbk'],       cols: 2 },
  { location: 'Riam',      color: 'from-violet-500 to-violet-600',  keys: ['ri', 'rbu', 'sri'], cols: 3 },
  { location: 'Bintulu',   color: 'from-emerald-500 to-emerald-600', keys: ['bt', 'sbu'],       cols: 2 },
];

// Pre-compute field numbers (rbu shares number with ri since it's auto)
const FIELD_NUMBERS: Partial<Record<keyof OutletCodes, number>> = {};
let _n = 1;
for (const k of MANUAL_KEYS) FIELD_NUMBERS[k] = _n++;

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function EnterCodesPage() {
  const { t } = useLanguage();
  const navigate  = useNavigate();
  const location  = useLocation();
  const supplier: string = location.state?.supplier ?? '';

  const [codes, setCodes]               = useState<OutletCodes>(EMPTY_CODES);
  const [submitting, setSubmitting]     = useState(false);
  const [submitError, setSubmitError]   = useState('');
  const [showConfirm, setShowConfirm]   = useState(false);
  const [validationErr, setValidationErr] = useState('');

  if (!supplier) return <Navigate to="/" replace />;

  const filledCount   = MANUAL_KEYS.filter(k => codes[k].trim() !== '').length;
  const totalFields   = MANUAL_KEYS.length;
  const hasAtLeastOne = filledCount > 0;
  const progressPct   = Math.round((filledCount / totalFields) * 100);

  const fieldMap = Object.fromEntries(OUTLET_FIELDS.map(f => [f.key, f.label]));

  function updateCode(field: keyof OutletCodes, value: string) {
    setCodes(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'ri') updated.rbu = value;
      return updated;
    });
    if (value.trim()) setValidationErr('');
  }

  function handleSubmitClick() {
    if (!hasAtLeastOne) { setValidationErr(t.atLeastOne); return; }
    setValidationErr('');
    setShowConfirm(true);
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
    <Layout showMarquee={false} align="top">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-5 sm:p-7 mt-2 mb-4">

        {/* Back */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium mb-4 transition-colors group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {t.back.replace('← ', '')}
        </button>

        {/* Header + progress row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t.enterCodesTitle}</h1>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
              {t.supplierPrefix}<span className="font-semibold text-gray-700 dark:text-gray-200">{supplier}</span>
            </p>
          </div>

          {/* Compact progress */}
          <div className="sm:text-right shrink-0">
            <div className="flex sm:justify-end items-center gap-2 mb-1">
              <span className="text-xs text-gray-400 dark:text-gray-500">{filledCount}/{totalFields} filled</span>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{progressPct}%</span>
            </div>
            <div className="w-full sm:w-36 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progressPct}%`,
                  background: filledCount === totalFields
                    ? 'linear-gradient(90deg,#22c55e,#16a34a)'
                    : 'linear-gradient(90deg,#3b82f6,#6366f1)',
                }}
              />
            </div>
          </div>
        </div>

        {submitError && (
          <div className="mb-4 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 text-sm text-red-700 dark:text-red-400">
            {submitError}
          </div>
        )}

        {/* Location groups */}
        <div className="space-y-3">
          {LOCATION_GROUPS.map(({ location: loc, color, keys, cols }, gi) => (
            <div
              key={loc}
              className="rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden field-enter"
              style={{ animationDelay: `${gi * 0.1}s` }}
            >
              {/* Location header */}
              <div className={`bg-gradient-to-r ${color} px-4 py-1.5 flex items-center gap-2`}>
                <span className="text-white text-xs font-bold uppercase tracking-widest">{loc}</span>
              </div>

              {/* Fields grid */}
              <div className={`grid grid-cols-1 ${cols === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-px bg-gray-100 dark:bg-gray-700`}>
                {keys.map((k) => {
                  const isAuto = k === 'rbu';
                  const filled = codes[k].trim() !== '';
                  const fieldNum = FIELD_NUMBERS[k];
                  return (
                    <div key={k} className={`p-3 ${isAuto ? 'bg-violet-50 dark:bg-violet-900/20' : 'bg-white dark:bg-gray-800'}`}>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <label
                          htmlFor={k}
                          className={`block text-[11px] font-semibold uppercase tracking-wide transition-colors ${filled ? 'text-green-600 dark:text-green-400' : isAuto ? 'text-violet-400 dark:text-violet-400' : 'text-gray-400 dark:text-gray-500'}`}
                        >
                          {fieldNum ? `${fieldNum}. ` : ''}{fieldMap[k]}
                        </label>
                        {isAuto && (
                          <span className="shrink-0 text-[9px] font-bold uppercase tracking-wide bg-violet-100 dark:bg-violet-800/50 text-violet-600 dark:text-violet-300 px-1.5 py-0.5 rounded-full">
                            Auto
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <Input
                          id={k}
                          placeholder={isAuto ? '— Auto-filled from Riam —' : t.codePlaceholder}
                          value={codes[k]}
                          onChange={e => updateCode(k, e.target.value)}
                          disabled={submitting || isAuto}
                          readOnly={isAuto}
                          className={`h-9 text-base pr-8 transition-colors ${filled ? 'border-green-500 dark:border-green-500 focus:ring-green-500' : ''} ${isAuto ? 'bg-violet-50/60 dark:bg-violet-900/10 text-gray-500 dark:text-gray-400 cursor-not-allowed' : ''}`}
                        />
                        {filled && (
                          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                            <CheckIcon />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {validationErr && (
          <p className="mt-3 text-sm text-red-500 dark:text-red-400 text-center">{validationErr}</p>
        )}

        <Button className="mt-4 w-full" onClick={handleSubmitClick} disabled={submitting}>
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
                  <span className="shrink-0 w-28 sm:w-52 text-gray-500 dark:text-gray-400">{label}</span>
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
