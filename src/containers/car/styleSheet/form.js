/**
 * Created by bear on 2017/6/28.
 */

import { StyleSheet, Dimensions, PixelRatio } from 'react-native'
const { width, height } = Dimensions.get('window')
import colors from '../../../config/color'
export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    section: {
        flex: 1,
        
    },
    row: {
        flexDirection: 'row',
        height: 45,
        justifyContent: 'center',
        marginHorizontal: 10,
        borderBottomWidth: (1 / PixelRatio.get()),
        borderBottomColor: "#ccc",
    },
    cellLeft: {
        flex: 2,
        justifyContent: 'center',
    },
    cellMiddle: {
        flex: 4,
        justifyContent: 'center',
    },
    cellRight: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: 'center',
    },
    rightText: {
        fontSize: 14,
        fontWeight: '200',
    },
    leftText: {
        fontSize: 14,
        fontWeight: '200',
    },
    carImage: {
        marginHorizontal: 10,
        paddingVertical: 20,
    },
    carImageSection: {
        flex: 1,
        justifyContent: 'space-around',
    },
    carImageMarkText: {
        fontSize: 14,
        fontWeight: '200',
    },
    imgThumb: {
        width: 80,
        height: 60,
        margin: 5,
        backgroundColor: colors.QianGray,
        justifyContent: "center",
        alignItems: 'center',
    },
    pickerHeader: {
        height: 40,
        backgroundColor: "#ddd",
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
    }
})