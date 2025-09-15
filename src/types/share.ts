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

export interface IStyledListVideo {
  columns?: string;
  columnsMb?: string;
}

export interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface ITabsComponentProps {
  propsChild: (ReactNode | (() => ReactNode))[];
  propTabsTitle: string[];
}

export interface IVideoItem {
  id: string;
  video: string;
  href: string;
  name: string;
  users: string;
}

export interface IUserItem {
  id: string;
  img: string;
  href: string;
  name: string;
  users: string;
}

export type IListVideo = IVideoItem[];
export type IListUsers = IUserItem[];
