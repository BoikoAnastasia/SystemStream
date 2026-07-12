import { createGuestKey } from '../utils/createGuestKey';
import { sanitizeStreamersLeague } from '../utils/streamersLeague';
import { IStreamOnline, IStreamsData } from '../types/share';

export const normalizeOnlineUser = (raw: Record<string, unknown>): IStreamOnline => ({
  nickname: String(raw.nickname ?? raw.Nickname ?? ''),
  profileImage: String(raw.profileImage ?? raw.ProfileImage ?? ''),
  isOnline: Boolean(raw.isOnline ?? raw.IsOnline ?? true),
  streamersLeague: sanitizeStreamersLeague(String(raw.streamersLeague ?? raw.StreamersLeague ?? '')),
  previewUrl: String(raw.previewUrl ?? raw.PreviewUrl ?? ''),
  streamName: String(raw.streamName ?? raw.StreamName ?? ''),
  streamId: (raw.streamId ?? raw.StreamId ?? null) as number | null,
  totalCount: Number(raw.totalViews ?? raw.TotalViews ?? raw.totalCount ?? raw.TotalCount ?? 0),
  viewerCount: Number(raw.viewerCount ?? raw.ViewerCount ?? 0),
});

export const fetchLiveStreamsFromApi = async (
  page = 1,
  pageSize = 25
): Promise<{ data: IStreamsData | null; error: string | null }> => {
  const token = createGuestKey();

  try {
    const response = await fetch(`${process.env.REACT_APP_API_USER}/online/streams?page=${page}&pageSize=${pageSize}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return {
        data: null,
        error: errorData?.message || 'Не удалось получить стримы',
      };
    }

    const payload = await response.json();
    const rawStreams = payload.streams ?? payload.Streams ?? [];

    return {
      data: {
        totalStreams: payload.totalStreams ?? payload.TotalStreams ?? rawStreams.length,
        page: payload.page ?? payload.Page ?? page,
        pageSize: payload.pageSize ?? payload.PageSize ?? pageSize,
        streams: rawStreams.map((item: Record<string, unknown>) => normalizeOnlineUser(item)),
      },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Не удалось получить стримы',
    };
  }
};
