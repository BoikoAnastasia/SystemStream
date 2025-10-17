import { ReactNode } from 'react';

export interface AllProductsState {
  //     data: IAllData[] | [],
  //     isLoading: boolean,
  //     isError: string | null,
}

export interface IStyledButtonForm {
  bgcolor?: string;
  hoverbgcolor?: string;
  hovercolor?: string;
  c?: string;
}

export interface IStyledButtonDark {
  h?: string;
  br?: string;
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

// Message
export interface IMessage {
  id: string | number;
  nickname: string;
  message: string;
  currentUser: boolean;
  avatar: null | string;
}

export interface IModalForm {
  password: string;
  username: string;
  email?: string;
}

export type SidebarContextType = {
  open: boolean;
  setOpen: (s: boolean) => void;
};

export type CardDrawerType = {
  avatar: string;
  views: string;
  title: string;
  author: string;
  category: string;
};
