export const KEYBOARD_SHORTCUTS = [
  { keys: 'Space / K (Л)', action: 'Воспроизведение / пауза' },
  { keys: 'M (Ь)', action: 'Включить / выключить звук' },
  { keys: 'F (А)', action: 'Полный экран' },
  { keys: 'P (З)', action: 'Картинка в картинке' },
  { keys: '↑ / ↓', action: 'Громкость ±5%' },
  { keys: 'L (Д)', action: 'Перейти в live (если отстали)' },
  { keys: '?', action: 'Справка по горячим клавишам' },
];

/** Показать «Вернуться в эфир», если отставание от live edge больше этого (сек) */
export const LIVE_CATCHUP_THRESHOLD_SEC = 5;

export const LIVE_HLS_CONFIG = {
  enableWorker: true,
  lowLatencyMode: false,
  liveSyncDurationCount: 3,
  liveMaxLatencyDurationCount: 10,
  maxBufferLength: 30,
  maxMaxBufferLength: 60,
  backBufferLength: 0,
};

/** Ожидание появления live-manifest (ffmpeg прогревается несколько секунд) */
export const LIVE_MANIFEST_RETRY_MS = 2000;
export const LIVE_MANIFEST_MAX_ATTEMPTS = 30;
/** Плейлист старше этого считается остатком прошлого эфира */
export const LIVE_MANIFEST_MAX_AGE_MS = 15000;

export const VOD_HLS_CONFIG = {
  enableWorker: true,
  maxBufferLength: 60,
  maxMaxBufferLength: 120,
};
