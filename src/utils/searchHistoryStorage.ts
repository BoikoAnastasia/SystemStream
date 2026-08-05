const MAX_ENTRIES = 5;
const GUEST_KEY = 'searchHistory:guest';

export type SearchHistoryChannel = {
  type: 'channel';
  id: number;
  nickname: string;
  profileImage?: string | null;
};

export type SearchHistoryCategory = {
  type: 'category';
  id: number;
  name: string;
  bannerImageUrl?: string | null;
};

export type SearchHistoryEntry = SearchHistoryChannel | SearchHistoryCategory;

const storageKey = (userId: number | null | undefined): string =>
  userId != null ? `searchHistory:user:${userId}` : GUEST_KEY;

const entryKey = (entry: SearchHistoryEntry): string =>
  entry.type === 'channel' ? `channel:${entry.id}` : `category:${entry.id}`;

const parseEntries = (raw: string | null): SearchHistoryEntry[] => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item): item is SearchHistoryEntry =>
          item &&
          typeof item === 'object' &&
          ((item.type === 'channel' && typeof item.id === 'number' && typeof item.nickname === 'string') ||
            (item.type === 'category' && typeof item.id === 'number' && typeof item.name === 'string'))
      )
      .slice(0, MAX_ENTRIES);
  } catch {
    return [];
  }
};

export const loadSearchHistory = (userId: number | null | undefined): SearchHistoryEntry[] => {
  if (typeof window === 'undefined') return [];
  return parseEntries(window.localStorage.getItem(storageKey(userId)));
};

export const saveSearchHistory = (userId: number | null | undefined, entries: SearchHistoryEntry[]): void => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(storageKey(userId), JSON.stringify(entries.slice(0, MAX_ENTRIES)));
};

export const pushSearchHistory = (
  userId: number | null | undefined,
  entry: SearchHistoryEntry
): SearchHistoryEntry[] => {
  const key = entryKey(entry);
  const next = [entry, ...loadSearchHistory(userId).filter((item) => entryKey(item) !== key)].slice(0, MAX_ENTRIES);
  saveSearchHistory(userId, next);
  return next;
};

export const removeSearchHistoryEntry = (
  userId: number | null | undefined,
  entry: SearchHistoryEntry
): SearchHistoryEntry[] => {
  const key = entryKey(entry);
  const next = loadSearchHistory(userId).filter((item) => entryKey(item) !== key);
  saveSearchHistory(userId, next);
  return next;
};

export const clearSearchHistory = (userId: number | null | undefined): void => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(storageKey(userId));
};
