
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Text } from 'react-native';
import {
    ScrollView,
    View
} from 'react-native';
import { indexStyles } from '../styleSheet/index'
/**
 * 车友圈
 */
export default class CarClub extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }


    render() {
        return (
            <View style={indexStyles.container}>
                <ScrollView >
                    <Text>维护中...</Text>
                </ScrollView>
            </View>

        );
    }
}


