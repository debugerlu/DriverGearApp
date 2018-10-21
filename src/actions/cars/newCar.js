/**
 * Created by bear on 2017/7/23.
 */
import {
    carTypes
} from '../../config/constant';
import * as fetches from '../../services/carServices'

const carRequestList = (status) => ({
    type: carTypes.REQUEST_NEW_CAR_LIST,
    status
})

const carReceiveList = (data, status) => ({
    type: carTypes.RECEIVE_NEW_CAR_LIST,
    data,
    status
})
/**
 * 新车车辆列表Action
 * @param {*} prama 
 */
export const getCarList = (prama, status = "refrech") => {
    return dispatch => {
        dispatch(carRequestList(status))
        fetches.fetchCarList(prama).then((res) => {
            if (res.data.success) {
                dispatch(carReceiveList(res.data.obj, status))
            }
            else {
                dispatch(carReceiveList([], status))
            }
        }).catch(error => {
            alert('请求失败:' + error.msg)
        })
    }
}