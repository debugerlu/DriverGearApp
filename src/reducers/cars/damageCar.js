import { carTypes } from '../../config/constant';

const init = {
    carList: [],
    isLoading: true,
    isLoadingMore: false,
    hasMoreData: true
}
const damageCar = (state = init, action) => {
    switch (action.type) {
        case carTypes.REQUEST_DAMAGE_CAR_LIST:
            return { ...state, isLoading: true, isLoadingMore: false };
        case carTypes.RECEIVE_DAMAGE_CAR_LIST:
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
export default damageCar