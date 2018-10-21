import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userDownLoadCar from '../../../../actions/cars/userDownLoadCar';
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
        return { ...state.userDownLoadCar };
    },
    dispatch => bindActionCreators({ ...userDownLoadCar }, dispatch)
)
export default class userDownLoadCarList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        this._handleRefrech();
    }
    _handleRefrech = () => {
        this.props.getCarList({
            pageNo: 1,
            pageSize: 20,
            orderBy: 'down desc'
        }, 'refrech');
    }
    _goCarDetial = (id) => {
        this.props.navigation.navigate("carDetail", { carID: id });
    }

    _renderFooter = () => {
        return null
    }
    render() {
        const { isLoading } = this.props;
        return (
            <ImageCacheProvider>
                <FlatList
                    scrollEnabled={false}
                    style={{ paddingBottom: 20 }}
                    data={this.props.carList}
                    keyExtractor={item => item.id}
                    ListFooterComponent={this._renderFooter}
                    refreshing={isLoading}
                    onRefresh={this._handleRefrech}

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
