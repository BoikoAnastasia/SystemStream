import { useEffect, useState } from 'react';

export const useDeviceDetect = () => {
  const getDeviceType = () => {
    const width = window.innerWidth;
    return {
      isMobile: width < 768,
      isLaptop: width >= 768 && width <= 1024,
    };
  };

  const [device, setDevice] = useState(getDeviceType);

  useEffect(() => {
    const handleResize = () => {
      setDevice(getDeviceType());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return device;
};
