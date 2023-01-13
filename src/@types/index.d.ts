import { AxiosRequestConfig } from 'axios';

export type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => void) => void;

export type ApiConfig = AxiosRequestConfig & {
  urlParams?: any;
};
