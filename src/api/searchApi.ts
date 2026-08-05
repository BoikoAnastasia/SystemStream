import { apiFetch } from './httpClient';

const apiLocal = () => process.env.REACT_APP_API_LOCAL;

export type SearchScope = 'all' | 'channels' | 'categories' | 'tags';

export type SearchChannelHit = {
  id: number;
  nickname: string;
  profileImage?: string | null;
  isOnline: boolean;
  streamName?: string | null;
};

export type SearchCategoryHit = {
  id: number;
  name: string;
  bannerImageUrl?: string | null;
};

export type SearchTagHit = {
  slug: string;
  name: string;
};

export type GlobalSearchResult = {
  channels: SearchChannelHit[];
  categories: SearchCategoryHit[];
  tags: SearchTagHit[];
};

export const searchChannels = async (q: string, take = 6): Promise<SearchChannelHit[]> => {
  const qs = new URLSearchParams({ q, take: String(take) });
  const response = await apiFetch(`${process.env.REACT_APP_API_USER}/search?${qs}`);
  if (!response.ok) return [];
  const rows = await response.json();
  if (!Array.isArray(rows)) return [];
  return rows.map((raw: Record<string, unknown>) => ({
    id: Number(raw.id ?? raw.Id ?? 0),
    nickname: String(raw.nickname ?? raw.Nickname ?? ''),
    profileImage: (raw.profileImage ?? raw.ProfileImage ?? null) as string | null,
    isOnline: Boolean(raw.isOnline ?? raw.IsOnline),
    streamName: (raw.streamName ?? raw.StreamName ?? null) as string | null,
  }));
};

export const searchCategories = async (q: string, take = 6): Promise<SearchCategoryHit[]> => {
  const qs = new URLSearchParams({
    search: q,
    page: '1',
    pageSize: String(take),
  });
  const response = await apiFetch(`${apiLocal()}/api/categories?${qs}`);
  if (!response.ok) return [];
  const payload = await response.json();
  const rows = payload.categories ?? payload.Categories ?? [];
  if (!Array.isArray(rows)) return [];
  return rows.map((raw: Record<string, unknown>) => ({
    id: Number(raw.id ?? raw.Id ?? 0),
    name: String(raw.name ?? raw.Name ?? ''),
    bannerImageUrl: (raw.bannerImageUrl ?? raw.BannerImageUrl ?? null) as string | null,
  }));
};

export const searchTags = async (q: string, take = 6): Promise<SearchTagHit[]> => {
  const qs = new URLSearchParams({ search: q, take: String(take) });
  const response = await apiFetch(`${apiLocal()}/api/tags?${qs}`);
  if (!response.ok) return [];
  const payload = await response.json();
  const rows = payload.tags ?? payload.Tags ?? payload;
  if (!Array.isArray(rows)) return [];
  return rows.map((raw: Record<string, unknown>) => ({
    slug: String(raw.slug ?? raw.Slug ?? raw.name ?? raw.Name ?? ''),
    name: String(raw.name ?? raw.Name ?? raw.slug ?? raw.Slug ?? ''),
  }));
};

export const searchGlobal = async (q: string, scope: SearchScope): Promise<GlobalSearchResult> => {
  const query = q.trim();
  if (query.length < 2) {
    return { channels: [], categories: [], tags: [] };
  }

  if (scope === 'channels') {
    return { channels: await searchChannels(query), categories: [], tags: [] };
  }
  if (scope === 'categories') {
    return { channels: [], categories: await searchCategories(query), tags: [] };
  }
  if (scope === 'tags') {
    return { channels: [], categories: [], tags: await searchTags(query) };
  }

  const [channels, categories, tags] = await Promise.all([
    searchChannels(query, 5),
    searchCategories(query, 5),
    searchTags(query, 5),
  ]);
  return { channels, categories, tags };
};
