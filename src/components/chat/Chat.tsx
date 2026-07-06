import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { ChatCard } from './components/card/ChatCard';
import { getNicknameColor } from '../../utils/getNicknameColor';
import { getMessageKey } from './chat.utils';
import { CHAT_MAX_MESSAGE_LENGTH, CHAT_SLOW_MODE_COLOR, CHAT_SLOW_MODE_COLOR_RGB } from './chat.constants';
import { ChatEmojiPicker } from './ChatEmojiPicker';
import { ChatSlowModeButton } from './ChatSlowModeButton';
import { Box, IconButton, Typography } from '@mui/material';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import SendIcon from '@mui/icons-material/Send';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import CloseIcon from '@mui/icons-material/Close';
import {
  StyledChatContainer,
  StyledChatEmpty,
  StyledChatHeader,
  StyledChatInputArea,
  StyledChatInputWrap,
  StyledChatList,
  StyledChatSendButton,
  StyledChatSendColumn,
  StyledChatTextField,
  StyledChatCharCounter,
  StyledChatErrorToast,
  StyledChatInputField,
  StyledNewMessagesPill,
  StyledChatReplyBar,
  StyledChatReplyLabel,
  StyledChatReplyName,
} from './StyledChat';
import { IChatMessage } from '../../types/share';
import { useDeviceDetect } from '../../hooks/useDeviceDetect';

export const Chat = ({
  setIsOpen,
  messages,
  sendMessage,
  deleteMessage,
  timeoutUser,
  banUser,
  unbanUser,
  bannedUserIds = [],
  chatError,
  clearChatError,
  inputRestore,
  consumeInputRestore,
  slowModeSeconds = 0,
  setSlowMode,
  chatRules = '',
  canManageChat = false,
  streamerId,
  layout = 'default',
}: {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  messages: IChatMessage[];
  sendMessage: (text: string) => void | Promise<boolean>;
  deleteMessage?: (messageId: string) => void;
  timeoutUser?: (userId: number, seconds: number) => void;
  banUser?: (userId: number) => void;
  unbanUser?: (userId: number) => void;
  bannedUserIds?: number[];
  chatError?: string | null;
  clearChatError?: () => void;
  inputRestore?: string | null;
  consumeInputRestore?: () => void;
  slowModeSeconds?: number;
  setSlowMode?: (seconds: number) => void;
  chatRules?: string;
  canManageChat?: boolean;
  streamerId?: number;
  layout?: 'default' | 'fullscreen';
}) => {
  const { isMobile } = useDeviceDetect();
  const isFullscreenLayout = layout === 'fullscreen';
  const { isAuth, data: profile } = useAppSelector((state) => state.user);
  const isStreamer = Boolean(streamerId && profile?.id === streamerId);

  const listRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const isNearBottomRef = useRef(true);
  const [text, setText] = useState('');
  const [showNewMessagesPill, setShowNewMessagesPill] = useState(false);
  const [isInputExpanded, setIsInputExpanded] = useState(false);
  const [replyTo, setReplyTo] = useState<{ userId: number; username: string } | null>(null);

  const updateInputExpanded = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;

    const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 22;
    const paddingY = parseFloat(getComputedStyle(el).paddingTop) + parseFloat(getComputedStyle(el).paddingBottom);
    setIsInputExpanded(el.scrollHeight > lineHeight + paddingY + 2);
  }, []);

  useEffect(() => {
    updateInputExpanded();
  }, [text, updateInputExpanded]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    const observer = new ResizeObserver(updateInputExpanded);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateInputExpanded]);

  const scrollToBottom = useCallback((smooth = false) => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
    isNearBottomRef.current = true;
    setShowNewMessagesPill(false);
  }, []);

  const handleScroll = () => {
    const el = listRef.current;
    if (!el) return;
    isNearBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    if (isNearBottomRef.current) {
      setShowNewMessagesPill(false);
    }
  };

  useEffect(() => {
    if (isNearBottomRef.current) {
      scrollToBottom(false);
    } else {
      setShowNewMessagesPill(true);
    }
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (!chatError || !clearChatError) return;
    const timer = window.setTimeout(clearChatError, 6000);
    return () => window.clearTimeout(timer);
  }, [chatError, clearChatError]);

  useEffect(() => {
    if (inputRestore == null || !consumeInputRestore) return;
    setText(inputRestore);
    consumeInputRestore();
  }, [inputRestore, consumeInputRestore]);

  const handleSend = async () => {
    if (!text.trim() || text.length > CHAT_MAX_MESSAGE_LENGTH) return;
    const ok = await sendMessage(text);
    if (ok) {
      setText('');
      setReplyTo(null);
    }
  };

  const handleReply = useCallback((msg: IChatMessage) => {
    setReplyTo({ userId: msg.userId, username: msg.username });
    const mention = `@${msg.username} `;
    setText((prev) => {
      const withoutMention = prev.replace(/^@\S+\s*/, '');
      return withoutMention ? `${mention}${withoutMention}` : mention;
    });
    window.requestAnimationFrame(() => textareaRef.current?.focus());
  }, []);

  const handleTextChange = (value: string) => {
    if (value.length <= CHAT_MAX_MESSAGE_LENGTH) {
      setText(value);
      if (chatError && clearChatError) clearChatError();
    }
  };

  const charsLeft = CHAT_MAX_MESSAGE_LENGTH - text.length;
  const isOverLimit = text.length > CHAT_MAX_MESSAGE_LENGTH;
  const showCharCounter = Boolean(isAuth && isInputExpanded && text.length > 0);

  return (
    <StyledChatContainer>
      <StyledChatHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
          <ForumOutlinedIcon sx={{ fontSize: 20, color: 'rgba(255,255,255,0.7)' }} />
          <Typography sx={{ fontWeight: 700, fontSize: 15, color: '#fff', whiteSpace: 'nowrap' }}>Чат</Typography>
          {slowModeSeconds > 0 && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                px: 1,
                py: 0.25,
                borderRadius: 1,
                bgcolor: `rgba(${CHAT_SLOW_MODE_COLOR_RGB}, 0.14)`,
                color: CHAT_SLOW_MODE_COLOR,
              }}
            >
              <TimerOutlinedIcon sx={{ fontSize: 14 }} />
              <Typography sx={{ fontSize: 11, fontWeight: 700 }}>{slowModeSeconds}с</Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
          {canManageChat && setSlowMode && (
            <ChatSlowModeButton slowModeSeconds={slowModeSeconds} onSetSlowMode={setSlowMode} />
          )}
          {!isMobile && !isFullscreenLayout && setIsOpen && (
            <IconButton
              onClick={() => setIsOpen(false)}
              size="small"
              aria-label="Свернуть чат"
              sx={{
                color: 'rgba(255,255,255,0.6)',
                '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          )}
        </Box>
      </StyledChatHeader>

      {chatRules.trim() && (
        <Box
          sx={{
            px: 1.5,
            py: 1,
            mx: 1,
            mt: 0.5,
            borderRadius: 1.5,
            bgcolor: 'rgba(142,123,255,0.1)',
            border: '1px solid rgba(142,123,255,0.2)',
            flexShrink: 0,
          }}
        >
          <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#b8adff', mb: 0.5, letterSpacing: '0.04em' }}>
            ПРАВИЛА ЧАТА
          </Typography>
          <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.45, whiteSpace: 'pre-wrap' }}>
            {chatRules.trim()}
          </Typography>
        </Box>
      )}

      <Box sx={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {messages.length === 0 ? (
          <StyledChatEmpty>
            <ForumOutlinedIcon sx={{ fontSize: 40, opacity: 0.35 }} />
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>Пока тихо</Typography>
            <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', maxWidth: 200 }}>
              Будьте первым — напишите что-нибудь в чат
            </Typography>
          </StyledChatEmpty>
        ) : (
          <>
            <StyledChatList ref={listRef} onScroll={handleScroll}>
              {messages.map((msg, index) => (
                <ChatCard
                  customColor={getNicknameColor(msg.username)}
                  msg={msg}
                  key={getMessageKey(msg, index)}
                  isAuth={isAuth}
                  canManageChat={canManageChat}
                  currentUserId={profile?.id}
                  streamerId={streamerId}
                  isStreamer={isStreamer}
                  onReply={handleReply}
                  onDeleteMessage={deleteMessage}
                  onTimeoutUser={timeoutUser}
                  onBanUser={banUser}
                  onUnbanUser={unbanUser}
                  bannedUserIds={bannedUserIds}
                  currentUserNickname={profile?.nickname}
                />
              ))}
            </StyledChatList>
            {showNewMessagesPill && (
              <StyledNewMessagesPill onClick={() => scrollToBottom(true)} role="button" tabIndex={0}>
                <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
                Новые сообщения
              </StyledNewMessagesPill>
            )}
          </>
        )}
        {chatError && (
          <StyledChatErrorToast role="alert">
            <Typography sx={{ flex: 1, fontSize: 13, color: '#ff8a8a', lineHeight: 1.35 }}>{chatError}</Typography>
            {clearChatError && (
              <IconButton
                size="small"
                onClick={clearChatError}
                aria-label="Закрыть ошибку"
                sx={{ color: 'rgba(255,255,255,0.5)', p: 0.25, mt: '-2px' }}
              >
                <CloseIcon sx={{ fontSize: 16 }} />
              </IconButton>
            )}
          </StyledChatErrorToast>
        )}
      </Box>

      <StyledChatInputArea>
        {replyTo && (
          <StyledChatReplyBar>
            <StyledChatReplyLabel>
              Ответ{' '}
              <StyledChatReplyName nameColor={getNicknameColor(replyTo.username)}>
                @{replyTo.username}
              </StyledChatReplyName>
            </StyledChatReplyLabel>
            <IconButton
              size="small"
              onClick={() => setReplyTo(null)}
              aria-label="Отменить ответ"
              sx={{ color: 'rgba(255,255,255,0.55)', p: 0.25, '&:hover': { color: '#fff' } }}
            >
              <CloseIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </StyledChatReplyBar>
        )}
        <StyledChatInputWrap expanded={isInputExpanded}>
          <ChatEmojiPicker disabled={!isAuth} onSelect={(emoji) => handleTextChange(text + emoji)} />
          <StyledChatInputField>
            <StyledChatTextField
              inputRef={textareaRef}
              placeholder={isAuth ? 'Написать сообщение…' : 'Войдите, чтобы писать в чат'}
              autoComplete="off"
              disabled={!isAuth}
              value={text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTextChange(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              multiline
              minRows={1}
              maxRows={3}
              inputProps={{ maxLength: CHAT_MAX_MESSAGE_LENGTH }}
            />
          </StyledChatInputField>
          <StyledChatSendColumn>
            <StyledChatCharCounter
              visible={showCharCounter}
              warning={charsLeft <= 50 && charsLeft > 0}
              danger={charsLeft <= 0}
            >
              {text.length}/{CHAT_MAX_MESSAGE_LENGTH}
            </StyledChatCharCounter>
            <StyledChatSendButton
              disabled={!isAuth || !text.trim() || isOverLimit}
              onClick={handleSend}
              aria-label="Отправить"
            >
              <SendIcon sx={{ fontSize: 18 }} />
            </StyledChatSendButton>
          </StyledChatSendColumn>
        </StyledChatInputWrap>
      </StyledChatInputArea>
    </StyledChatContainer>
  );
};
