/**
 * Created by bear on 2018/2/5.
 */
import { StyleSheet } from 'react-native'
import colors from '../../config/color'
const styles = StyleSheet.create({
    content: {
        backgroundColor: "white",
        height: 45,
        zIndex: 999,
    },
    row: {
        borderBottomWidth: .5,
        borderBottomColor: colors.Gray,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 998,
        backgroundColor:"white"
    },
    cell: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },
    cellTitleText: {
        fontSize: 13,
        fontWeight: '200',
        marginRight: 3
    }
})
export default styles