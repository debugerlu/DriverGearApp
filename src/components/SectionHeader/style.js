/**
 * Created by bear on 2018/2/5.
 */
import { StyleSheet } from 'react-native'
import color from '../../config/color';
import { PixelRatio } from 'react-native'
export const styles = StyleSheet.create({
    info: {
        height: 40,
        backgroundColor: color.QianBg,
        borderBottomColor: "#ccc",
        borderBottomWidth: (.5 / PixelRatio.get()),
        justifyContent: 'center',
        borderLeftColor: color.MainColor,
        borderLeftWidth: 5,
    },
    letter: {
        lineHeight: 20,
        paddingLeft: 10,
        fontWeight: '500',
    }
})
export const lableLineStyle = StyleSheet.create({
    info: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    letter: {
        fontSize: 16,
        fontWeight: '500',
    },
    lineText:{
        color:color.Gray,
        fontSize:20,
        fontWeight:"100"
    }
})