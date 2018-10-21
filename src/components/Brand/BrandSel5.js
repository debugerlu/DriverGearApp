import React, { Component } from 'react';
import {
  View, Text, SectionList, PixelRatio,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback, Dimensions, FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  CachedImage,
  ImageCacheProvider
} from 'react-native-cached-image';
import * as carBrand from '../../actions/carBrand';
import { serverUrl } from '../../config/api';
import GestureRecognizer from 'react-native-swipe-gestures';
import colors from '../../config/color';
import {
  Toast
} from 'antd-mobile-rn'
const { width, height } = Dimensions.get('window');

const statusHeight = 20;
const sectionTopBottomHeight = 50;
const sectionItemHeight = (height - statusHeight - sectionTopBottomHeight) / 26;
const rowHeight = 50;
const separatorHeight = 10;
const headerHeight = 30
const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};
/**
 * 品牌选择组件
 */
@connect(
  state => {
    return { ...state.carBrand };
  },
  dispatch => bindActionCreators({ ...carBrand }, dispatch)
)
export default class BrandSel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      touchY: 0,
      touchInfo: "",
      index: 0,
      sectionData: [],
      sliderWidth: new Animated.Value(0)
    };
  }
  /*每一项的高度(rowHeight)和其在父组件中的偏移量(offset)和位置(index)
  * length :  当前rowItem的高度
  * offset ： 当前rowItem在父组件中的偏移量（包括rowItem的高度 + 分割线的高度 + section的高度）
  * index  :  当前rowItem的位置
  *
  * 如果需要手动的跳转。则必须实现此方法
  * */
  itemLayout = (data, index) => {
    return { length: rowHeight, offset: (rowHeight + separatorHeight) * index + headerHeight, index };
  }
  componentWillMount() {

    this.props.getCarBrandList();
  }
  componentDidMount() {
  }
  /*用户手指开始触摸*/
  responderGrant = (event) => {
    this.scrollSectionList(event);
    this.setState({ touchInfo: "用户手指开始触摸" })
    console.log("用户手指开始触摸")
  }

  /*用户手指在屏幕上移动手指，没有停下也没有离开*/
  responderMove = (event) => {
    this.scrollSectionList(event);
    this.setState({ touchInfo: "用户手指在屏幕上移动手指，没有停下也没有离开" })

  }

  /*用户手指离开屏幕*/
  responderRelease = (event) => {
    console.log("用户手指离开屏幕")
    this.setState({ touchInfo: "用户手指离开屏幕" })
  }

  /*手指滑动，触发事件*/
  scrollSectionList = (event) => {
    const touch = event.nativeEvent.touches[0];
    this.setState({ touchY: touch.pageY })

    //手指滑动范围 从 A-Z  范围从50 到 50 + sectionItemHeight * cities.length
    if (touch.pageY - statusHeight >= sectionTopBottomHeight && touch.pageY <= statusHeight + sectionTopBottomHeight + sectionItemHeight * 26) {

      //touch.pageY 从顶部开始，包括导航条 iOS 如此，如果是android 则具体判断
      const _index = (touch.pageY - statusHeight - sectionTopBottomHeight) / sectionItemHeight;

      this.setState({ index: parseInt(_index) })
      this.brandCtr.getScrollResponder().scrollTo({ y: touch.pageY+800 })
      // 默认跳转到 第 index 个section  的第 1 个 item
      //this.brandCtr.scrollToLocation({ animated: true, sectionIndex: _index, itemIndex: 0, viewOffset: headerHeight })
      //this.brandCtr.scrollToLocation({ animated: true, sectionIndex: _index, itemIndex: 0, viewOffset: headerHeight })

    }
  }
  showSlid = (hidden, brandId) => {
    Animated.timing(
      this.state.sliderWidth,
      {
        toValue: hidden ? 0 : (width / 2) + 80,
        duration: 300,
      }
    ).start(() => {
      if (!hidden) {
        this.props.getCarSeriesList({ pPinpaiId: brandId, a: Math.random() })
      }
    });

  }
  _renderSectionHeader = ({ section }) => (
    <View key={section.key}>
      <Text>{section.key}</Text>
    </View>
  )
  _renderItem = ({ item }) => (
    <TouchableWithoutFeedback key={item.ppinpaiId} onPress={() => { this.showSlid(false, item.ppinpaiId) }}>


      <View style={{
        flex: 1,
        height: rowHeight,
        alignItems: "center",
        flexDirection: "row"
      }}>
        <View style={{
          flex: 2,
          paddingLeft: 20,
          paddingRight: 10
        }}>
          <CachedImage source={{ uri: serverUrl.qiniu + "Brand/" + item.ppinpaiLogo }}
            style={{
              width: PixelRatio.getPixelSizeForLayoutSize(20),
              height: PixelRatio.getPixelSizeForLayoutSize(20),

            }} />
        </View>

        <View style={{
          flex: 10,
          paddingVertical: 10,
          borderBottomColor: "#ddd",
          borderBottomWidth: 1//(index === section.data.length - 1) ? 0 : (.5 / PixelRatio.get())
        }}>

          <Text style={{
            fontSize: 16,
            fontWeight: "100"
          }}>{item.ppinpai}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
  _onItemLayout = () => {

  }
  render() {
    return (

      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>
          {this.state.touchY}={this.state.index}
        </Text>
        <View
          onStartShouldSetResponder={() => true} // 在用户开始触摸的时候（手指刚刚接触屏幕的瞬间），是否愿意成为响应者？
          onMoveShouldSetResponder={() => true} // :如果View不是响应者，那么在每一个触摸点开始移动（没有停下也没有离开屏幕）时再询问一次：是否愿意响应触摸交互呢？
          onResponderGrant={this.responderGrant} // View现在要开始响应触摸事件了。这也是需要做高亮的时候，使用户知道他到底点到了哪里
          onResponderMove={this.responderMove} // 用户正在屏幕上移动手指时（没有停下也没有离开屏幕）
          onResponderRelease={this.responderRelease} // 触摸操作结束时触发，比如"touchUp"（手指抬起离开屏幕）
          style={{
            flex: 1,
            width: 20,
            position: "absolute",
            right: 0,
            alignItems: "center",
            zIndex: 999,
            paddingRight: 5,
            backgroundColor: "red"
          }}>
          {

            this.props.carBrandList.map((item, index) => {
              return <TouchableOpacity key={index} onPress={() => {
                this.brandCtr.getScrollResponder().scrollTo({ y: 0 })
              }}>
                <View style={{ width: 15, height: 15, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ fontSize: 10, fontWeight: "100", }}>{item.key}</Text>
                </View>
              </TouchableOpacity>
            })

          }
        </View>
        <SectionList
          legacyImplementation={true}
          enableEmptySections={true}
          keyExtractor={(item) => Math.random(10000)}
          sections={this.props.carBrandList}
          ref={(ref) => this.brandCtr = ref}
          showsVerticalScrollIndicator={false}
          renderSectionHeader={this._renderSectionHeader}
          renderItem={this._renderItem}
        />



        <Animated.View
          style={{
            width: this.state.sliderWidth,
            height: "100%",
            position: "absolute",
            right: 0,
            zIndex: 9999,
            borderLeftWidth: 1,
            borderLeftColor: "#eee",
            backgroundColor: "white"
          }}
        >
          <View
            onStartShouldSetResponder={() => true} // 在用户开始触摸的时候（手指刚刚接触屏幕的瞬间），是否愿意成为响应者？
            onMoveShouldSetResponder={() => true} // :如果View不是响应者，那么在每一个触摸点开始移动（没有停下也没有离开屏幕）时再询问一次：是否愿意响应触摸交互呢？
            onResponderGrant={this.responderGrant} // View现在要开始响应触摸事件了。这也是需要做高亮的时候，使用户知道他到底点到了哪里
            onResponderMove={this.responderMove} // 用户正在屏幕上移动手指时（没有停下也没有离开屏幕）
            onResponderRelease={this.responderRelease} // 触摸操作结束时触发，比如"touchUp"（手指抬起离开屏幕）
          >
            <FlatList
              keyExtractor={() => { Math.random(10000) }}
              data={this.props.carSeriesList}
              ItemSeparatorComponent={() => (<View style={{ height: (1 / PixelRatio.get()), backgroundColor: colors.Gray }}></View>)}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={() => this.props.onCarSeriesSel(item)}>
                  <View style={{ height: 30, justifyContent: "center" }}>
                    <Text style={{ fontWeight: "200" }}>{item.pchexi}</Text>
                  </View>
                </TouchableWithoutFeedback>

              )
              } />
          </View>

        </Animated.View>

      </View >
    );
  }
}
