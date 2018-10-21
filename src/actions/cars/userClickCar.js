/**
 * Created by bear on 2017/7/23.
 */
import {
    carTypes
} from '../../config/constant';
import * as fetches from '../../services/carServices'

const carRequestList = () => ({
    type: carTypes.REQUEST_USER_CLICK_CAR_LIST
})

const carReceiveList = (data, status) => ({
    type: carTypes.RECEIVE_USER_CLICK_CAR_LIST,
    data,
    status
})
/**
 * 车辆列表Action
 * @param {*} prama 
 */
export const getCarList = (prama, status = "refrech") => {
    return dispatch => {
        dispatch(carRequestList())
        fetches.fetchCarList(prama).then((res) => {
            if (res.data.success) {
                dispatch(carReceiveList(res.data.obj, status))
            }
            else {
                alert(res.data.msg)
            }
        }).catch(error => {
            console.log(error)
        })
    }
}