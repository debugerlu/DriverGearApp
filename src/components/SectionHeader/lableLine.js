/**
 * Created by bear on 2018/2/5.
 */
import React, { PureComponent } from 'react'
import {
    View,
    Text
} from 'react-native'
import { lableLineStyle } from './style'
export default class lableLine extends PureComponent {
    render() {
        return (
            <View style={lableLineStyle.info} >
                <Text style={lableLineStyle.letter}>
                    <Text style={lableLineStyle.lineText}>
                        ——&nbsp;&nbsp;&nbsp;
                    </Text>
                    {this.props.lableText}
                    <Text style={lableLineStyle.lineText}>
                        &nbsp;&nbsp;&nbsp;——
                    </Text>
                </Text>
            </View>

        )
    }
}