import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SupplierCombobox from '@/components/SupplierCombobox';
import Layout from '@/components/Layout';
import { supplierService } from '@/services/SupplierService';
import { useLanguage } from '@/i18n/LanguageContext';

export default function SelectSupplierPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState<string[]>([]);
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [validationErr, setValidationErr] = useState('');

  useEffect(() => {
    supplierService.getSuppliers()
      .then(setSuppliers)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  function handleNext() {
    if (!selected) {
      setValidationErr(t.selectValidation);
      return;
    }
    navigate('/enter', { state: { supplier: selected } });
  }

  return (
    <Layout align="top">
      <div className="w-full max-w-md px-4 py-6 sm:p-8 mt-0 mb-3">
        <div className="mb-6 text-center">
          <img
            src="/logos/elogo.png"
            alt="Emart"
            className="w-20 h-20 mx-auto mb-4 dark:[mix-blend-mode:screen]"
          />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t.title}</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t.subtitle}</p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-3">
          {loading ? (
            <div className="h-10 rounded-md bg-gray-100 animate-pulse" />
          ) : (
            <SupplierCombobox
              suppliers={suppliers}
              value={selected}
              onChange={(val) => { setSelected(val); setValidationErr(''); }}
            />
          )}

          {validationErr && (
            <p className="text-xs text-red-500">{validationErr}</p>
          )}

          {selected && (
            <p className="text-xs text-green-600">{t.selectedPrefix}{selected}</p>
          )}

          <Button
            className="w-full"
            onClick={handleNext}
            disabled={loading}
          >
            {t.next}
          </Button>

          <p className="text-xs text-gray-400 dark:text-gray-500 text-center italic">
            {t.onlyUnsubmitted}
          </p>
        </div>
      </div>
    </Layout>
  );
}
