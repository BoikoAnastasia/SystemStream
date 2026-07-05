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

export const VOD_HLS_CONFIG = {
  enableWorker: true,
  maxBufferLength: 60,
  maxMaxBufferLength: 120,
};
