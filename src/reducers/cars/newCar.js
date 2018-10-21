
import { carTypes } from '../../config/constant';

const init = {
    carList: [],
    isLoading: false,
    isLoadingMore: false,
    hasMoreData: true
}
const newCar = (state = init, action) => {
    switch (action.type) {
        case carTypes.REQUEST_NEW_CAR_LIST:
            if (action.status == "loadMore") {
                return { ...state, isLoadingMore: true };
            } else {
                return { ...state, isLoading: true };
            }
        case carTypes.RECEIVE_NEW_CAR_LIST:
            const dataSrouce = [];
            const hasMore = true;
            if (action.status == "loadMore") {
                if (action.data.length == 0) {
                    hasMore = false;
                }
                dataSrouce = state.carList.concat(action.data);
            }
            else {
                dataSrouce = action.data;
            }
            return { ...state, carList: dataSrouce, isLoading: false, isLoadingMore: false, hasMoreData: hasMore };
        default:
            return state
    }
}
export default newCar