export const getRtmpServerUrl = (): string => {
  if (process.env.REACT_APP_RTMP_URL) {
    return process.env.REACT_APP_RTMP_URL;
  }

  const apiLocal = process.env.REACT_APP_API_LOCAL;
  if (apiLocal) {
    try {
      const host = new URL(apiLocal).hostname;
      return `rtmp://${host}/live`;
    } catch {
      // fall through
    }
  }

  if (typeof window !== 'undefined') {
    return `rtmp://${window.location.hostname}/live`;
  }

  return 'rtmp://localhost/live';
};
