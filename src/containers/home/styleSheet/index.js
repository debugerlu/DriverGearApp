/**
 * Created by bear on 2018/2/5.
 */
import { StyleSheet, Dimensions } from 'react-native'
import colors from '../../../config/color';
const { width } = Dimensions.get("window")
const MAX_HEIGHT = 200
export const indexStyles = StyleSheet.create({
})
/**
 * 四大业务模块
 */
export const businessStyles = StyleSheet.create({

    grid: {
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 10,

    },
    gridCell: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    thumb: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    lableText: {
        fontSize: 13,
        fontWeight: '500',
    }

});
/**
 * 车商服务
 */
export const carServicesStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    sectionLable: {

    },
    grid: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    row: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 5,
        paddingBottom: 30,
        paddingHorizontal: 5
    },
    cell: {
        flex: 1,
        height: 60,
        flexDirection: "row",
        alignItems: 'center',
        marginHorizontal: 3,
        paddingHorizontal: 5,
        backgroundColor: colors.QianBg
    },
    cellLeft: {
        flex: 1,

    },
    cellRight: {
        flex: 1,
        alignItems: 'center',
    },
    lableText: {
        fontSize: 16
    },
    markText: {
        fontSize: 13,
        color: colors.Gray
    },
    thumb: {
        width: 50,
        height: 50,
    },
    lableText: {
        fontSize: 13,
        fontWeight: '500',
    }

});