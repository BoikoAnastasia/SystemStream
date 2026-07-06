export const STREAM_LANGUAGE_OPTIONS = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' },
  { value: 'uk', label: 'Українська' },
  { value: 'de', label: 'Deutsch' },
  { value: 'fr', label: 'Français' },
  { value: 'es', label: 'Español' },
] as const;

export const getStreamLanguageLabel = (code?: string | null) =>
  STREAM_LANGUAGE_OPTIONS.find((item) => item.value === code)?.label ?? code ?? '';
