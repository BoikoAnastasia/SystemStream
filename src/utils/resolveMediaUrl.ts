export const resolveMediaUrl = (path?: string | null) => {
  if (!path?.trim()) return '';
  const trimmed = path.trim();
  if (trimmed.startsWith('http') || trimmed.startsWith('data:') || trimmed.startsWith('./')) return trimmed;
  if (trimmed.startsWith('/default')) return trimmed;

  const base = process.env.REACT_APP_API_LOCAL ?? '';
  return `${base}${trimmed.startsWith('/') ? trimmed : `/${trimmed}`}`;
};
