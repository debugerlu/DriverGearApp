
import { carTypes } from '../../config/constant';

const init = {
    carList: [],
    isLoading: true,
    isLoadingMore: false,
    hasMoreData: true
}
const oldCar = (state = init, action) => {
    switch (action.type) {
        case carTypes.REQUEST_OLD_CAR_LIST:
            return { ...state, isLoading: true, isLoadingMore: true };
        case carTypes.RECEIVE_OLD_CAR_LIST:
            const dataSrouce = [];
            if (action.status == "loadMore")
                dataSrouce = state.carList.concat(action.data);
            else
                dataSrouce = action.data;
            return { ...state, carList: dataSrouce, isLoading: false, isLoadingMore: false };

        case carTypes.REQUEST_CAR_DETAIL:
            return { ...state, isLoadingDetail: true }
        case carTypes.RECEIVE_CAR_DETAIL:
            action.data.appCarImages.map((item) => {
                item.url = item.url + "400";
                return item;
            })
            return { ...state, carDetail: action.data, isLoadingDetail: false }
        default:
            return state
    }
}
export default oldCar