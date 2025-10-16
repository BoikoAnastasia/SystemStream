import Cookies from 'js-cookie';

export const checkCookie = (nameCookie: string) => {
  return Cookies.get(nameCookie) ? true : false;
};

export const getCookie = (nameCookie: string) => {
  return Cookies.get(nameCookie);
};

export const setCookie = (nameCookie: string, cookieData: string, expires: number = 1, secure: boolean = true) => {
  Cookies.set(nameCookie, cookieData, { expires: expires, secure: secure });
  console.log(`${nameCookie} - cookie внесены`);
};

export const removeCookie = (nameCookie: string) => {
  if (checkCookie(nameCookie)) {
    Cookies.remove(nameCookie);
  } else {
    return console.log(`Не удалось удалить cookie ${nameCookie}`);
  }
};
