import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { getLanguageId } from '@/lang';

import { getCookie } from './cookie';
import { createSign } from './crypto';

export interface ResponseData<T> {
  errCode: number;
  success: boolean;
  data: T;
  errMsg: string;
}

const service = axios.create({
  timeout: 10000,
});

// 添加请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const type = config.url.includes('/openbanking-api') ? 'openbanking' : '';
    const langs = getLanguageId() || 'in';
    config.headers = {
      'Content-Type': 'application/json',
      uid: getCookie('uid'),
      'app-version': getCookie('app-version') || '50',
      'device-type': getCookie('device-type') || 'android',
      'Source-Channel': '3',
      accessToken: getCookie('webToken') || getCookie('accessToken'),
      semiAccessToken: getCookie('semiAccessToken'),
      adjustId: getCookie('google_ad_id') || getCookie('adjust_id'),
      languageId: langs === 'id' ? 'in' : langs,
      sign: createSign(config.data, type),
    };
    return config;
  },
  (err: AxiosError) => Promise.reject(err)
);

// 添加响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<ResponseData<any>>) => {
    if (!response.data) {
      return Promise.resolve(response);
    }
    return response;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

export async function request<T>(options: AxiosRequestConfig) {
  return await service.request<ResponseData<T | any>>(options).then((res) => res.data);
}

export async function get<T>(url: string, params = {}) {
  return request<T>({ method: 'GET', url, params });
}

export async function post<T>(url: string, data = {}, params = {}) {
  return request<T>({ method: 'POST', url, data, params });
}

export async function put<T>(url: string, data = {}, headers = {}) {
  return request<T>({ method: 'PUT', url, data, headers });
}
