import { useEffect, useState } from 'react';
import { resolveMediaUrl } from '../utils/resolveMediaUrl';

export const useCheckedImage = (path: string, fallback = '') => {
  const [src, setSrc] = useState<string>(fallback);

  useEffect(() => {
    const resolvedPath = resolveMediaUrl(path);
    const resolvedFallback = resolveMediaUrl(fallback) || fallback;

    if (!resolvedPath) {
      setSrc(resolvedFallback);
      return;
    }

    const img = new Image();
    img.src = resolvedPath;
    img.onload = () => setSrc(resolvedPath);
    img.onerror = () => setSrc(resolvedFallback);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [path, fallback]);

  return src;
};
