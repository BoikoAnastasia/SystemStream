import { useEffect, useRef, useState } from 'react';
// hls
import Hls from 'hls.js';
// components
import { ListSettings } from './components/ListSettings';
import { SliderVolume } from './components/SliderVolume';
//mui
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SettingsIcon from '@mui/icons-material/Settings';
import CropFreeIcon from '@mui/icons-material/CropFree';
import CircularProgress from '@mui/material/CircularProgress';
// styles
import {
  CircularProgressBox,
  StyledVideo,
  VideoFrame,
  VideoPlayerStyledBottom,
  VideoPlayerStyledBox,
  VideoPlayerStyledButtonPlay,
  VideoPlayerStyledButtons,
} from './StyledVideoPlayer';

export const VideoPlayer = ({ src }: { src?: string }) => {
  const hlsRef = useRef<Hls | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [showControls, setShowControls] = useState(true);
  const [levels, setLevels] = useState<any[]>([]);
  const [currentLevelIndex, setСurrentLevelIndex] = useState<number>(-1);
  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const iconStyles = {
    color: 'white',
    fontSize: '1.5rem',
  };

  const bigIconStyles = {
    color: 'white',
    fontSize: '3em',
  };

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // HLS + video events in one effect
  useEffect(() => {
    if (!src) return;
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    const onCanPlay = () => {
      setIsLoading(false);
    };

    const onWaiting = () => {
      if (!video.paused) {
        setIsLoading(true);
      }
    };

    const onPause = () => {
      setIsLoading(false);
    };

    const onPlaying = () => {
      setIsLoading(false);
    };

    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('waiting', onWaiting);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('pause', onPause);

    if (Hls.isSupported()) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      hls = new Hls();
      hlsRef.current = hls;

      const onManifest = () => {
        setLevels(hls!.levels || []);
        // Попытка autoplay — может быть заблокирована, но тестируем
        video.play().catch(() => {
          /* autoplay blocked — пользователь должен нажать play */
        });
      };

      const onFragBuffered = () => setIsLoading(false);
      const onBufferAppending = () => setIsLoading(true);

      hls.on(Hls.Events.MANIFEST_PARSED, onManifest);
      hls.on(Hls.Events.FRAG_BUFFERED, onFragBuffered);
      hls.on(Hls.Events.BUFFER_APPENDING, onBufferAppending);

      hls.loadSource(src);
      hls.attachMedia(video);
    } else {
      // Fallback: native HLS support
      video.src = src;
      video.load();
      video.play().catch(() => {});
    }

    return () => {
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('waiting', onWaiting);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('pause', onPause);

      if (hls) {
        hls.off(Hls.Events.MANIFEST_PARSED);
        hls.off(Hls.Events.FRAG_BUFFERED);
        hls.off(Hls.Events.BUFFER_APPENDING);
        hls.destroy();
        hlsRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]); // одно место, где создаём/чистим Hls и video listeners

  // play/pause state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('ended', onPause);
    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('ended', onPause);
    };
  }, []);

  // prevent rewind
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let lastTime = 0;
    const onTimeUpdate = () => {
      if (video.currentTime > lastTime + 0.5) {
        video.currentTime = lastTime;
      }
      lastTime = video.currentTime;
    };
    video.addEventListener('timeupdate', onTimeUpdate);
    return () => video.removeEventListener('timeupdate', onTimeUpdate);
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      setShowControls(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    }
  }, [isPlaying]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const setQuality = (index: number) => {
    if (!hlsRef.current) return;
    setIsLoading(true);
    const hls = hlsRef.current;
    const onFragBuffered = () => {
      setIsLoading(false);
      hls.off(Hls.Events.FRAG_BUFFERED, onFragBuffered);
    };
    hls.on(Hls.Events.FRAG_BUFFERED, onFragBuffered);
    hls.currentLevel = index;
    setСurrentLevelIndex(index);
    setOpen(false);
  };

  const toggleFullscreen = () => {
    const container = playerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) container.requestFullscreen();
    else document.exitFullscreen();
  };

  const resetHideTimer = () => {
    setShowControls(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setShowControls(false), isFullscreen ? 3000 : 5000);
  };

  useEffect(() => {
    if (isFullscreen) {
      resetHideTimer();
    } else {
      setShowControls(true);
    }
  }, [isFullscreen]);

  const handleMouseMove = () => resetHideTimer();
  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false);
    }
  };

  const handlePlayerClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    togglePlay();
  };

  return (
    <VideoPlayerStyledBox
      ref={playerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handlePlayerClick}
      className={!showControls && isPlaying ? 'hideCursor' : ''}
    >
      <VideoFrame>
        {/* Видео всегда монтируем */}
        <StyledVideo
          ref={videoRef}
          controls={false}
          onDoubleClick={toggleFullscreen}
          controlsList="nodownload noplaybackrate"
          disablePictureInPicture
        />
      </VideoFrame>

      {/* Loader — оверлей поверх видео */}
      {isLoading && isPlaying && (
        <CircularProgressBox>
          <CircularProgress sx={{ color: 'white' }} />
        </CircularProgressBox>
      )}

      {src && showControls && (
        <VideoPlayerStyledButtonPlay onClick={togglePlay}>
          {isPlaying ? <PauseIcon sx={bigIconStyles} /> : <PlayArrowIcon sx={bigIconStyles} />}
        </VideoPlayerStyledButtonPlay>
      )}

      {src && showControls && (
        <VideoPlayerStyledBottom>
          <VideoPlayerStyledButtons>
            <IconButton onClick={togglePlay}>
              {isPlaying ? <PauseIcon sx={iconStyles} /> : <PlayArrowIcon sx={iconStyles} />}
            </IconButton>
            <SliderVolume videoRef={videoRef} />
          </VideoPlayerStyledButtons>
          <VideoPlayerStyledButtons>
            {open && <ListSettings levels={levels} onClick={setQuality} currentIndex={currentLevelIndex} />}
            <IconButton onClick={() => setOpen(!open)}>
              <SettingsIcon sx={iconStyles} />
            </IconButton>
            <IconButton onClick={toggleFullscreen}>
              <CropFreeIcon sx={iconStyles} />
            </IconButton>
          </VideoPlayerStyledButtons>
        </VideoPlayerStyledBottom>
      )}
    </VideoPlayerStyledBox>
  );
};
