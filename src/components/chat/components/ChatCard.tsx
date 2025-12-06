import { StyledChatCard, StyledChatCardMessage, StyledChatCardNickname } from '../../StylesComponents';

import { IChatMessage } from '../../../types/share';

export const ChatCard = ({ msg, customColor }: { msg: IChatMessage; customColor: string }) => {
  const { username, text } = msg;
  return (
    <StyledChatCard>
      <StyledChatCardNickname customColor={customColor}>{username}:</StyledChatCardNickname>
      <StyledChatCardMessage>{text}</StyledChatCardMessage>
    </StyledChatCard>
  );
};
