import { useEffect, useState } from 'react';

export const useCheckedImage = (path: string, fallback = './img/defaultImg/defaultPreview.jpg') => {
  const [src, setSrc] = useState<string>(fallback);
  useEffect(() => {
    if (!path) {
      setSrc(fallback);
      return;
    }

    const img = new Image();
    img.src = path;
    img.onload = () => setSrc(path);
    img.onerror = () => setSrc(fallback);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [path, fallback]);
  return src;
};
