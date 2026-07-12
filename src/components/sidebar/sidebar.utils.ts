import { IStreamOnline, ISubscriber } from '../../types/share';

const nickKey = (nickname: string) => nickname.trim().toLowerCase();

export const buildSidebarLists = (subscribers: ISubscriber[], streams: IStreamOnline[]) => {
  const subscribedKeys = new Set(subscribers.map((s) => nickKey(s.nickname)));
  const liveByNick = new Map(streams.map((stream) => [nickKey(stream.nickname), stream]));

  const subscriptionsWithLive = subscribers.map((sub) => {
    const live = liveByNick.get(nickKey(sub.nickname));
    return {
      ...sub,
      isOnline: Boolean(live),
      streamName: live?.streamName || sub.streamName,
      previewUrl: live?.previewUrl || sub.previewUrl,
      profileImage: live?.profileImage || sub.profileImage,
      viewerCount: live?.viewerCount,
    };
  });

  const liveOutsideSubscriptions = streams.filter((stream) => !subscribedKeys.has(nickKey(stream.nickname)));

  return {
    subscriptionsWithLive,
    liveOutsideSubscriptions,
  };
};
