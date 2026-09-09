import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
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
    <Layout>
      <div className="w-full max-w-md p-8 my-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t.title}</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t.subtitle}</p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="supplier-search">{t.supplierName}</Label>

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
            <p className="text-xs text-red-500 mt-1">{validationErr}</p>
          )}

          {selected && (
            <p className="text-xs text-green-600 mt-1">{t.selectedPrefix}{selected}</p>
          )}
        </div>

        <Button
          className="mt-6 w-full"
          onClick={handleNext}
          disabled={loading}
        >
          {t.next}
        </Button>

        <p className="mt-4 text-xs text-gray-400 dark:text-gray-500 text-center italic">
          {t.onlyUnsubmitted}
        </p>
      </div>
    </Layout>
  );
}
