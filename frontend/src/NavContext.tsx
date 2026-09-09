import { createContext, useContext, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

const NavContext = createContext<{ goHome: () => void }>({ goHome: () => {} });

export function NavProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const goHome = () => navigate('/', { replace: true });
  return <NavContext.Provider value={{ goHome }}>{children}</NavContext.Provider>;
}

export function useNav() {
  return useContext(NavContext);
}
