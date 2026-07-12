const LEAGUE_LABELS: Record<string, string> = {
  Bronze: 'Бронза',
  Silver: 'Серебро',
  Gold: 'Золото',
  Platinum: 'Платина',
  Diamond: 'Алмаз',
};

/** Лига/ранг стримера — скрываем None и пустые значения */
export const getStreamersLeagueLabel = (league?: string | null) => {
  const trimmed = league?.trim();
  if (!trimmed || trimmed === 'None') return null;
  return LEAGUE_LABELS[trimmed] ?? trimmed;
};

export const sanitizeStreamersLeague = (league?: string | null) => {
  const trimmed = league?.trim();
  if (!trimmed || trimmed === 'None') return '';
  return trimmed;
};
