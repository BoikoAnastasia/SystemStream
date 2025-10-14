import { FC, ReactElement, ReactNode } from 'react';
import { DrawerProvider } from './context/DrawerContext';

type ProviderComponent = React.ComponentType<{ children: ReactNode }>;

const providers: ProviderComponent[] = [DrawerProvider];

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  const tree = providers.reduceRight<ReactElement | null>(
    (acc, Provider) => {
      return <Provider>{acc}</Provider>;
    },
    <>{children}</>
  );
  return tree;
};
