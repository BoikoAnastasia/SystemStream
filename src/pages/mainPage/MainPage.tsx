import { FC, JSX, useEffect, useRef } from 'react';
import { appLayout } from '../../layout/index';
// import Hls from 'hls.js';

export const MainPage: FC = appLayout((): JSX.Element => {
  // const videoRef = useRef<HTMLVideoElement>(null);
  // useEffect(() => {
  //   const video = videoRef.current;
  //   const hls = new Hls();
  //   if (video) {
  //     const hls = new Hls();

  //     hls.loadSource('https://example.com/stream.m3u8'); // укажи реальный URL
  //     hls.attachMedia(video);

  //     hls.on(Hls.Events.MANIFEST_PARSED, () => {
  //       video.play().catch((err) => {
  //         console.error('Autoplay failed:', err);
  //       });
  //     });
  //   }
  //   return () => hls.destroy();
  // }, []);

  return <div className="page container">{/* <video ref={videoRef} controls autoPlay /> */}</div>;
});
