import { FC, ReactElement, ReactNode } from 'react';
import { DrawerProvider } from './context/DrawerContext';
import { NotificationProvider } from './context/NotificationContext';
import { NicknameProvider } from './context/NicknameContext';

type ProviderComponent = React.ComponentType<{ children: ReactNode }>;

const providers: ProviderComponent[] = [DrawerProvider, NicknameProvider, NotificationProvider];

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  const tree = providers.reduceRight<ReactElement | null>(
    (acc, Provider) => {
      return <Provider>{acc}</Provider>;
    },
    <>{children}</>
  );
  return tree;
};
