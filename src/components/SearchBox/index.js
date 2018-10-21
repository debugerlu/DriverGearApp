/**
 * Created by bear on 2018/2/5.
 */
import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput
} from 'react-native'
import styles from './style'
import Icon from 'react-native-vector-icons/Ionicons'

export default class SearchBox extends Component {
    constructor(props) {
        super(props)
    }
    search = () => {
        this.props.navigation.navigate('search')
    }
    render() {
        return (
            this.props.editable ?
                <View style={styles.boxLeft} >
                    <Icon name='ios-search-outline' size={16} style={styles.searchIcon} />
                    <TextInput autoFocus={true} style={styles.textInput} placeholder="搜索" />
                </View> :
                <TouchableOpacity activeOpacity={1} style={styles.searchInfo} onPress={() => this.search()}>
                    <View style={styles.box} >
                        <Icon name='ios-search-outline' size={16} style={styles.searchIcon} />
                        <Text style={styles.text}>搜索</Text>
                    </View>
                </TouchableOpacity>

        )
    }
}