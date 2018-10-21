import React, { Component } from 'react';
import {
  Text, View, PixelRatio, Animated, TouchableWithoutFeedback,
  Image, Dimensions, FlatList, StyleSheet, Platform, SectionList, ActivityIndicator, Easing
} from "react-native";
import { LargeList, NativeLargeList } from "react-native-largelist-v2";
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as carBrand from '../../actions/cars/carBrand';
import { serverUrl } from '../../config/api';
import GestureRecognizer from 'react-native-swipe-gestures';
import colors from '../../config/color';
const { width, height } = Dimensions.get('window');
const statusHeight = 20;
const sectionTopBottomHeight = 50;
const sectionItemHeight = (height - statusHeight - sectionTopBottomHeight) / 26;
const rowHeight = 50;
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

class BrandSel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sliderSeriesWidth: new Animated.Value(0),
      sliderModelWidth: new Animated.Value(0),
      touchY: 0,
      index: 0
    }
  }
  componentWillMount() {
    if (this.props.carBrandList[0].items.length === 0) {
      this.props.getCarBrandList();
    }

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

  }

  /*用户手指离开屏幕*/
  responderRelease = (event) => {
    console.log("用户手指离开屏幕")
  }

  /*手指滑动，触发事件*/
  scrollSectionList = (event) => {
    const touch = event.nativeEvent.touches[0];

    //手指滑动范围 从 A-Z  范围从50 到 50 + sectionItemHeight * cities.length
    let _index = parseInt((touch.pageY - statusHeight - sectionTopBottomHeight) / sectionItemHeight) - 4
    if (_index <= 0) {
      _index = 0
    }
    if (_index >= 26) {
      _index = 26
    }
    // 默认跳转到 第 index 个section  的第 1 个 item
    //this.brandCtr.scrollToLocation({ animated: true, sectionIndex: _index, itemIndex: 0, viewOffset: headerHeight })
    //this.brandCtr.scrollToLocation({ animated: true, sectionIndex: _index, itemIndex: 0, viewOffset: headerHeight })
    this.brandCtr.scrollToIndexPath({ section: _index }, false)
  }
  _scrollToSection = (index) => {
    this.brandCtr.scrollToIndexPath({ section: (index - 1) }, false)
  }
  /**
   * 渲染列表头
   */
  _renderSection = (section) => {
    return (
      <View style={{
        flex: 1,
        backgroundColor: "#eee",
        justifyContent: "center",
        paddingLeft: 20
      }}>
        <Text>
          {this.props.carBrandList[section].title}
        </Text>
      </View>
    );
  };
  /**
   * 展开车系
   */
  showSlidSeries = (hidden, brandId) => {
    Animated.timing(
      this.state.sliderSeriesWidth,
      {
        toValue: hidden ? 0 : (width / 2) + 100,
        duration: 10,
      }
    ).start();
    if (!hidden) {
      this.props.getCarSeriesList({ pPinpaiId: brandId, a: Math.random() })
    }

  }
  /**
   * 展开车型
   */
  showSlidModel = (hidden, seriesId) => {
    Animated.timing(
      this.state.sliderModelWidth,
      {
        toValue: hidden ? 0 : (width / 2) + 50,
        duration: 10,
      }
    ).start();
    if (!hidden) {
      this.props.getCarModelList({ pChexiId: seriesId, a: Math.random() })
    }

  }
  /**
   * 渲染列表项
   */
  _renderIndexPath = ({ section: section, row: row }) => {

    const item = this.props.carBrandList[section].items[row];
    const itemTotal = this.props.carBrandList[section].items.length - 1;

    return (
      <TouchableWithoutFeedback onPress={() => { this.showSlidSeries(false, item.ppinpaiId) }}>
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
            <Image source={{ uri: serverUrl.qiniu + "Brand/" + item.ppinpaiLogo }}

              style={{
                width: PixelRatio.getPixelSizeForLayoutSize(20),
                height: PixelRatio.getPixelSizeForLayoutSize(20),

              }} />
          </View>

          <View style={{
            flex: 10,
            paddingVertical: 10,
            borderBottomColor: "#ddd",
            borderBottomWidth: row === itemTotal ? 0 : (.5 / PixelRatio.get())
          }}>

            <Text style={{
              fontSize: 16,
              fontWeight: "100"
            }}>{item.ppinpai}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        {/**品牌索引开始 */}
        <View
          onStartShouldSetResponder={() => true} // 在用户开始触摸的时候（手指刚刚接触屏幕的瞬间），是否愿意成为响应者？
          onMoveShouldSetResponder={() => true} // :如果View不是响应者，那么在每一个触摸点开始移动（没有停下也没有离开屏幕）时再询问一次：是否愿意响应触摸交互呢？
          onResponderGrant={this.responderGrant} // View现在要开始响应触摸事件了。这也是需要做高亮的时候，使用户知道他到底点到了哪里
          onResponderMove={this.responderMove} // 用户正在屏幕上移动手指时（没有停下也没有离开屏幕）
          onResponderRelease={this.responderRelease} // 触摸操作结束时触发，比如"touchUp"（手指抬起离开屏幕）
          style={{
            flex: 1,
            width: 30,
            position: "absolute",
            right: 0,
            alignItems: "center",
            zIndex: 9997,
            paddingRight: 5,
            backgroundColor: "transparent"
          }}>
          {

            this.props.carBrandList.map((item, index) => {
              return <TouchableWithoutFeedback key={index} onPress={() => this._scrollToSection(index)}>
                <View style={{ width: 16, height: 16, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ fontSize: 12, fontWeight: "100", }}>{item.title}</Text>
                </View>
              </TouchableWithoutFeedback>
            })

          }
        </View>
        {/**品牌索引结束 */}
        {/* 品牌列表开始 */}
        <LargeList
          onScroll={() => {
            this.showSlidSeries(true, 0)
            this.showSlidModel(true, 0)
          }}
          ref={ref => this.brandCtr = ref}
          style={{ flex: 1, backgroundColor: "white" }}
          data={this.props.carBrandList}
          heightForSection={() => 30}
          renderSection={this._renderSection}
          heightForIndexPath={() => 50}
          renderIndexPath={this._renderIndexPath}
        />
        {/* 品牌列表结束 */}
        {/* 车系侧滑开始 */}
        <Animated.View
          style={[{
            width: this.state.sliderSeriesWidth,
            height: "100%",
            position: "absolute",
            right: 0,
            zIndex: 9998,
            borderLeftWidth: 1,
            borderLeftColor: "#eee",
            backgroundColor: "white",
          }, style.elevationLow]}
        >
          {
            this.props.isLoadingSeries ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color={colors.MainColor} />
            </View> :
              <View style={{ flex: 1 }}>
                <SectionList
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index, section }) => (
                    <View style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: 20,
                    }}>
                      <View>
                        <TouchableWithoutFeedback onPress={() => this.props.onCarSeriesSel(item)}>
                          <View style={{ height: 50, justifyContent: "center" }}>
                            <Text style={{ fontWeight: "200" }}>{item.pchexi}</Text>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                      <View>
                        <TouchableWithoutFeedback onPress={() => this.showSlidModel(false, item.pchexiId)}>
                          <View style={{ height: 50, justifyContent: "center" }}>
                            <Text style={{ fontWeight: "200" }}>选车型</Text>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>

                    </View>
                  )}
                  ItemSeparatorComponent={() => (<View style={{ height: (1 / PixelRatio.get()), backgroundColor: "#eee" }}></View>)}
                  renderSectionHeader={({ section: { title } }) => (
                    <View style={{ height: 30, backgroundColor: "#eee", justifyContent: "center", paddingHorizontal: 20 }}>
                      <Text>{title}</Text>
                    </View>
                  )}
                  sections={this.props.carSeriesList}
                  keyExtractor={(item, index) => item + index}
                />
              </View>
          }
        </Animated.View>
        {/* 车系侧滑结束 */}
        {/* 车型侧滑开始 */}
        <Animated.View
          style={[{
            width: this.state.sliderModelWidth,
            height: "100%",
            position: "absolute",
            right: 0,
            zIndex: 9999,
            borderLeftWidth: 1,
            borderLeftColor: "#eee",
            backgroundColor: "white",
          }, style.elevationLow]}
        >
          {
            this.props.isLoadingModel ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color={colors.MainColor} />
            </View> :
              <View style={{ flex: 1 }}>
                <SectionList
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index, section }) => (
                    <TouchableWithoutFeedback onPress={() => this.props.onCarSeriesSel(item)}>
                      <View style={{ height: 50, justifyContent: "center", paddingHorizontal: 20 }}>
                        <Text style={{ fontWeight: "500" }}>{item.pchexingmingcheng}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                  ItemSeparatorComponent={() => (<View style={{ height: (1 / PixelRatio.get()), backgroundColor: "#eee" }}></View>)}
                  renderSectionHeader={({ section: { title } }) => (
                    <View style={{ height: 30, backgroundColor: "#eee", justifyContent: "center", paddingHorizontal: 20 }}>
                      <Text>{title}</Text>
                    </View>
                  )}
                  sections={this.props.carModelList}
                  keyExtractor={(item, index) => item + index}
                />
              </View>
          }
        </Animated.View>
        {/* 车型侧滑结束 */}

      </View>

    );
  }

}
const style = StyleSheet.create({
  elevationLow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
})
export default BrandSelBest = gestureHandlerRootHOC(BrandSel);