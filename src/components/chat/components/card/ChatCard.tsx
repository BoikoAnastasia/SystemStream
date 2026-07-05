import { useState } from 'react';
import {
  StyledChatCard,
  StyledChatCardHeader,
  StyledChatCardNickname,
  StyledChatCardTime,
  StyledChatDeletedMessage,
  StyledChatDeletedReveal,
  StyledChatDeletedToggle,
  StyledChatRoleBadge,
} from '../../StyledChat';
import {
  formatChatTime,
  getRoleBadge,
  canModerateMessage,
  canReplyToMessage,
  messageMentionsNickname,
} from '../../chat.utils';
import { getNicknameBackground } from '../../../../utils/getNicknameColor';
import { IChatMessage } from '../../../../types/share';
import { ChatModMenu } from '../../ChatModMenu';
import { ChatMessageText } from './ChatMessageText';

export const ChatCard = ({
  msg,
  customColor,
  isAuth = false,
  canManageChat = false,
  currentUserId,
  streamerId,
  isStreamer = false,
  onReply,
  onDeleteMessage,
  onTimeoutUser,
  onBanUser,
  onUnbanUser,
  bannedUserIds = [],
  currentUserNickname,
}: {
  msg: IChatMessage;
  customColor: string;
  isAuth?: boolean;
  canManageChat?: boolean;
  currentUserId?: number;
  streamerId?: number;
  isStreamer?: boolean;
  onReply?: (msg: IChatMessage) => void;
  onDeleteMessage?: (messageId: string) => void;
  onTimeoutUser?: (userId: number, seconds: number) => void;
  onBanUser?: (userId: number) => void;
  onUnbanUser?: (userId: number) => void;
  bannedUserIds?: number[];
  currentUserNickname?: string;
}) => {
  const [revealed, setRevealed] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const { username, text, role, timestamp, isDeleted, deletedText } = msg;
  const roleBadge = getRoleBadge(role);
  const time = formatChatTime(timestamp);
  const canOpenMenu = canReplyToMessage(msg, currentUserId, isAuth) && Boolean(onReply);
  const showModActions =
    canManageChat &&
    onDeleteMessage &&
    onTimeoutUser &&
    onBanUser &&
    canModerateMessage(msg, { canManageChat, currentUserId, streamerId, isStreamer });
  const isBanned = bannedUserIds.includes(msg.userId);
  const nickBgHover = canOpenMenu ? getNicknameBackground(customColor, 0.22) : undefined;
  const mentionsMe = messageMentionsNickname(text, currentUserNickname);

  const openMenu = (target: HTMLElement) => {
    setMenuAnchorEl(target);
  };

  return (
    <StyledChatCard mentioned={mentionsMe} sx={isDeleted ? { opacity: 0.85 } : undefined}>
      <StyledChatCardHeader>
        <StyledChatCardNickname
          customColor={customColor}
          interactive={canOpenMenu}
          nickBgHover={nickBgHover}
          onClick={
            canOpenMenu
              ? (e) => {
                  e.stopPropagation();
                  openMenu(e.currentTarget);
                }
              : undefined
          }
          role={canOpenMenu ? 'button' : undefined}
          tabIndex={canOpenMenu ? 0 : undefined}
          onKeyDown={
            canOpenMenu
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openMenu(e.currentTarget);
                  }
                }
              : undefined
          }
        >
          {username}
        </StyledChatCardNickname>
        {roleBadge && (
          <StyledChatRoleBadge badgeColor={roleBadge.color} badgeBg={roleBadge.bg}>
            {roleBadge.label}
          </StyledChatRoleBadge>
        )}
        {mentionsMe && (
          <StyledChatRoleBadge badgeColor="#c4b5ff" badgeBg="rgba(142,123,255,0.2)">
            Вам
          </StyledChatRoleBadge>
        )}
        {time && <StyledChatCardTime>{time}</StyledChatCardTime>}
      </StyledChatCardHeader>
      {canOpenMenu && onReply && (
        <ChatModMenu
          msg={msg}
          anchorEl={menuAnchorEl}
          onClose={() => setMenuAnchorEl(null)}
          onReply={onReply}
          showModActions={showModActions}
          isBanned={isBanned}
          onDelete={onDeleteMessage}
          onTimeout={onTimeoutUser}
          onBan={onBanUser}
          onUnban={onUnbanUser}
        />
      )}
      {isDeleted ? (
        <StyledChatDeletedMessage>
          Сообщение удалено
          {canManageChat && deletedText && !revealed && (
            <StyledChatDeletedToggle type="button" onClick={() => setRevealed(true)}>
              Показать
            </StyledChatDeletedToggle>
          )}
        </StyledChatDeletedMessage>
      ) : (
        <ChatMessageText text={text} currentUserNickname={currentUserNickname} />
      )}
      {isDeleted && canManageChat && revealed && deletedText && (
        <StyledChatDeletedReveal>{deletedText}</StyledChatDeletedReveal>
      )}
    </StyledChatCard>
  );
};
