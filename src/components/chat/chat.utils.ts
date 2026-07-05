import { IChatMessage } from '../../types/share';

const ROLE_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  Streamer: { label: 'Стример', color: '#ff6b6b', bg: 'rgba(255,59,59,0.15)' },
  Moderator: { label: 'MOD', color: '#6fff79', bg: 'rgba(111,255,121,0.12)' },
  Assistant: { label: 'ASST', color: '#8e7bff', bg: 'rgba(142,123,255,0.12)' },
  Admin: { label: 'ADMIN', color: '#8e7bff', bg: 'rgba(142,123,255,0.15)' },
};

const ERROR_MESSAGES: Record<string, string> = {
  ChatUnauthorized: 'Войдите, чтобы писать в чат',
  ChatNotJoined: 'Вы не подключены к чату стрима',
  ChatStreamOffline: 'Стрим оффлайн — чат недоступен',
  ChatMessageEmpty: 'Сообщение не может быть пустым',
  ChatMessageTooLong: 'Слишком длинное сообщение (макс. 500 символов)',
  ChatForbidden: 'Недостаточно прав',
  ChatSlowModeFailed: 'Не удалось изменить slow mode',
  ChatTimedOut: 'Вы в timeout и не можете писать',
  ChatMessageNotFound: 'Сообщение не найдено',
  ChatUserNotFound: 'Пользователь не найден',
  ChatDeleteFailed: 'Не удалось удалить сообщение',
  ChatTimeoutFailed: 'Не удалось выдать timeout',
  ChatBanFailed: 'Не удалось забанить пользователя',
  ChatUnbanFailed: 'Не удалось разбанить пользователя',
  ChatUserNotBanned: 'Пользователь не забанен',
  ChatBanned: 'Вы забанены в этом чате',
  Unauthorized: 'Войдите, чтобы писать в чат',
  NotJoinedToStream: 'Вы не подключены к чату стрима',
};

export const getRoleBadge = (role: string) => ROLE_LABELS[role] ?? null;

export const formatChatTime = (timestamp: string) => {
  if (!timestamp) return '';
  try {
    return new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit' }).format(new Date(timestamp));
  } catch {
    return '';
  }
};

export const normalizeChatMessage = (raw: Record<string, unknown>): IChatMessage => {
  const isDeleted = Boolean(raw.isDeleted ?? raw.IsDeleted);
  const deletedTextRaw = raw.deletedText ?? raw.DeletedText;
  const deletedText = deletedTextRaw != null && String(deletedTextRaw).length > 0 ? String(deletedTextRaw) : undefined;

  return {
    id: String(raw.id ?? raw.Id ?? ''),
    userId: Number(raw.userId ?? raw.UserId ?? 0),
    username: String(raw.username ?? raw.Username ?? ''),
    text: isDeleted ? '' : String(raw.text ?? raw.Text ?? ''),
    role: String(raw.role ?? raw.Role ?? 'User'),
    timestamp: String(raw.timestamp ?? raw.Timestamp ?? new Date().toISOString()),
    offsetSeconds: Number(raw.offsetSeconds ?? raw.OffsetSeconds ?? 0),
    isDeleted,
    deletedText,
  };
};

export const getMessageKey = (msg: IChatMessage, index: number) => msg.id || `${msg.userId}-${msg.timestamp}-${index}`;

export const mapChatError = (code: string): string => {
  if (code.startsWith('ChatSlowMode:')) {
    const seconds = code.split(':')[1];
    return `Подождите ${seconds} сек. перед следующим сообщением`;
  }
  if (code.startsWith('ChatTimedOut:')) {
    const seconds = code.split(':')[1];
    return `Timeout: подождите ${seconds} сек.`;
  }
  return ERROR_MESSAGES[code] ?? 'Не удалось отправить сообщение';
};

export const canReplyToMessage = (msg: IChatMessage, currentUserId?: number, isAuth?: boolean) =>
  Boolean(isAuth && currentUserId && msg.userId !== currentUserId);

export const canModerateMessage = (
  msg: IChatMessage,
  opts: {
    canManageChat: boolean;
    currentUserId?: number;
    streamerId?: number;
    isStreamer?: boolean;
  }
) => {
  const { canManageChat, currentUserId, streamerId, isStreamer } = opts;
  if (!canManageChat || !currentUserId) return false;
  if (msg.isDeleted) return false;
  if (msg.userId === currentUserId) return false;
  if (streamerId && msg.userId === streamerId) return false;
  if (msg.role === 'Streamer' || msg.role === 'Admin') return false;
  if (msg.role === 'Moderator' && !isStreamer) return false;
  return true;
};

export const getChatPopoverContainer = (): HTMLElement =>
  (document.fullscreenElement ??
    (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement ??
    document.body) as HTMLElement;

export type ChatMessagePart = { type: 'text' | 'mention'; value: string };

export const parseMessageMentions = (text: string): ChatMessagePart[] => {
  const regex = /@(\S+)/g;
  const parts: ChatMessagePart[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null = regex.exec(text);

  while (match) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: text.slice(lastIndex, match.index) });
    }
    parts.push({ type: 'mention', value: match[1] });
    lastIndex = regex.lastIndex;
    match = regex.exec(text);
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', value: text.slice(lastIndex) });
  }

  return parts.length > 0 ? parts : [{ type: 'text', value: text }];
};

export const messageMentionsNickname = (text: string, nickname?: string) => {
  if (!text || !nickname) return false;

  const normalized = nickname.toLowerCase();
  return parseMessageMentions(text).some((part) => part.type === 'mention' && part.value.toLowerCase() === normalized);
};
