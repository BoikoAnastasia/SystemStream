import {
  StyledChatCard,
  StyledChatCardImg,
  StyledChatCardMessage,
  StyledChatCardMessageCurrentUser,
  StyledChatCardNickname,
} from '../../StylesComponents';

import { IMessage } from '../../../types/share';

export const ChatCard = ({ msg }: { msg: IMessage }) => {
  const { nickname, message, currentUser, avatar } = msg;
  return (
    <StyledChatCard>
      <StyledChatCardImg src={avatar || ''} alt="" />
      <StyledChatCardNickname>{nickname}</StyledChatCardNickname>
      {currentUser ? (
        <StyledChatCardMessageCurrentUser>{message}</StyledChatCardMessageCurrentUser>
      ) : (
        <StyledChatCardMessage>{message}</StyledChatCardMessage>
      )}
    </StyledChatCard>
  );
};
