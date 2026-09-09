import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SelectSupplierPage from '@/pages/SelectSupplierPage';
import EnterCodesPage from '@/pages/EnterCodesPage';
import SuccessPage from '@/pages/SuccessPage';
import { NavProvider } from './NavContext';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SelectSupplierPage />} />
      <Route path="/enter" element={<EnterCodesPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <NavProvider>
        <AppRoutes />
      </NavProvider>
    </BrowserRouter>
  );
}
