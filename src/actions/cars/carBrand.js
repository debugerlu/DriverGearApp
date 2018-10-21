
import {
    carBrandTypes
} from '../../config/constant';
import * as fetches from '../../services/carServices'

const carBrandRequestList = () => ({
    type: carBrandTypes.REQUEST_CAR_BRAND_LIST
})

const carBrandReceiveList = (data) => ({
    type: carBrandTypes.RECEIVE_CAR_BRAND_LIST,
    data
})

const carSeriesRequestList = () => ({
    type: carBrandTypes.REQUEST_CAR_SERIES_LIST
})

const carSeriesReceiveList = (data) => ({
    type: carBrandTypes.RECEIVE_CAR_SERIES_LIST,
    data
})

const carModelRequestList = () => ({
    type: carBrandTypes.REQUEST_CAR_MODEL_LIST
})

const carModelReceiveList = (data) => ({
    type: carBrandTypes.RECEIVE_CAR_MODEL_LIST,
    data
})

/**品牌列表 */
export const getCarBrandList = (prama) => {

    return dispatch => {
        dispatch(carBrandRequestList())
        fetches.fetchCarBrandData(prama).then((res) => {

            if (res.data.success) {
                dispatch(carBrandReceiveList(res.data.obj))
            }
            else {
                alert(res.data.msg)
            }
        }).catch(error => {
            console.log(error)
        })
    }
}
/**车系列表 */
export const getCarSeriesList = (prama) => {

    return dispatch => {
        dispatch(carSeriesRequestList())
        fetches.fetchCarBrandData(prama).then((res) => {

            if (res.data.success) {
                dispatch(carSeriesReceiveList(res.data.obj))
            }
            else {
                alert(res.data.msg)
            }
        }).catch(error => {
            console.log(error)
        })
    }
}
/**车型列表 */
export const getCarModelList = (prama) => {

    return dispatch => {
        dispatch(carModelRequestList())
        fetches.fetchCarBrandData(prama).then((res) => {

            if (res.data.success) {
                dispatch(carModelReceiveList(res.data.obj))
            }
            else {
                alert(res.data.msg)
            }
        }).catch(error => {
            console.log(error)
        })
    }
}