import { parseMessageMentions } from '../../chat.utils';
import { StyledChatCardMessage, StyledChatMention } from '../../StyledChat';

export const ChatMessageText = ({ text, currentUserNickname }: { text: string; currentUserNickname?: string }) => {
  const parts = parseMessageMentions(text);
  const hasMentions = parts.some((part) => part.type === 'mention');

  if (!hasMentions) {
    return <StyledChatCardMessage>{text}</StyledChatCardMessage>;
  }

  const normalizedNickname = currentUserNickname?.toLowerCase();

  return (
    <StyledChatCardMessage>
      {parts.map((part, index) => {
        if (part.type === 'text') {
          return <span key={`${index}-text`}>{part.value}</span>;
        }

        const isSelf = Boolean(normalizedNickname && part.value.toLowerCase() === normalizedNickname);

        return (
          <StyledChatMention key={`${index}-mention`} isSelf={isSelf}>
            @{part.value}
          </StyledChatMention>
        );
      })}
    </StyledChatCardMessage>
  );
};
