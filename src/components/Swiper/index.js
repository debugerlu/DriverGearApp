//载入基础依赖库
import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import RNSwiper from "react-native-swiper";
import styles from './style';
import {
    CachedImage
} from 'react-native-cached-image';
// 创建组件 Swiper
export default class Swiper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loop: false,
            autoPlay: false,
            pagination: false,
            showButtons: false,
        }
    }
    componentWillMount() {
        this.setState({
            data: this.props.data,
            loop: this.props.loop,
            autoPlay: this.props.autoPlay,
            pagination: this.props.pagination,
            showButtons: this.props.showButtons,
        })

    }
    componentWillReceiveProps(newProps) {
        // if (this.state.data != newProps.data) {
        //     this.setState({
        //         data: newProps.data
        //     })
        // }
    }
    _renderPagination = (index, total, context) => {
        
        if (this.state.pagination) {
            return (
                <View style={styles.paginationStyle}>
                    <Text style={styles.paginationText}>
                        <Text style={styles.paginationText}>{index + 1}</Text>/{total}
                    </Text>
                </View>
            )
        } else {
            return null;
        }

    }
    render() {
        return (
            <View style={styles.container}>
                <RNSwiper
                    index={1}
                    scrollsToTop={true}
                    autoplay={this.state.autoPlay}
                    autoplayTimeout={3}
                    //autoplayDirection={true}
                    style={styles.wrapper}
                    showsButtons={this.state.showButtons}
                    renderPagination={this._renderPagination}
                    dotColor="green"
                    activeDotColor="red"
                >
                    {

                        this.state.data.map((item, index) => {

                            return <View key={index} style={styles.slide}>
                                <TouchableWithoutFeedback onPress={() => { this.props.onClick ? this.props.onClick(index) : () => { } }}>
                                    <Image resizeMode="cover" style={styles.image} source={{ uri: item.url }} />
                                </TouchableWithoutFeedback>
                            </View>
                        })


                    }
                </RNSwiper>
            </View>
        );
    }
}

