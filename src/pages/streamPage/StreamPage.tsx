import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// components
import { Chat } from '../../components/chat/Chat';
import { VideoPlayer, VideoPlayerStreamerInfo } from '../../components/videoPlayer/VideoPlayer';
// mui
import { Box, Button, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
// hooks
import { useDeviceDetect } from '../../hooks/useDeviceDetect';
import { useAppSelector } from '../../hooks/redux';
import { useStreamTeamAccess } from '../../hooks/useStreamTeam';
// types
import { IChatMessage, IStream } from '../../types/share';
import {
  StyledContainerStream,
  StyledStreamContainerChat,
  StyledStreamContainerVideoPlayer,
  StyledStreamMetaBar,
} from './StyledStreamPage';
import { HeaderStreamPage } from './components/headerStreamPage/HeaderStreamPage';
import { StreamMetaPanel } from './components/streamMeta/StreamMetaPanel';
import { StyledChatCollapseTab } from '../../components/chat/StyledChat';

export const StreamPage = ({
  streamInfo,
  viewerCount,
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
  streamer,
}: {
  streamInfo: IStream | null;
  viewerCount: number;
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
  streamer?: VideoPlayerStreamerInfo | null;
}) => {
  const { isMobile } = useDeviceDetect();
  const { data: profile } = useAppSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(true);
  const [playerFullscreen, setPlayerFullscreen] = useState(false);
  const [fsChatOpen, setFsChatOpen] = useState(false);
  const [videoBlockHeight, setVideoBlockHeight] = useState<number>();
  const fullscreenHostRef = useRef<HTMLDivElement>(null);
  const videoBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playerFullscreen) setFsChatOpen(false);
  }, [playerFullscreen]);

  useEffect(() => {
    if (isMobile) {
      setVideoBlockHeight(undefined);
      return;
    }

    const node = videoBlockRef.current;
    if (!node) return;

    const updateHeight = () => {
      setVideoBlockHeight(Math.round(node.getBoundingClientRect().height));
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(node);
    window.addEventListener('resize', updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, [isMobile, isOpen, streamInfo?.hlsUrl]);

  const videoContainerFlex = isMobile ? '0 0 auto' : isOpen ? '0 1 70%' : '0 1 100%';
  const chatFlex = !isOpen ? '0 0 48px' : isMobile ? '0 0 auto' : '0 0 30%';

  const desktopChatHeight =
    !isMobile && videoBlockHeight
      ? {
          height: videoBlockHeight,
          maxHeight: videoBlockHeight,
          alignSelf: 'flex-start',
        }
      : undefined;

  const streamerNickname = streamer?.nickname;
  const isOwnChannel = Boolean(streamerNickname && profile?.nickname === streamerNickname);
  const { access: delegatedAccess } = useStreamTeamAccess(streamerNickname && !isOwnChannel ? streamerNickname : '');
  const showDelegatedManage = Boolean(delegatedAccess?.canManageStream);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
        <StyledContainerStream
          sx={{
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 1.5 : 1,
            alignItems: isMobile ? 'stretch' : 'flex-start',
          }}
        >
          <StyledStreamContainerVideoPlayer ref={videoBlockRef} sx={{ flex: videoContainerFlex, minHeight: 0 }}>
            <HeaderStreamPage streamInfo={streamInfo} viewerCount={viewerCount} />
            {showDelegatedManage && streamerNickname && (
              <Box sx={{ px: 1, pb: 1 }}>
                <Button
                  component={Link}
                  to={`/${streamerNickname}/manage/stream`}
                  size="small"
                  startIcon={<DashboardCustomizeOutlinedIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                    borderColor: 'rgba(142,123,255,0.35)',
                    bgcolor: 'rgba(142,123,255,0.1)',
                    textTransform: 'none',
                    fontSize: 13,
                    '&:hover': {
                      bgcolor: 'rgba(142,123,255,0.18)',
                      borderColor: 'rgba(142,123,255,0.5)',
                    },
                  }}
                  variant="outlined"
                >
                  Управление эфиром
                </Button>
              </Box>
            )}
            <Box
              ref={fullscreenHostRef}
              sx={{
                flex: '0 0 auto',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                overflow: 'hidden',
                bgcolor: playerFullscreen ? '#000' : 'transparent',
                '&:fullscreen': {
                  width: '100%',
                  height: '100%',
                  maxWidth: 'none',
                  maxHeight: 'none',
                  flex: 1,
                  bgcolor: '#000',
                },
                '&:-webkit-full-screen': {
                  width: '100%',
                  height: '100%',
                  maxWidth: 'none',
                  maxHeight: 'none',
                  flex: 1,
                  bgcolor: '#000',
                },
              }}
            >
              <Box
                sx={{
                  flex: playerFullscreen && fsChatOpen ? '1 1 72%' : '1 1 100%',
                  minWidth: 0,
                  minHeight: 0,
                  display: 'flex',
                  transition: 'flex 0.3s ease',
                  height: playerFullscreen ? '100%' : undefined,
                }}
              >
                <VideoPlayer
                  src={streamInfo?.hlsUrl}
                  mode={streamInfo?.isLive === false ? 'vod' : 'live'}
                  variant="embedded"
                  streamer={streamer}
                  fillContainer={playerFullscreen}
                  viewerCount={viewerCount}
                  fullscreenTargetRef={fullscreenHostRef}
                  onFullscreenChange={setPlayerFullscreen}
                  fullscreenChatOpen={fsChatOpen}
                  onFullscreenChatChange={setFsChatOpen}
                />
              </Box>
              {playerFullscreen && fsChatOpen && (
                <Box
                  sx={{
                    flex: '0 0 28%',
                    minWidth: { xs: 240, sm: 280 },
                    maxWidth: 400,
                    minHeight: 0,
                    height: '100%',
                    borderLeft: '1px solid rgba(255,255,255,0.12)',
                    bgcolor: 'rgba(12,12,16,0.98)',
                  }}
                >
                  <Chat
                    layout="fullscreen"
                    messages={messages}
                    sendMessage={sendMessage}
                    deleteMessage={deleteMessage}
                    timeoutUser={timeoutUser}
                    banUser={banUser}
                    unbanUser={unbanUser}
                    bannedUserIds={bannedUserIds}
                    chatError={chatError}
                    clearChatError={clearChatError}
                    inputRestore={inputRestore}
                    consumeInputRestore={consumeInputRestore}
                    slowModeSeconds={slowModeSeconds}
                    setSlowMode={setSlowMode}
                    chatRules={chatRules}
                    canManageChat={canManageChat}
                    streamerId={streamInfo?.streamerId}
                  />
                </Box>
              )}
            </Box>
          </StyledStreamContainerVideoPlayer>
          <StyledStreamContainerChat sx={{ flex: chatFlex, minHeight: 0, ...desktopChatHeight }}>
            {isOpen ? (
              <Chat
                setIsOpen={setIsOpen}
                messages={messages}
                sendMessage={sendMessage}
                deleteMessage={deleteMessage}
                timeoutUser={timeoutUser}
                banUser={banUser}
                unbanUser={unbanUser}
                bannedUserIds={bannedUserIds}
                chatError={chatError}
                clearChatError={clearChatError}
                inputRestore={inputRestore}
                consumeInputRestore={consumeInputRestore}
                slowModeSeconds={slowModeSeconds}
                setSlowMode={setSlowMode}
                chatRules={chatRules}
                canManageChat={canManageChat}
                streamerId={streamInfo?.streamerId}
              />
            ) : (
              <StyledChatCollapseTab onClick={() => setIsOpen(true)} role="button" tabIndex={0}>
                <ChevronLeftIcon sx={{ color: 'rgba(255,255,255,0.6)', fontSize: 22 }} />
                <ForumOutlinedIcon sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 20 }} />
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.45)',
                    writingMode: 'vertical-rl',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Чат
                </Typography>
              </StyledChatCollapseTab>
            )}
          </StyledStreamContainerChat>
        </StyledContainerStream>

        <StyledStreamMetaBar>
          <StreamMetaPanel streamInfo={streamInfo} />
        </StyledStreamMetaBar>
      </Box>
    </>
  );
};
