import { useEffect, useState } from 'react';
// mui
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { IconButton, Slider } from '@mui/material';
import { getVolumeStorage, setVolumeStorage } from '../../../utils/storage';

export const SliderVolume = ({ videoRef }: any) => {
  const [volume, setVolume] = useState(() => {
    const savedVolume = getVolumeStorage();
    return savedVolume !== undefined ? savedVolume : 80;
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = volume / 100;
  }, [volume, videoRef]);

  const handleChange = (event: Event, value: number | number[]) => {
    if (typeof value === 'number') {
      setVolume(value);
      setVolumeStorage(value);
    }
  };

  const handleClick = (value: number) => {
    if (typeof value === 'number') {
      setVolume(value);
      setVolumeStorage(value);
    }
  };

  return (
    <>
      {volume === 0 ? (
        <IconButton onClick={() => handleClick(1)}>
          <VolumeOffIcon sx={{ color: 'white', fontSize: '1.5em' }} />
        </IconButton>
      ) : (
        <IconButton onClick={() => handleClick(0)}>
          <VolumeUpIcon sx={{ color: 'white', fontSize: '1.5em' }} />
        </IconButton>
      )}
      <Slider
        min={0}
        max={100}
        value={volume}
        onChange={handleChange}
        sx={{
          width: 100,
          color: 'white',
          '& .MuiSlider-thumb': {
            width: '10px',
            height: '10px',
          },
        }}
      />
    </>
  );
};
