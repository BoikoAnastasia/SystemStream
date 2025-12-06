export const formatDate = (date: Date, type: string = 'datetime') => {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();

  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');

  if (type === 'datetime') {
    return `${dd}.${mm}.${yyyy} ${hh}:${min}`;
  }
  if (type === 'date') {
    return `${dd}.${mm}.${yyyy}`;
  }
  if (type === 'time') {
    return `${hh}:${min}`;
  }
};

export const getStreamDuration = (start: string | Date, end: string | Date) => {
  const startDate = typeof start === 'string' ? new Date(start) : start;
  const endDate = typeof end === 'string' ? new Date(end) : end;

  const diffMs = endDate.getTime() - startDate.getTime();

  if (diffMs < 0) return '00:00';

  const diffMinutes = Math.floor(diffMs / 1000 / 60);
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  // Формат: HH:MM
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};
