import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as damageCar from '../../../../actions/cars/damageCar';
import { View, Text, FlatList, PixelRatio, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import color from '../../../../config/color';
import {
    CachedImage,
    ImageCacheProvider
} from 'react-native-cached-image';
const style = {
}
@connect(
    state => {
        return { ...state.damageCar };
    },
    dispatch => bindActionCreators({ ...damageCar }, dispatch)
)
export default class damageCarList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 1,
            pageSize: 10
        };
        this.onEndReachedCalledDuringMomentum = true;
    }
    componentDidMount() {
        this._handleRefrech();
    }
    _handleRefrech = () => {
        this.setState({
            pageNo: 1
        }, () => {
            this.props.getCarList({
                pageNo: this.state.pageNo,
                pageSize: this.state.pageSize,
                carType: 3,
                orderBy: 'a.update_date desc'
            }, 'refrech');
        })
    }
    _loadMore = () => {
        if (!this.onEndReachedCalledDuringMomentum) {
            this.setState({
                pageNo: ++this.state.pageNo
            }, () => {
                this.props.getCarList({
                    pageNo: this.state.pageNo,
                    pageSize: this.state.pageSize,
                    carType: 3,
                    orderBy: 'a.update_date desc'
                }, 'loadMore');
            })
        }
    }
    _renderFooter = () => {
        const { isLoadingMore } = this.props;
        if (isLoadingMore) {
            return (<View style={{ height: 50, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size="small" />
                <Text>车源加载中,请稍后...</Text>
            </View>)
        } else {
            return <View style={{
                height: 50, flexDirection: "row",
                alignItems: "center", justifyContent: "center"
            }}>
                <Text style={{ color: "#ccc" }}>-- 到底了 --</Text>
            </View>
        }
    }
    _goCarDetial = (id) => {
        this.props.navigation.navigate("carDetail", { carID: id });
    }
    render() {
        const { isLoading } = this.props;
        return (
            <ImageCacheProvider>
                <FlatList
                    data={this.props.carList}
                    keyExtractor={item => item.id}
                    ListFooterComponent={this._renderFooter}
                    refreshing={isLoading}
                    onRefresh={this._handleRefrech}
                    onEndReached={() => this._loadMore}
                    onEndReachedThreshold={0.1}
                    onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 1 / PixelRatio.get(), backgroundColor: "#ccc", marginHorizontal: 10 }} />
                    )}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback onPress={() => { this._goCarDetial(item.id) }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: "space-between",
                                marginVertical: 10,
                                marginHorizontal: 10,
                            }}>
                                <View style={{ flex: 4 }}>
                                    <CachedImage source={{
                                        uri: item.img + "120",
                                    }} style={{
                                        width: '96%',
                                        height: PixelRatio.getPixelSizeForLayoutSize(40),
                                        borderRadius: 3,
                                    }} />
                                </View>
                                <View style={{ flex: 6, justifyContent: "space-between" }}>
                                    <View style={{ flexWrap: "nowrap" }}>
                                        <Text style={{ fontSize: 15, fontWeight: "100" }}>{item.carName}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <View>
                                            <Text style={{ color: color.MainColor, fontSize: 17, fontWeight: "bold" }}>{item.peerPrice}万   </Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                                            <Text style={{ fontSize: 14, color: "gray", fontWeight: "100" }}>{item.productionDate}年</Text>
                                            <Text style={{ fontSize: 14, color: "gray", fontWeight: "100" }}> / </Text>
                                            <Text style={{ fontSize: 14, color: "gray", fontWeight: "100" }}>{item.mileageNum}万公里</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ fontSize: 13, color: "gray", fontWeight: "100" }}>新车价{item.newPrice}万</Text>
                                        <Text style={{ fontSize: 13, color: "gray", fontWeight: "100" }}> / </Text>
                                        <Text style={{ fontSize: 13, color: "gray", fontWeight: "100" }}>市场价{item.price}万</Text>

                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                />
            </ImageCacheProvider>
        );
    }
}
