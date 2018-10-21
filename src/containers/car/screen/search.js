/**
 * Created by bear on 2017/12/12.
 */
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Cancel from '../../../components/NavigationButton/cancel'
import { styles } from '../styleSheet/index'
import SearchBox from '../../../components/SearchBox';
@connect(
    state => {
        return { ...state }
    },
    dispatch => bindActionCreators({}, dispatch)
)
export default class Search extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft:<SearchBox editable={true} navigation={navigation} />,
            headerRight: <Cancel navigation={navigation} />,
            headerStyle: {
                paddingHorizontal: 10,
                backgroundColor: "white",
                borderBottomWidth: 0,
            }
        }

    };
    constructor(props, context) {
        super(props, context)
    }
    render() {

        return (
            <ScrollView style={styles.contentContainer}>
                <View>
                    <Text>搜索</Text>
                </View>
            </ScrollView>
        );
    }

}


