
import { carTypes } from '../../config/constant';

const init = {
    carDetail: {},
    isLoadingDetail: true
}
const carDetailReducers = (state = init, action) => {
    switch (action.type) {
        case carTypes.REQUEST_CAR_DETAIL:
            return { ...state, isLoadingDetail: true }
        case carTypes.RECEIVE_CAR_DETAIL:
            // action.data.appCarImages.map((item) => {
            //     item.url = item.url + "400";
            //     return item;
            // })
            return { ...state, carDetail: action.data, isLoadingDetail: false }
        default:
            return state
    }
}
export default carDetailReducers