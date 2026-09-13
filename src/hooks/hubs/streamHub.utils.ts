import { IStream } from '../../types/share';

const toBooleanOrNull = (value: unknown): boolean | null => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (normalized === 'true') return true;
    if (normalized === 'false') return false;
  }

  return null;
};

export const mapStreamFromHub = (streamInfo: Record<string, unknown> | null | undefined): IStream | null => {
  if (!streamInfo) return null;

  const isLive = streamInfo.isLive ?? streamInfo.IsLive;
  const hlsUrl = String(streamInfo.hlsUrl ?? streamInfo.HlsUrl ?? '');
  const explicitLive = toBooleanOrNull(isLive);
  const live = explicitLive ?? Boolean(hlsUrl);

  if (!live) return null;

  return {
    streamId: Number(streamInfo.streamId ?? streamInfo.StreamId ?? 0),
    streamName: String(streamInfo.streamName ?? streamInfo.StreamName ?? ''),
    streamerId: Number(streamInfo.streamerId ?? streamInfo.StreamerId ?? 0),
    streamerName: String(streamInfo.streamerName ?? streamInfo.StreamerName ?? ''),
    tags: (streamInfo.tags ?? streamInfo.Tags ?? []) as string[],
    categoryId: (streamInfo.categoryId ?? streamInfo.CategoryId) as number | undefined,
    categoryName: (streamInfo.categoryName ?? streamInfo.CategoryName ?? null) as string | null,
    categoryBannerImageUrl: (streamInfo.categoryBannerImageUrl ?? streamInfo.CategoryBannerImageUrl ?? null) as
      | string
      | null,
    streamLanguage: String(streamInfo.streamLanguage ?? streamInfo.StreamLanguage ?? 'ru'),
    previewUrl: (streamInfo.previewUrl ?? streamInfo.PreviewUrl ?? null) as IStream['previewUrl'],
    hlsUrl,
    totalViews: Number(streamInfo.totalViews ?? streamInfo.TotalViews ?? 0),
    startedAt: String(streamInfo.startedAt ?? streamInfo.StartedAt ?? new Date().toISOString()),
    isLive: true,
  };
};
