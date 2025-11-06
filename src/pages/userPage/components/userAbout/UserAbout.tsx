import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
// redux
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { fetchUserByNickname, userProfile } from '../../../../store/actions/UserActions';
// components
import { VideoCard } from '../../../../components/videoCard/VideoCard';
import { BannerEffect } from '../../../../components/ui/bannerEffect/BannerEffect';
import { Socials } from '../../../../components/socials/Socials';
// redux
import { useAppSelector } from '../../../../hooks/redux';
// styles
import {
  ContainerProfileComponents,
  StyledAboutSection,
  StyledBannerAvatar,
  StyledBannerUserInfo,
  StyledBannerUserName,
  StyledFollowButton,
  StyledInfo,
  StyledNameComponents,
  StyledProfileSection,
  StyledTitleModal,
  StyledVideoGrid,
  StyledVideoSection,
} from '../../../../components/StylesComponents';
import { fetchStreamKey, fetchStreamView } from '../../../../store/actions/StreamActions';
import { VideoHls } from '../../../../components/videoHls/VideoHls';
import Hls from 'hls.js';

export const UserAbout = () => {
  const { nickname } = useParams<{ nickname: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { data: profile } = useAppSelector((state) => state.user);
  const { data: selectedUser } = useAppSelector((state) => state.selectUser);
  const { data: stream } = useAppSelector((state) => state.stream);
  const { data: setting } = useAppSelector((state) => state.settings);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamStartedRef = useRef(false);

  const startStream = (hlsUrl: string) => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(hlsUrl);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current?.play();
        });
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = hlsUrl;
        videoRef.current.play();
      }
    }
  };

  useEffect(() => {
    if (!nickname) return;
    if (profile?.nickname === nickname) {
      if (!profile) dispatch(userProfile());
      return;
    }
    dispatch(fetchUserByNickname(nickname));
  }, [nickname, dispatch, profile]);

  useEffect(() => {
    if (stream?.isLive && setting?.streamServerUrl) {
      if (stream.isLive && !streamStartedRef.current) {
        startStream(stream.hlsUrl);
        streamStartedRef.current = true;
      }
    } else if (!stream?.isLive) {
      // Поток закончился
      streamStartedRef.current = false;
      if (videoRef.current) videoRef.current.src = '';
    }
  }, [stream, setting]);

  useEffect(() => {
    if (!nickname) return;
    if (!setting) dispatch(fetchStreamKey());
  }, [dispatch, nickname, setting]);

  useEffect(() => {
    if (!nickname) return;

    // Сначала вызываем один раз сразу
    dispatch(fetchStreamView(nickname));

    // Затем запускаем интервал
    const interval = setInterval(() => {
      dispatch(fetchStreamView(nickname));
    }, 5000);

    return () => clearInterval(interval);
  }, [nickname, dispatch]);

  const userData = profile?.nickname === nickname ? profile : selectedUser;

  return (
    <ContainerProfileComponents>
      <StyledProfileSection
        sx={{
          backgroundImage: `url(${userData?.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <StyledInfo>
          {setting && stream && (
            <Link
              to={setting.streamServerUrl!}
              style={{
                width: '70%',
                height: '100%',
              }}
            >
              <VideoHls videoRef={videoRef} />
            </Link>
          )}
          <StyledBannerUserName>{userData?.nickname || 'Тестовое имя'}</StyledBannerUserName>
          <StyledBannerUserInfo>Streamer</StyledBannerUserInfo>
          <StyledBannerUserInfo>1.2M подписчиков</StyledBannerUserInfo>
          <StyledFollowButton>Подписаться</StyledFollowButton>
        </StyledInfo>

        {!userData?.backgroundImage && <BannerEffect />}
        <StyledBannerAvatar src={`url(${userData?.profileImage}`} />
        <Socials />
      </StyledProfileSection>

      <StyledAboutSection>
        <StyledTitleModal>ОБО МНЕ</StyledTitleModal>
        <StyledNameComponents sx={{ padding: '0 20px' }}>
          {userData?.profileDescription || 'Тестовое описание '}
        </StyledNameComponents>
      </StyledAboutSection>
      <StyledVideoSection>
        <StyledTitleModal>ПОСЛЕДНИЕ СТРИМЫ</StyledTitleModal>
        <StyledVideoGrid>
          {[1, 2, 3, 4, 5].map((i) => (
            <VideoCard key={i} index={i} />
          ))}
        </StyledVideoGrid>
      </StyledVideoSection>
    </ContainerProfileComponents>
  );
};
