import { createContext, useContext, ReactNode, useState } from 'react';

interface NicknameContextValue {
  nickname: string | null;
  setNickname: (nickname: string) => void;
}

const NicknameContext = createContext<NicknameContextValue | undefined>(undefined);

export const NicknameProvider = ({ children }: { children: ReactNode }) => {
  const [nickname, setNickname] = useState<string | null>(null);

  return <NicknameContext.Provider value={{ nickname, setNickname }}>{children}</NicknameContext.Provider>;
};

export const useNickname = () => {
  const context = useContext(NicknameContext);
  if (!context) throw new Error('useNickname must be used within a NicknameProvider');
  return context;
};
