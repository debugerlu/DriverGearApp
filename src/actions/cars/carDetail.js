import { carTypes } from '../../config/constant';
import * as fetches from '../../services/carServices'
const carRequestDetail = () => ({
    type: carTypes.REQUEST_CAR_DETAIL
})
const carReceiveDetail = (data) => ({
    type: carTypes.RECEIVE_CAR_DETAIL,
    data
})
/**
 * 根据车辆ID获取车辆详情Action
 * @param {} ID 
 */
export const getCarDetail = (ID) => {
    return dispatch => {
        dispatch(carRequestDetail())
        fetches.fetchCarDetail(ID).then((res) => {
            if (res.data.success) {
                dispatch(carReceiveDetail(res.data.obj))
            }
            else {
                alert(res.data.msg)
            }
        }).catch(error => {
            console.log(error)
        })
    }
}