import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { fetchUserOnlineStreams, selectStreams } from '../store/actions/StreamsActions';
import { fetchtSubsribtionsMy } from '../store/actions/SubscribersActions';
import { useAppSelector } from '../hooks/redux';
import { IStreamOnline, ISubscriber } from '../types/share';

type SidebarPanelContextType = {
  streams: IStreamOnline[];
  streamsLoading: boolean;
  streamsError: boolean;
  subscribers: ISubscriber[];
  subsLoading: boolean;
  subsError: boolean;
  isAuth: boolean;
  refreshPanelData: () => void;
};

const SidebarPanelContext = createContext<SidebarPanelContextType | undefined>(undefined);

export const SidebarPanelProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth } = useAppSelector((state) => state.user);
  const streams = useAppSelector(selectStreams);
  const { isLoading, isError, data } = useAppSelector((state) => state.streams);

  const [subscribers, setSubscribers] = useState<ISubscriber[]>([]);
  const [subsLoading, setSubsLoading] = useState(false);
  const [subsError, setSubsError] = useState(false);

  const refreshStreams = useCallback(() => {
    dispatch(fetchUserOnlineStreams());
  }, [dispatch]);

  const refreshSubscriptions = useCallback(async () => {
    if (!isAuth) {
      setSubscribers([]);
      setSubsError(false);
      setSubsLoading(false);
      return;
    }

    setSubsLoading(true);
    setSubsError(false);

    const users = await fetchtSubsribtionsMy();
    if (users === null) {
      setSubsError(true);
      setSubscribers([]);
    } else {
      setSubscribers(users);
      setSubsError(false);
    }
    setSubsLoading(false);
  }, [isAuth]);

  const refreshPanelData = useCallback(() => {
    refreshStreams();
    void refreshSubscriptions();
  }, [refreshStreams, refreshSubscriptions]);

  useEffect(() => {
    if (data === null && !isLoading) {
      refreshStreams();
    }
  }, [data, isLoading, refreshStreams]);

  useEffect(() => {
    void refreshSubscriptions();
  }, [refreshSubscriptions]);

  const value = useMemo(
    () => ({
      streams,
      streamsLoading: isLoading || data === null,
      streamsError: Boolean(isError),
      subscribers,
      subsLoading,
      subsError,
      isAuth: Boolean(isAuth),
      refreshPanelData,
    }),
    [streams, isLoading, data, isError, subscribers, subsLoading, subsError, isAuth, refreshPanelData]
  );

  return <SidebarPanelContext.Provider value={value}>{children}</SidebarPanelContext.Provider>;
};

export const useSidebarPanel = () => {
  const ctx = useContext(SidebarPanelContext);
  if (!ctx) throw new Error('useSidebarPanel must be used within SidebarPanelProvider');
  return ctx;
};
