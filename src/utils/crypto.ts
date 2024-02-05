import md5 from 'md5';

const buildEnvironment = window.BUILD_ENV;

const getSignKey = (type: string) => {
  if (type === 'openbanking') {
    switch (buildEnvironment) {
      case 'dev':
      case 'local':
      case 'sit':
        return 'NTVmZDkwY2YwNWY3YWFhNGJhYzM2NjAyODQxMjI4NmEzZWM0MDc4Mw==1';
      case 'perf':
      case 'test':
      case 'pre':
      case 'prod':
      case 'production':
      default:
        return 'NTVmZDkwY2YwNWY3YWFhNGJhYzM2NjAyODQxMjI4NmEzZWM0MDc4Stw=1';
    }
  } else {
    return 'NTVmZDkwY2YwNWY3YWFhNGJhYzM2NjAyODQxMjI4NmEzZWM0MDc4Mw==';
  }

  //return signKey;
};

const objKeySort = (arys: { [x: string]: any }) => {
  const newkey = Object.keys(arys).sort();
  let newObj: any = {}; // 创建一个新的对象，用于存放排好序的键值对
  for (let i = 0; i < newkey.length; i++) {
    newObj[newkey[i]] = arys[newkey[i]];
  }
  return newObj;
};
const unfold_arr = (arr: string[] | (string & any[])) => {
  let s = '';
  arr.forEach((item: string) => {
    if (Array.isArray(item)) {
      s = s + unfold_arr(item) + ',';
    } else if (Object.prototype.toString.call(item) === '[object Object]') {
      s = s + unfold_ob(item) + ',';
    } else {
      s = s + item + ',';
    }
  });
  return s.slice(0, -1);
};
const unfold_ob = (options: any) => {
  if (options === undefined) return '';
  const option = objKeySort(options);
  let str = '';
  for (const key in option) {
    // 数组展开
    if (Array.isArray(option[key])) {
      str = str + key + ':' + unfold_arr(option[key]) + '|';
    } else if (Object.prototype.toString.call(option[key]) === '[object Object]') {
      str = str + key + ':' + unfold_ob(option[key]) + '|';
    } else if (typeof option[key] !== 'function') {
      str = str + key + ':' + option[key] + '|';
    }
  }
  return str.slice(0, -1);
};

export const createMD5 = (pwd: string, salt: string = '') => md5(pwd + salt).toString();

export const createSign = (data: any, type: string = '') => {
  const body = unfold_ob(data);
  const nonce = Math.floor(Math.random() * 9000) + 1000;
  const timestamp = Date.now();
  const signKey = getSignKey(type);
  const secure_str = (body ? body + '&' : '') + signKey + '&' + nonce + '&' + timestamp;
  let sign = createMD5(secure_str);
  sign = sign.slice(8, 24) + '|' + nonce + '|' + timestamp;
  return sign;
};
