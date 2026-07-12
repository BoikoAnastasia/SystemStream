import { IStreamOnline, ISubscriber } from '../../types/share';

const nickKey = (nickname: string) => nickname.trim().toLowerCase();

export const buildSidebarLists = (subscribers: ISubscriber[], streams: IStreamOnline[]) => {
  const subscribedKeys = new Set(subscribers.map((s) => nickKey(s.nickname)));
  const liveKeys = new Set(streams.map((s) => nickKey(s.nickname)));

  const subscriptionsWithLive = subscribers.map((sub) => ({
    ...sub,
    isOnline: liveKeys.has(nickKey(sub.nickname)) || Boolean(sub.isOnline && sub.streamName?.trim()),
  }));

  const liveOutsideSubscriptions = streams.filter((stream) => !subscribedKeys.has(nickKey(stream.nickname)));

  return {
    subscriptionsWithLive,
    liveOutsideSubscriptions,
  };
};
