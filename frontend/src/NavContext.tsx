import { createContext, useContext, type ReactNode } from 'react';

const NavContext = createContext<{ goHome: () => void }>({ goHome: () => {} });

export function NavProvider({ goHome, children }: { goHome: () => void; children: ReactNode }) {
  return <NavContext.Provider value={{ goHome }}>{children}</NavContext.Provider>;
}

export function useNav() {
  return useContext(NavContext);
}
