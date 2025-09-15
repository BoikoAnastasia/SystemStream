import { ReactNode } from 'react';

export interface AllProductsState {
  //     data: IAllData[] | [],
  //     isLoading: boolean,
  //     isError: string | null,
}

export interface IStyledIButtonForm {
  bgcolor?: string;
  hoverbgcolor?: string;
  hovercolor?: string;
  c?: string;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface TabsComponentProps {
  propsChild: ReactNode[];
  propTabsTitle: string[];
}
