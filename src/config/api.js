/**
 * Created by bear on 2017/12/26.
 */

export const serverUrl = {
  //dev: 'http://10.70.103.212:9090',
  //dev: 'http://127.0.0.1:9090/',
  dev: 'https://www.cheshoudang.com/cheshoudang-server/',
  pro: 'https://www.cheshoudang.com/cheshoudang-server/',
  qiniu: "http://pfyq9gia7.bkt.clouddn.com/"
};
export const ctsApi = {
  cts: 'api/users'
};
export const authApi = {
  authorize: 'api/users/authorize',
  register: 'api/users/register',
  modify: `api/users/${'userId'}/${'field'}`,
  profile: `api/users/profile/${'userId'}`
};

export const dynamicApi = {
  topics: 'api/topics',
  article: 'api/topics/<id>'
};

/**
 * 车辆数据接口
 */
export const carApi = {
  carList: 'app/car/list',
  carDetail: 'app/car/getCar',
  //品牌、车型(pPingpaiId)、车系(pChexinId)统一接口
  carBrandApi: 'app/configBrandEn/list/',
  
}

