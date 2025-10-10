import { StyledChatCard, StyledChatCardMessage, StyledChatCardNickname } from '../../StylesComponents';

import { IMessage } from '../../../types/share';

export const ChatCard = ({ msg, customColor }: { msg: IMessage; customColor: string }) => {
  const { nickname, message } = msg;
  return (
    <StyledChatCard>
      <StyledChatCardNickname customColor={customColor}>{nickname}:</StyledChatCardNickname>
      <StyledChatCardMessage>{message}</StyledChatCardMessage>
    </StyledChatCard>
  );
};
