
import { carTypes } from '../../config/constant';

const init = {
    carList: [],
    isLoading: true,
    isLoadingMore: false,
    hasMoreData: true
}
const userDownLoadCar = (state = init, action) => {
    switch (action.type) {
        case carTypes.REQUEST_USER_DOWNLOAD_CAR_LIST:
            return { ...state, isLoading: true, isLoadingMore: true };
        case carTypes.RECEIVE_USER_DOWNLOAD_CAR_LIST:
            const dataSrouce = [];
            if (action.status == "loadMore")
                dataSrouce = state.carList.concat(action.data);
            else
                dataSrouce = action.data;
            return { ...state, carList: dataSrouce, isLoading: false, isLoadingMore: false };
        default:
            return state
    }
}
export default userDownLoadCar