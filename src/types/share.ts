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

export interface INotificationSlice {
  paged: {
    notifications: INotificationUnified[];
    totalCount: number;
    page: number;
    limit: number;
  };
  live: INotificationUnified[];
  isError: string | null | boolean;
  isLoading: boolean;
}

export interface IStreamsSlice {
  data: null | IStreamsData;
  isError: string | null | boolean;
  isLoading: boolean;
}

export interface IStreamsHistorySlice {
  data: null | IStreamHistoryData;
  isError: string | null | boolean;
  isLoading: boolean;
  lastNickname: string | null;
}

// Types
export type NotificationsType = 'NewFollower' | 'StreamStarted';

export type AlertType = 'success' | 'error' | 'info' | 'warning';

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
  socialLinks: ISocialLink[] | null;
}
export interface ISocialLink {
  platform: string;
  url: string;
}

export interface IProfileChange {
  nickname: string;
  email: string | null;
  profileDescription: string | null;
  currentPassword: string | null;
  newPassword: string | null;
  profileImage: File | null | undefined;
  backgroundImage: File | null | undefined;
  socialLinks: ISocialLink[] | null;
}

export interface ISocials {
  platform: string;
  url: string;
}

export interface ISubscriber {
  nickname: string;
  profileImage: string;
  isOnline: boolean;
  streamersLeague: string;
  previewUrl: string;
  streamName: string;
}

export interface IStreamOnline {
  nickname: string;
  profileImage: string;
  isOnline: boolean;
  streamersLeague: string;
  previewUrl: string;
  streamName: string;
  streamId: number | null;
  totalCount?: number;
}

export interface IStreamsData {
  totalStreams: number;
  page: number;
  pageSize: number;
  streams: IStreamOnline[];
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
  previewUrl: string | null;
  hlsUrl: string;
  totalViews: number;
  startedAt: string | Date;
  isLive: boolean;
}

export interface IStreamHistoryData {
  page: number;
  pageSize: number;
  totalStreams: number;
  streams: IStreamHistory[];
}

export interface IStreamHistory {
  id: number;
  startedAt: string;
  endedAt: string;
  hasRecord: boolean;
  recordPath: string;
  streamName: string;
  categoryName: string | null;
  tags: Array<string>;
}
export interface IUpdateStream {
  streamName?: string | null;
  previewUrl?: string | null;
  tags?: Array<string> | null;
}

type StreamInfo = {
  [K in keyof IStream]: IStream[K];
};

export interface ILiveStatusStream {
  isStreaming: boolean;
  streamInfo:
    | (StreamInfo & {
        title: string;
        endedAt: string | null;
      })
    | null;
}

export interface INotificationBase {
  type: NotificationsType;
  payload: string;
  date?: string;
  id?: number;
  isRead?: boolean;
  createdAt?: string;
  totalCount?: number;
  page?: number;
  limit?: number;
  notifications?: any[];
}

export interface INotificationUnified {
  id: number;
  title: string;
  message: string;
  link: string | null;
  date: string;
  icon: React.ElementType;
  isRead: boolean;
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

export type ModalContextType = {
  showAlert: (message: string, type?: AlertType) => void;
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

export interface StyledAlertMessageProps {
  type?: string;
}

export interface IUser {
  id: string;
  name: string;
  avatar?: string;
  live?: boolean;
}

// Chat
export interface IChatMessage {
  userId: number;
  username: string;
  text: string;
  role: string;
  timestamp: string;
  offsetSeconds: number;
}
