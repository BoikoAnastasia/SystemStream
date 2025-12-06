import { createContext, ReactNode, useContext, useState } from 'react';
// types
import { AlertType, ModalContextType } from '../types/share';
import { ModalAlert } from '../components/modal/ModalAlert';

const HeaderModalContext = createContext<ModalContextType | undefined>(undefined);

export const HeaderModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{ type: AlertType; message: string } | null>(null);

  const showAlert = (message: string, type: AlertType = 'info') => {
    setAlertMessage({ message, type });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <HeaderModalContext.Provider value={{ showAlert }}>
      {children}
      {alertMessage && (
        <ModalAlert message={alertMessage.message} type={alertMessage.type} open={open} onClose={handleClose} />
      )}
    </HeaderModalContext.Provider>
  );
};

export const useHeaderModal = () => {
  const ctx = useContext(HeaderModalContext);
  if (!ctx) throw new Error('useHeaderModal must be used within HeaderModalProvider');
  return ctx;
};
