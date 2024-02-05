import { post } from '@/utils/request';

export const getSystemTime = <T>(data?: {}, params?: {}) => {
  return post<T>('/pro-api/app/public/get/time', data, params);
};
