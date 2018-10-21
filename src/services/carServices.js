/**
 * 车列表请求服务
 */
import axios from '../config/instance'
import {
    carApi
} from '../config/api'
import qs from 'qs';
/**
 * 车源数据
 */
export const fetchCarList = async (params) => {

    return await axios({
        'method': 'post',
        'url': carApi.carList,
        'data': qs.stringify({ ...params })
    })
}
/**
 * 车辆详情数据(ID)
 */
export const fetchCarDetail = async (ID) => {
    return await axios({
        'method': 'post',
        'url': carApi.carDetail,
        'data': qs.stringify({ a: new Date(), id: ID })
    })
}
/**
 * 品牌、车系、车型数据
 */
export const fetchCarBrandData = async (params) => {

    return await axios({
        'method': 'post',
        'url': carApi.carBrandApi,
        'data': qs.stringify({ ...params })
    })
}