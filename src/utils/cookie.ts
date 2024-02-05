import cookie from 'js-cookie';

export const getCookie = (key: string) => decodeURIComponent(cookie.get(key) || '');
export const setCookie = (key: string, value: any) => cookie.set(key, value);
export const removeCookie = (key: string) => cookie.remove(key);
