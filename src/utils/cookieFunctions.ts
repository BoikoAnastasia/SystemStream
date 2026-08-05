import Cookies from 'js-cookie';

export const checkCookie = (nameCookie: string) => {
  return Cookies.get(nameCookie) ? true : false;
};

export const getCookie = (nameCookie: string) => {
  return Cookies.get(nameCookie);
};

export const setCookie = (name: string, value: string, days: number, path = '/') => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  const secure = window.location.protocol === 'https:' ? ';Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=${path};SameSite=Lax${secure}`;
};

export const removeCookie = (nameCookie: string) => {
  document.cookie = `${nameCookie}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;
  Cookies.remove(nameCookie, { path: '/' });
};
