/**
 * Created by bear on 2017/12/12.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, ScrollView, Animated } from 'react-native';
import MessageItem from '../../../components/MessageItem';
import Swiper from '../../../components/Swiper';
import CarTabs from '../../car/screen/carTabs';
import BusinessModule from './businessModule';
import CarServices from './carServices';
import SearchBox from '../../../components/SearchBox';
@connect(
    state => {
        return { ...state };
    },
    dispatch => bindActionCreators({}, dispatch)
)

export default class Home extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            headerTransparent: true,
            headerTitle: <SearchBox editable={false} navigation={navigation} />,
            headerLeft: <Animated.Text style={{ color: (!params ? 'white' : params.textColorValue) }}>呼和浩特</Animated.Text>,
            headerRight: <Animated.Text style={{ color: (!params ? 'white' : params.textColorValue) }}>客服</Animated.Text>,
            headerStyle: {
                paddingHorizontal: 10,
                backgroundColor: (!params ? 'transparent' : params.animatedValue),
                borderBottomWidth: 0,
            }
        }

    };
    constructor(props, context) {
        super(props, context);
        this._animatedValue = new Animated.Value(0);
        this.state = {
            scrollEnabled: true,
            swipeOutDisable: false,
            modalVisible: false,
            carTabs: []
        };
    }

    componentWillMount() {
        this.props.navigation.setParams({
            animatedValue: this._animatedValue.interpolate({
                inputRange: [0, 100],
                outputRange: ['transparent', 'white'],
                extrapolate: 'clamp'
            }),
            textColorValue: this._animatedValue.interpolate({
                inputRange: [0, 50],
                outputRange: ['white', 'black'],
                extrapolate: 'clamp'
            }),
        });
    }
    componentDidMount() {

    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    };

    _itemOnPress = row => {
        const { navigation } = this.props;
        navigation.navigate('chat', { profile: row.item.ext });
    };
    _renderItemComponent = row => {
        return (
            <MessageItem
                row={row}
                onPress={this._itemOnPress}
                swipeScrollEvent={this._swipeScrollEvent}
                swipeOutDisable={this.state.swipeOutDisable}
            />
        );
    };
    _swipeScrollEvent = scrollEnabled => {
        this.setState({ scrollEnabled: scrollEnabled });
    };
    render() {
        const headerHight = this._animatedValue.interpolate({
            inputRange: [0, 100,],
            outputRange: [200, 20],
            extrapolate: "clamp"
        })
        const { navigation } = this.props;
        return (
            <View style={{ backgroundColor: "white", }}>

                <ScrollView scrollEventThrottle={16} onScroll={Animated.event(
                    [
                        {
                            nativeEvent: { contentOffset: { y: this._animatedValue } },
                        },

                    ]
                )}
                >

                    {/* 顶部轮播图 */}
                    <Animated.View style={{ height: headerHight }}>
                        <Swiper style={{ flex: 1 }} autoPlay={true} loop={true}
                            data={[
                                { title: "Banner1", url: "http://pic181.nipic.com/file/20180915/12626208_135426253000_2.jpg" },
                                { title: "Banner1", url: "http://img.hb.aicdn.com/bb3fa3e2ae87e09b9bff2e1572c817a0b53de4c9cc6c-gExsjf_fw658" },
                                { title: "Banner1", url: "http://img.hb.aicdn.com/b4d274494c0592aecb31142587ddfe0073009e26d0ce-hhULqJ_fw658" },
                            ]} />
                    </Animated.View>
                    {/* 九宫格业务模块 */}
                    <BusinessModule />

                    <CarServices />
                    {/* 车型分类 */}

                    {/* 车源列表 */}
                    <View>
                        <CarTabs navigation={navigation} />
                    </View>


                </ScrollView>
            </View>


        );
    }
}

