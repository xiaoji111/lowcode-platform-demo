declare module '*.less';
declare module '@akulaku/app-bridge';
declare module '@akulaku/web-bridge';

declare interface Window {
  BYBInterface: any;
  webkit: any;
  BUILD_ENV: string;
}
