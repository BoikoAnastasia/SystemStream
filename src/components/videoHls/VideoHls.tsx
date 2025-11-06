export const VideoHls = ({ videoRef }: { videoRef: React.RefObject<HTMLVideoElement | null> }) => {
  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      loop
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '12px',
      }}
    />
  );
};
