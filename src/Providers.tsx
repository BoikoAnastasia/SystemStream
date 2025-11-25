import { FC, ReactElement, ReactNode } from 'react';
import { DrawerProvider } from './context/DrawerContext';
import { NicknameProvider } from './context/NicknameContext';
import { HeaderModalProvider } from './context/HeaderModalContext';

type ProviderComponent = React.ComponentType<{ children: ReactNode }>;

const providers: ProviderComponent[] = [DrawerProvider, NicknameProvider, HeaderModalProvider];

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  const tree = providers.reduceRight<ReactElement | null>(
    (acc, Provider) => {
      return <Provider>{acc}</Provider>;
    },
    <>{children}</>
  );
  return tree;
};
