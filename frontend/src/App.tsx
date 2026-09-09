import { useState } from 'react';
import SelectSupplierPage from '@/pages/SelectSupplierPage';
import EnterCodesPage from '@/pages/EnterCodesPage';
import SuccessPage from '@/pages/SuccessPage';
import { NavProvider } from './NavContext';

type Step = 'select' | 'enter' | 'success';

export default function App() {
  const [step, setStep] = useState<Step>('select');
  const [supplier, setSupplier] = useState('');

  function handleSupplierSelect(name: string) {
    setSupplier(name);
    setStep('enter');
  }

  function handleBack() {
    setSupplier('');
    setStep('select');
  }

  function handleSuccess() {
    setStep('success');
  }

  function handleReset() {
    setSupplier('');
    setStep('select');
  }

  return (
    <NavProvider goHome={handleReset}>
      {step === 'select' && <SelectSupplierPage onSelect={handleSupplierSelect} />}
      {step === 'enter' && <EnterCodesPage supplier={supplier} onBack={handleBack} onSuccess={handleSuccess} />}
      {step === 'success' && <SuccessPage supplier={supplier} onReset={handleReset} />}
    </NavProvider>
  );
}
