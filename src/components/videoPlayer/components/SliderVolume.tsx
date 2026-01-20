import { useEffect, useState } from 'react';
// utils
import { getVolumeStorage, setVolumeStorage } from '../../../utils/storage';
// mui
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { IconButton, Slider } from '@mui/material';

export const SliderVolume = ({ videoRef }: any) => {
  const [volume, setVolume] = useState(() => {
    const savedVolume = getVolumeStorage();
    return savedVolume !== undefined ? savedVolume : 80;
  });

  const iconStyles = {
    color: 'white',
    fontSize: '1.5rem',
  };

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
          <VolumeOffIcon sx={{ iconStyles }} />
        </IconButton>
      ) : (
        <IconButton onClick={() => handleClick(0)}>
          <VolumeUpIcon sx={{ iconStyles }} />
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
