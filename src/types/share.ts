import { ReactNode } from 'react';

// slice
export interface IUserProfileSlice {
  data: IProfile | null;
  isAuth?: boolean;
  isLoading: boolean;
  isError: string | null | boolean;
}

export interface ISettingsSlice {
  data: ISetting | null;
  isError: string | null | boolean;
  isLoading: boolean;
}

export interface IStreamSlice {
  data: IStream | null;
  isError: string | null | boolean;
  isLoading: boolean;
}

// data

export interface IProfile {
  id: number;
  email: string;
  nickname: string;
  profileDescription: string;
  backgroundImage: string;
  profileImage: string;
  registrationDate: Date;
  isOnline: boolean;
  cashBalance: number;
}

export interface IProfileChange {
  email: string | null;
  password: string | null;
  profileDescription: string | null;
  profileImage: string | null;
  backgroundImage: string | null;
}

export interface ISubscriber {
  nickname: string;
  profileImage: string;
  isOnline: boolean;
  streamersLeague: string;
  previewlUrl: string;
  streamName: string;
}

export interface ISetting {
  streamKey: string;
}

export interface IStream {
  streamId: number;
  streamName: string;
  streamerName: string;
  streamerId: number;
  tags: Array<string>;
  previewlUrl: null | string;
  hlsUrl: string;
  totalViews: number;
  startedAt: string;
  isLive: boolean;
}

export interface INotification {
  id: number;
  streamerId: number;
  date: string;
  type: string;
  title: string;
  message: string;
  link: string | null;
  icon: React.ElementType;
}

// components
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
  type: string;
  isLive: boolean;
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

export interface IModalRegistForm {
  password: string;
  username: string;
  email?: string;
}

export interface IModalLoginForm {
  password: string;
  loginOrEmail: string;
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
  href?: string;
};

export interface ICardDrawerTypography {
  c?: string;
  fs?: string;
  isEllipsis: boolean;
}

export interface StyledButtonSearchProps {
  h?: string;
}

export interface IUser {
  id: string;
  name: string;
  avatar?: string;
  live?: boolean;
}
