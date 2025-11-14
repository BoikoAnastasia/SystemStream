import { createContext, ReactNode, useContext, useState } from 'react';
// types
import { SidebarContextType } from '../types/share';

const HeaderModalContext = createContext<SidebarContextType | undefined>(undefined);

export const HeaderModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return <HeaderModalContext.Provider value={{ open, setOpen }}>{children}</HeaderModalContext.Provider>;
};

export const useHeaderModal = () => {
  const ctx = useContext(HeaderModalContext);
  if (!ctx) throw new Error('useHeaderModal must be used within HeaderModalProvider');
  return ctx;
};
