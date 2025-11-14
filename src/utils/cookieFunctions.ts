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
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=${path}`;
};

export const removeCookie = (nameCookie: string) => {
  if (checkCookie(nameCookie)) {
    Cookies.remove(nameCookie);
  } else {
    return console.log(`Не удалось удалить cookie ${nameCookie}`);
  }
};
