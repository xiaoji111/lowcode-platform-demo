export const getSelectedNames = (obj: any) => {
  if (!obj) return '';
  let arr = [];
  if (obj.hasOwnProperty('provinceName') && obj.provinceName) {
    arr.push(obj.provinceName);
  }
  if (obj.hasOwnProperty('cityName') && obj.cityName) {
    arr.push(obj.cityName);
  }
  if (obj.hasOwnProperty('districtName') && obj.districtName) {
    arr.push(obj.districtName);
  }
  if (obj.hasOwnProperty('villageName') && obj.villageName) {
    arr.push(obj.villageName);
  }
  return arr.join('/');
};

export const getParameterByName = (name?: string, URL?: string) => {
  let url = URL || document.location.toString();
  let arrObj = url.split('?');
  let params = Object.create(null);
  if (arrObj.length > 1) {
    arrObj = arrObj[1].split('&');
    arrObj.forEach((item) => {
      const curTtem = item.split('=');
      params[curTtem[0]] = curTtem[1];
    });
  }
  if (name) {
    return params[name];
  }
  return params;
};

export const isSameObject = (obj1: {}, obj2: {}) => {
  return Object.entries(obj1).toString() === Object.entries(obj2).toString();
};

export const isAndroid = (): boolean => {
  return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1; // android终端
};

export const isIOS = (): boolean => {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
};

export const isApp = (): boolean => {
  return navigator.userAgent.indexOf('byb/') > -1;
};

export const isMobile = (): boolean => {
  let flag = true;
  /* 先判断ua */
  const uaFlag = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  /* 再判断设备宽度高度, 根据UI设计，暂时先设定宽度阈值是450 和 360， 高度是400 */
  const clientFlag =
    window.innerWidth <= 450 && window.innerWidth >= 360 && window.innerHeight > 400;

  return uaFlag && clientFlag;
};

export const getAppVersion = () => {
  let appVersion: string = '0';
  const reg = /akulaku\/[0-9a-z.-]+/;
  const m = navigator.userAgent.match(reg);
  console.log(`userAgent: ${navigator.userAgent}`);
  if (m) {
    let str = m[0].split('/')[1] || '';
    if (str) {
      if (str.indexOf('-common') !== -1) {
        str = str.replace('-common', '');
      }
      appVersion = str.replaceAll('.', '');
    }
  }
  return Number(appVersion);
};

export function supportUserMedia() {
  if (
    // @ts-ignore
    (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) ||
    // @ts-ignore
    navigator.getUserMedia ||
    // @ts-ignore
    navigator.webkitGetUserMedia ||
    // @ts-ignore
    navigator.mozGetUserMedia
  ) {
    return true;
  }
  return false;
}
// 格式化金额
export const priceSplit = (
  money: string | number,
  useDot?: boolean,
  dontRetain?: boolean
): string => {
  if (!money) return '0';

  let prices = '0';
  if (isNaN(Number(money))) {
    return money.toString();
  }
  if (money && money !== null) {
    prices = String(money);
    let left = prices.split('.')[0];
    let right = '';
    if (prices.split('.')[1]) {
      // eslint-disable-next-line prefer-destructuring
      right = prices.split('.')[1];
      if (!dontRetain) {
        right = right.padEnd(2, '0');
      }
    }
    // 先将 价格 按 三位 切割成数组
    const leftArray =
      left
        .split('')
        .reverse()
        .join('')
        .match(/\d{1,3}/g) || [];
    left = leftArray.join(',').split('').reverse().join('');
    if (useDot) {
      left = leftArray.join('.').split('').reverse().join('');
    }
    // right = right
    //   ? right.length >= 2
    //     ? '.' + right.substr(0, 2)
    //     : '.' + right + '0'
    //   : '.00'
    right = right ? `.${right.slice(0, 2)}` : '';
    prices = left + right;
  }
  return prices;
};
