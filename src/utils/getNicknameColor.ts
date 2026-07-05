const NICKNAME_COLORS = [
  '#ff6b6b',
  '#ffd93d',
  '#6bcb77',
  '#4d96ff',
  '#c77dff',
  '#e67e22',
  '#1abc9c',
  '#f368e0',
  '#48dbfb',
  '#ff9ff3',
  '#54a0ff',
  '#5f27cd',
];

export const getNicknameColor = (nickname: string): string => {
  let hash = 0;
  for (let i = 0; i < nickname.length; i++) {
    hash = nickname.charCodeAt(i) + ((hash << 5) - hash);
  }
  return NICKNAME_COLORS[Math.abs(hash) % NICKNAME_COLORS.length];
};

export const getNicknameBackground = (color: string, alpha = 0.18): string => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
