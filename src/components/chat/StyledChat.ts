import { Box, IconButton, styled, TextField } from '@mui/material';

const chatScrollbarStyles = {
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(142, 123, 255, 0.42) transparent',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255,255,255,0.04)',
    borderRadius: '999px',
    margin: '6px 0',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'linear-gradient(180deg, rgba(142,123,255,0.55) 0%, rgba(109,93,251,0.35) 100%)',
    borderRadius: '999px',
    border: '2px solid transparent',
    backgroundClip: 'padding-box',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: 'linear-gradient(180deg, rgba(142,123,255,0.72) 0%, rgba(109,93,251,0.52) 100%)',
    backgroundClip: 'padding-box',
  },
} as const;

const chatInputStyles = {
  color: '#fff !important',
  caretColor: '#fff',
  WebkitTextFillColor: '#fff',
  padding: '8px 12px',
  fontSize: '15px',
  lineHeight: 1.45,
  resize: 'none',
  overflowY: 'auto' as const,
  maxHeight: '68px',
  boxSizing: 'border-box' as const,
  ...chatScrollbarStyles,
  '&::placeholder': {
    color: 'rgba(255,255,255,0.35)',
    opacity: 1,
    WebkitTextFillColor: 'rgba(255,255,255,0.35)',
  },
};

export const StyledChatContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  height: '100%',
  maxHeight: '100%',
  minHeight: 0,
  minWidth: '250px',
  backgroundColor: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(16px)',
}));

export const StyledChatHeader = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  padding: '14px 16px',
  borderBottom: '1px solid rgba(255,255,255,0.08)',
  flexShrink: 0,
}));

export const StyledChatList = styled(Box)(() => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  flex: '1 1 auto',
  minHeight: 0,
  maxHeight: '100%',
  padding: '12px 8px',
  overflowY: 'auto',
  overflowX: 'hidden',
  ...chatScrollbarStyles,
}));

export const StyledChatEmpty = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  flex: 1,
  padding: '32px 24px',
  textAlign: 'center',
  color: 'rgba(255,255,255,0.45)',
}));

export const StyledChatCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'mentioned',
})<{ mentioned?: boolean }>(({ mentioned }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  padding: '6px 10px',
  borderRadius: '8px',
  transition: 'background 0.15s ease',
  ...(mentioned && {
    background: 'rgba(142,123,255,0.1)',
    boxShadow: 'inset 2px 0 0 #8e7bff',
  }),
  '&:hover': {
    background: mentioned ? 'rgba(142,123,255,0.14)' : 'rgba(255,255,255,0.04)',
  },
}));

export const StyledChatCardHeader = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  minWidth: 0,
  minHeight: '20px',
}));

export const StyledChatCardNickname = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'customColor' && prop !== 'interactive' && prop !== 'nickBgHover',
})(
  ({
    customColor,
    interactive,
    nickBgHover,
  }: {
    customColor: string;
    interactive?: boolean;
    nickBgHover?: string;
  }) => ({
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '20px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flex: '0 1 auto',
    minWidth: 0,
    maxWidth: '100%',
    color: interactive ? customColor : 'rgba(255,255,255,0.55)',
    ...(interactive && {
      cursor: 'pointer',
      isolation: 'isolate',
      '&::before': {
        content: '""',
        position: 'absolute',
        left: -4,
        right: -4,
        top: 0,
        bottom: 0,
        borderRadius: '4px',
        backgroundColor: 'transparent',
        transition: 'background-color 0.15s ease',
        zIndex: -1,
      },
      '&:hover::before': {
        backgroundColor: nickBgHover ?? 'rgba(255,255,255,0.08)',
      },
    }),
  })
);

export const StyledChatRoleBadge = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'badgeColor' && prop !== 'badgeBg',
})(({ badgeColor, badgeBg }: { badgeColor: string; badgeBg: string }) => ({
  fontSize: '9px',
  fontWeight: 800,
  letterSpacing: '0.04em',
  lineHeight: 1,
  padding: '2px 5px',
  borderRadius: '4px',
  color: badgeColor,
  background: badgeBg,
  flexShrink: 0,
}));

export const StyledChatCardTime = styled(Box)(() => ({
  fontSize: '12px',
  color: 'rgba(255,255,255,0.3)',
  marginLeft: 'auto',
  flexShrink: 0,
  lineHeight: 1.3,
}));

export const StyledChatCardMessage = styled(Box)(() => ({
  fontSize: '15px',
  lineHeight: 1.45,
  color: 'rgba(255,255,255,0.92)',
  wordBreak: 'break-word',
  paddingLeft: 0,
}));

export const StyledChatMention = styled('span', {
  shouldForwardProp: (prop) => prop !== 'isSelf',
})<{ isSelf?: boolean }>(({ isSelf }) => ({
  fontWeight: 700,
  color: isSelf ? '#c4b5ff' : '#8e7bff',
  backgroundColor: isSelf ? 'rgba(142,123,255,0.22)' : 'rgba(142,123,255,0.12)',
  borderRadius: '4px',
  padding: '0 3px',
}));

export const StyledChatDeletedMessage = styled(Box)(() => ({
  fontSize: '14px',
  lineHeight: 1.45,
  color: 'rgba(255,255,255,0.45)',
  fontStyle: 'italic',
}));

export const StyledChatDeletedReveal = styled(Box)(() => ({
  fontSize: '14px',
  lineHeight: 1.45,
  color: 'rgba(255,255,255,0.55)',
  marginTop: '4px',
  wordBreak: 'break-word',
  textDecoration: 'line-through',
  opacity: 0.75,
}));

export const StyledChatDeletedToggle = styled('button')(() => ({
  background: 'none',
  border: 'none',
  padding: 0,
  marginLeft: '6px',
  fontSize: '13px',
  color: 'rgba(142,123,255,0.9)',
  cursor: 'pointer',
  textDecoration: 'underline',
  fontStyle: 'normal',
  '&:hover': {
    color: '#8e7bff',
  },
}));

export const StyledChatInputArea = styled(Box)(() => ({
  position: 'relative',
  flexShrink: 0,
  padding: '12px 16px 16px',
  borderTop: '1px solid rgba(255,255,255,0.06)',
}));

export const StyledChatReplyBar = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '8px',
  padding: '6px 10px',
  borderRadius: '8px',
  background: 'rgba(142,123,255,0.12)',
  border: '1px solid rgba(142,123,255,0.22)',
}));

export const StyledChatReplyLabel = styled(Box)(() => ({
  flex: 1,
  minWidth: 0,
  fontSize: '13px',
  color: 'rgba(255,255,255,0.85)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const StyledChatReplyName = styled('span', {
  shouldForwardProp: (prop) => prop !== 'nameColor',
})(({ nameColor }: { nameColor: string }) => ({
  fontWeight: 700,
  color: nameColor,
}));

export const StyledChatErrorToast = styled(Box)(() => ({
  position: 'absolute',
  left: '12px',
  right: '12px',
  bottom: '8px',
  zIndex: 10,
  display: 'flex',
  alignItems: 'flex-start',
  gap: '6px',
  padding: '10px 12px',
  borderRadius: '10px',
  background: 'rgba(28, 14, 22, 0.96)',
  border: '1px solid rgba(255, 59, 59, 0.35)',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
  backdropFilter: 'blur(12px)',
  pointerEvents: 'auto',
  animation: 'chatErrorIn 0.2s ease',
  '@keyframes chatErrorIn': {
    from: { opacity: 0, transform: 'translateY(8px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
}));

export const StyledChatInputField = styled(Box)(() => ({
  position: 'relative',
  flex: 1,
  minWidth: 0,
}));

export const StyledChatInputWrap = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'expanded',
})(({ expanded }: { expanded?: boolean }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: expanded ? 'flex-end' : 'center',
  gap: '4px',
  padding: '4px',
  borderRadius: '14px',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.08)',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease, align-items 0.15s ease',
  '&:focus-within': {
    borderColor: 'rgba(109,93,251,0.45)',
    boxShadow: '0 0 0 3px rgba(109,93,251,0.12)',
  },
}));

export const StyledChatSendColumn = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '4px',
  flexShrink: 0,
  minWidth: '36px',
}));

export const StyledChatCharCounter = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'visible' && prop !== 'warning' && prop !== 'danger',
})(({ visible, warning, danger }: { visible: boolean; warning: boolean; danger: boolean }) => ({
  fontSize: '10px',
  fontWeight: 700,
  lineHeight: 1,
  whiteSpace: 'nowrap',
  letterSpacing: '0.02em',
  pointerEvents: 'none',
  userSelect: 'none',
  visibility: visible ? 'visible' : 'hidden',
  opacity: visible ? 1 : 0,
  height: visible ? 'auto' : 0,
  overflow: 'hidden',
  transition: 'opacity 0.15s ease, color 0.15s ease',
  color: danger ? '#ff6b6b' : warning ? '#ffc107' : 'rgba(255,255,255,0.45)',
}));

export const StyledChatTextField = styled(TextField)(() => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    padding: 0,
    background: 'transparent',
    alignItems: 'center',
    minHeight: 0,
    '& fieldset': { border: 'none' },
    '&:hover fieldset': { border: 'none' },
    '&.Mui-focused fieldset': { border: 'none' },
  },
  '& .MuiOutlinedInput-input, & textarea, & .MuiOutlinedInput-inputMultiline': {
    ...chatInputStyles,
  },
}));

export const StyledChatSendButton = styled(IconButton)(() => ({
  width: 36,
  height: 36,
  borderRadius: '10px',
  background: 'var(--gradient-selected)',
  color: '#fff',
  flexShrink: 0,
  transition: 'opacity 0.2s ease, transform 0.15s ease',
  '&:hover': {
    background: 'var(--gradient-selected-hover)',
  },
  '&.Mui-disabled': {
    background: 'rgba(255,255,255,0.06)',
    color: 'rgba(255,255,255,0.25)',
  },
}));

export const StyledNewMessagesPill = styled(Box)(() => ({
  position: 'absolute',
  bottom: '12px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 2,
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: '6px 14px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: 600,
  color: '#fff',
  background: 'var(--gradient-selected)',
  boxShadow: 'var(--boxShadowButton)',
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'transform 0.15s ease, opacity 0.2s ease',
  '&:hover': {
    transform: 'translateX(-50%) scale(1.03)',
  },
}));

export const StyledChatCollapseTab = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  height: '100%',
  minHeight: '200px',
  padding: '16px 8px',
  backgroundColor: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(16px)',
  cursor: 'pointer',
  transition: 'background 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
}));
