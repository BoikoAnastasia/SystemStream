export const setVolumeStorage = (volume: number) => {
  localStorage.setItem('video-player-volume', volume.toString());
};

export const getVolumeStorage = () => {
  const saved = localStorage.getItem('video-player-volume');
  return saved ? parseFloat(saved) : 80.0;
};

export const setQualityStorage = (level: number) => {
  localStorage.setItem('video-player-quality', level.toString());
};

export const getQualityStorage = () => {
  const saved = localStorage.getItem('video-player-quality');
  return saved ? parseInt(saved) : -1;
};
