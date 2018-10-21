import React, { Component } from 'react';
import {
  View, Text, ScrollView, StyleSheet, ImageBackground,
  Dimensions, Modal, TouchableWithoutFeedback, Animated,
  Image
} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as carDetailAction from '../../../actions/cars/carDetail';
import { Toast } from 'antd-mobile-rn';
import ImageViewer from 'react-native-image-zoom-viewer';
import Swiper from '../../../components/Swiper';
import { serverUrl } from '../../../config/api';
import SectionHeader from '../../../components/SectionHeader';
import { Icon, Button } from 'native-base'
import colors from '../../../config/color'
import ArrowBack from '../../../components/NavigationButton'
import {
  CachedImage
} from 'react-native-cached-image';
const { width, height } = Dimensions.get('window');
const SWIPER_HEIGHT = 260;
@connect(
  state => {
    return { ...state.carDetailReducers }
  },
  dispatch => bindActionCreators({ ...carDetailAction }, dispatch)
)
/**
 * 车辆详情
 */
export default class carDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTransparent: true,
      headerLeft: <ArrowBack navigation={navigation} color={(!params ? 'white' : params.headerTextColorValue)} />,
      headerTintColor: 'red',
      headerTitleStyle: {
        fontSize: 16,
        alignSelf: "center",
        color: "black"
      },
      headerStyle: {
        height: 44,
        borderBottomWidth: 0,
        paddingHorizontal: 10,
        backgroundColor: (!params ? 'transparent' : params.headerBackGroundValue),
      },
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      showImageViwer: false,
      imageViwerIndex: 0
    };
  }
  componentWillMount() {
    const carID = this.props.navigation.state.params.carID;
    this.props.getCarDetail(carID);
    this.props.navigation.setParams({
      headerBackGroundValue: this.state.scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: ['transparent', 'white'],
        extrapolate: 'clamp'
      }),
      headerTextColorValue: this.state.scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: ['white', 'black'],
        extrapolate: 'clamp'
      }),
    });
  }
  componentDidMount() {
  }
  _showImageViwer(index) {
    this.setState({ showImageViwer: true, imageViwerIndex: index })
  }
  render() {
    const { carDetail, isLoadingDetail } = this.props;
    
    // const headerHight = this.state.scrollY.interpolate({
    //   inputRange: [-300, 0],
    //   outputRange: [500, SWIPER_HEIGHT],
    //   extrapolate: "clamp"
    // })
    return isLoadingDetail ? <View>{Toast.loading('请稍后..')}</View> : (
      <View style={{ flex: 1 }}>
        {Toast.hide()}

        <ScrollView style={styles.content}
          scrollEventThrottle={16} onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
          )}>
          <View style={{ height: SWIPER_HEIGHT }}>
            <ImageBackground source={{ uri: serverUrl.qiniu + "car/default/300x300.jpg" }} style={{ height: "100%" }}>
              <Swiper style={{ flex: 1, }} pagination={true} index={1} data={carDetail.appCarImages} onClick={(index) => { this._showImageViwer(index) }} />
            </ImageBackground>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.carInfo}>
              <View style={styles.carTitle}>
                <Text style={styles.carTitleText}>
                  {carDetail.carName}
                </Text>
              </View>
              <View style={styles.carPrice}>
                <View style={styles.carPriceTitle}>
                  <Text style={styles.textTitle}>
                    同行低价
                        <Text style={{ fontSize: 25 }}>{carDetail.peerPrice}</Text>
                    万
                        </Text>
                </View>
              </View>
            </View>
            <View style={styles.carDoc}>
              <SectionHeader section={{ leftTitle: '车辆档案' }} />
              <View style={styles.carDocInfo}>
                <View style={styles.carDocCell}>
                  <Text style={styles.carDocCellTextHead}>上牌日期</Text>
                  <Text style={styles.carDocCellTextTitle}>{carDetail.upDate}年</Text>
                </View>
                <View style={styles.carDocCell}>
                  <Text style={styles.carDocCellTextHead}>出厂日期</Text>
                  <Text style={styles.carDocCellTextTitle}>{carDetail.productionDate}年</Text>
                </View>
                <View style={styles.carDocCell}>
                  <Text style={styles.carDocCellTextHead} >排量</Text>
                  <Text style={styles.carDocCellTextTitle}>{carDetail.displacementNum}</Text>
                </View>
                <View style={styles.carDocCell}>
                  <Text style={styles.carDocCellTextHead}>里程km</Text>
                  <Text style={styles.carDocCellTextTitle}>{carDetail.mileageNum}万公里</Text>
                </View>
                <View style={styles.carDocCell}>
                  <Text style={styles.carDocCellTextHead}>排放标准</Text>
                  <Text style={styles.carDocCellTextTitle}>{carDetail.emissionStandard}</Text>
                </View>
                <View style={styles.carDocCell}>
                  <Text style={styles.carDocCellTextHead}>过户记录</Text>
                  <Text style={styles.carDocCellTextTitle}>{carDetail.transferTime === '0' ? '无' : carDetail.transferTime + '次'}</Text>
                </View>
              </View>
              <SectionHeader section={{ leftTitle: '主要参数' }} />
              <View style={styles.carDocInfo}>
                <View style={styles.carDocCell}>
                  <Text style={styles.carDocCellTextHead}>车辆类型</Text>
                  <Text style={styles.carDocCellTextTitle}>{carDetail.carTypeName}</Text>
                </View>
                <View style={styles.carDocCell}>
                  <Text style={styles.carDocCellTextHead}>品牌</Text>
                  <Text style={styles.carDocCellTextTitle}>{carDetail.brand}</Text>
                </View>
                <View style={styles.carDocCell}>
                  <Text style={styles.carDocCellTextHead} >车型</Text>
                  <Text style={styles.carDocCellTextTitle}>{carDetail.carModel}</Text>
                </View>
                <View style={styles.carDocCell}>
                  <Text style={styles.carDocCellTextHead}>车龄</Text>
                  <Text style={styles.carDocCellTextTitle}>{carDetail.carAgeName}</Text>
                </View>
                <View style={styles.carDocCell}>
                  <Text style={styles.carDocCellTextHead}>燃料类型</Text>
                  <Text style={styles.carDocCellTextTitle}>{carDetail.fuelType}</Text>
                </View>
                <View style={styles.carDocCell}>
                  <Text style={styles.carDocCellTextHead}>变速箱</Text>
                  <Text style={styles.carDocCellTextTitle}>{carDetail.gearbox}</Text>
                </View>
                <View style={styles.carDocCell}>
                  <Text style={styles.carDocCellTextHead}>座位数</Text>
                  <Text style={styles.carDocCellTextTitle}>{carDetail.seats}</Text>
                </View>
              </View>
              <SectionHeader section={{ leftTitle: '车辆详情' }} />
              <View style={styles.carContentImage}>
                {
                  carDetail.appCarImages.map((item, index) => {
                    return <TouchableWithoutFeedback key={index} style={{ width: width }} onPress={() => { this._showImageViwer(index) }}>
                      <Image source={{ uri: item.url }} style={styles.imageItem} />
                    </TouchableWithoutFeedback>
                  })
                }

              </View>
            </View>



            <Modal visible={this.state.showImageViwer} transparent={true}>
              <TouchableWithoutFeedback onPress={() => { this.setState({ showImageViwer: false }) }}>
                <View style={{ position: "absolute", zIndex: 9999, left: 10, top: 50 }}>
                  <Icon name='ios-close' style={{ color: "white", fontSize: 37 }} />
                </View>
              </TouchableWithoutFeedback>
              <ImageViewer
                index={this.state.imageViwerIndex}
                enableSwipeDown={true}
                onCancel={() => {
                  this.setState({ showImageViwer: false })
                }}
                imageUrls={carDetail.appCarImages.map(item => {
                  item.url + "800";
                  return item;
                })}
                failImageSource={{ uri: serverUrl.qiniu + "car/default/300x300.jpg" }} />
            </Modal>
          </View >
        </ScrollView>
        <View style={styles.fixedBottom}>
          <View style={{ flex: 1 }}>
            <Button full style={{ backgroundColor: colors.MainColorQian }}><Text style={{ color: "white" }}>关注</Text></Button>
          </View>
          <View style={{ flex: 1 }}>
            <Button full style={{ backgroundColor: colors.MainColor }}><Text style={{ color: "white" }}>联系卖家</Text></Button>
          </View>
        </View>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  thumbWallpaper: {
    height: "100%",
  },
  carTitle: {
    paddingVertical: 15,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  carTitleText: {
    fontSize: 18,
    fontWeight: "500",
  },
  carPrice: {
    flexDirection: "row",
    paddingLeft: 15,
  },
  textTitle: {
    color: colors.MainColor,
  },
  carInfo: {
    flex: 1,
    height: 100,
  },
  carDocInfo: {
    flexDirection: 'row',
    flexWrap: "wrap"
  },
  carDoc: {
    flex: 1
  },
  carDocCell: {
    width: (width / 3),
    height: 60,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: 'center'
  },
  carDocCellTextHead: {
    fontSize: 14,
    color: "gray"
  },
  carDocCellTextTitle: {
    fontSize: 18,
    fontWeight: '200',
  },
  carContentImage: {
    alignItems: 'center',
  },
  imageItem: {
    width: (width - 20),
    height: 200,
    marginVertical: 10,
    //marginHorizontal: 10,
  },
  fixedBottom: {
    width: "100%",
    flexDirection: "row",
    height: 40,
    position: "absolute",
    zIndex: 999,
    bottom: 0,
    backgroundColor: "#fff"
  }
})
