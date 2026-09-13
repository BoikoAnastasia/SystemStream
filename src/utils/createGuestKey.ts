import { getCookie } from './cookieFunctions';
import { hasAuthSession } from '../api/authSession';

export const createGuestKey = () => {
  // Authenticated viewers use HttpOnly cookie JWT — never reuse a JWT as guest id.
  if (hasAuthSession() || getCookie('sp_auth') === '1') {
    // Stable per-browser id still useful for JoinStream viewer key when logged in.
    let viewerId = localStorage.getItem('viewerSessionId');
    if (!viewerId) {
      viewerId = crypto.randomUUID();
      localStorage.setItem('viewerSessionId', viewerId);
    }
    return viewerId;
  }

  let guestId = localStorage.getItem('viewerSessionId');
  if (!guestId) {
    guestId = crypto.randomUUID();
    localStorage.setItem('viewerSessionId', guestId);
  }

  return guestId;
};
