/**
 * Created by bear on 2018/3/2.
 */
import { carBrandTypes } from '../../config/constant';
const _ = require('lodash');
const range = (start, stop) => {
    var result = [];
    for (var idx = start.charCodeAt(0), end = stop.charCodeAt(0); idx <= end; ++idx) {
        result.push(String.fromCharCode(idx));
    }
    return result;
};
const init = {
    carBrandList: range('A', 'Z').map((item) => {
        return { title: item, items: [] }
    }),
    carSeriesList: [],
    carModelList: [],
    isLoadingModel: false,
    isLoadingSeries: false,
    isLoading: false
}
const carBrand = (state = init, action) => {

    switch (action.type) {
        //品牌
        case carBrandTypes.REQUEST_CAR_BRAND_LIST:
            return { ...state, isLoading: true };
        case carBrandTypes.RECEIVE_CAR_BRAND_LIST:
            let parseBrand = state.carBrandList.map((item) => {
                //let filterRes = action.data.filter((obj) => obj.pshouzimu === item.key && obj.ppinpaiId != "0");
                let filterRes = action.data.filter((obj) => obj.pshouzimu === item.title && obj.ppinpaiId != "0");
                item.items = filterRes
                return item;
            })
            return { ...state, carBrandList: parseBrand, isLoading: false };
        //车系
        case carBrandTypes.REQUEST_CAR_SERIES_LIST:
            return { ...state, isLoadingSeries: true };
        case carBrandTypes.RECEIVE_CAR_SERIES_LIST:
            //厂商分组
            let groupSeriesData = _.mapValues(_.groupBy(action.data, "pchangshang"), x => x.map(y => _.omit(y, "pchangshang")));
            groupSeriesData = _.map(groupSeriesData, function (value, key) {
                return { title: key, data: value }
            });
            return { ...state, carSeriesList: groupSeriesData, isLoadingSeries: false };
        //车型   
        case carBrandTypes.REQUEST_CAR_MODEL_LIST:
            return { ...state, isLoadingModel: true };
        case carBrandTypes.RECEIVE_CAR_MODEL_LIST:
            let groupModelData = _.mapValues(_.groupBy(action.data, "pniankuan"), x => x.map(y => _.omit(y, "pniankuan")));

            //年份分组
            groupModelData = _.map(groupModelData, function (value, key) {
                console.log(key);
                // return key + value;
                return { title: key, data: value }
            }).reverse();
            return { ...state, carModelList: groupModelData, isLoadingModel: false };
        default:
            return state
    }
}

export default carBrand