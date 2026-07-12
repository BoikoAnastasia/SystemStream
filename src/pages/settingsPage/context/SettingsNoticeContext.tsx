import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { AlertProps, Box } from '@mui/material';
import { InlineNotice } from '../../../components/ui/InlineNotice';
import { AlertType } from '../../../types/share';

type SettingsNoticeContextType = {
  showNotice: (message: string, type?: AlertType) => void;
  clearNotice: () => void;
};

const SettingsNoticeContext = createContext<SettingsNoticeContextType | undefined>(undefined);

const mapAlertType = (type: AlertType): NonNullable<AlertProps['severity']> => {
  if (type === 'error') return 'error';
  if (type === 'warning') return 'warning';
  if (type === 'info') return 'info';
  return 'success';
};

export const SettingsNoticeProvider = ({ children }: { children: ReactNode }) => {
  const [notice, setNotice] = useState<{ message: string; severity: NonNullable<AlertProps['severity']> } | null>(null);

  const showNotice = useCallback((message: string, type: AlertType = 'info') => {
    setNotice({ message, severity: mapAlertType(type) });
  }, []);

  const clearNotice = useCallback(() => setNotice(null), []);

  return (
    <SettingsNoticeContext.Provider value={{ showNotice, clearNotice }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {notice && <InlineNotice message={notice.message} severity={notice.severity} onClose={clearNotice} />}
        {children}
      </Box>
    </SettingsNoticeContext.Provider>
  );
};

export const useSettingsNotice = () => {
  const ctx = useContext(SettingsNoticeContext);
  if (!ctx) throw new Error('useSettingsNotice must be used within SettingsNoticeProvider');
  return ctx;
};
