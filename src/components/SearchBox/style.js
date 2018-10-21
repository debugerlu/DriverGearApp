/**
 * Created by bear on 2018/2/5.
 */
import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({

    searchInfo: {
        height: 30,
        flex: 1,
    },
    box: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#eee",
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 2
    },
    boxLeft: {
        width:300,
        flexDirection: 'row',
        backgroundColor: "#eee",
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 2,
        paddingLeft: 10
    },
    textInput: {
        flex:1,
        lineHeight: 30,
        color: 'rgb(189,189,189)',
        marginLeft: 8,
        fontSize: 14,
    },
    text: {
        textAlign: 'center',
        lineHeight: 30,
        color: 'rgb(189,189,189)',
        marginLeft: 8,
        fontSize: 14
    },
    searchIcon: {
        lineHeight: 30,
        color: 'rgb(189,189,189)',

    }
})
export default styles