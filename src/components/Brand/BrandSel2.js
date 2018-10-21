/**
 * Created by mymac on 2017/8/24.
 */
/**
 * Created by mymac on 2017/8/24.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    SectionList,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('window');

import cities from './city.json';
const statusHeight = 20;
const rowHeight = 44;
const separatorHeight = 1;
const headerHeight = 24;
const sesctionWidth = 20;
const sectionTopBottomHeight = 50;
const sectionItemHeight = (height - statusHeight - sectionTopBottomHeight * 2) / cities.length;

const touchDownBGColor = '#999999';
const touchUpBGColor = 'transparent';

export default class BrandSel2 extends Component {

    constructor(props){
        super(props);

        this.state={
            data: [],
            refreshing: false,
            isTouchDown: false,
        };

        this.renderItem = this.renderItem.bind(this);
        this.separatorComponent = this.separatorComponent.bind(this);
        this.listFooterComponent = this.listFooterComponent.bind(this);
        this.listHeaderComponent = this.listHeaderComponent.bind(this);

        this.sectionItemView = this.sectionItemView.bind(this);
        this.itemLayout = this.itemLayout.bind(this);

        this.responderGrant = this.responderGrant.bind(this);
        this.responderMove = this.responderMove.bind(this);
        this.responderRelease = this.responderRelease.bind(this);
        this.scrollSectionList = this.scrollSectionList.bind(this);
    }

    componentDidMount() {
        setTimeout(()=>{
            this.setState({
                data: cities,
            });

            // 数据结构示例
            // { key1: "A", data: [{ name: "阿童木" }, { name: "阿玛尼" }, { name: "爱多多" }] },

        }, 2000)
    }

    /*section header*/
    renderSectionHeader(info){
        return (
                <Text style={styles.sectionStyle}>
                    {info.section.key}
                </Text>

        )
    }

    /*row*/
    renderItem(info){
        /*
        * index   0
        * item   { name: "阿童木" }  要显示的值
        * section  当前section 的整个数据
        * */

        return (

            <Text style={styles.rowStyle}>
                {info.item.name}
            </Text>

        )
    }
    /*分割线*/
    separatorComponent(){
        return <View style={styles.separtorStyle}/>
    }

    /*底部组件*/
    listFooterComponent(){
        return this.state.data.length !== 0 ? <View>
                <Text style={styles.sectionHeaderFooterStyle}>我是底部组件</Text>
            </View> : null;
    }

    /*头部组件*/
    listHeaderComponent(){
        return this.state.data.length !== 0 ? <View>
                <Text style={styles.sectionHeaderFooterStyle}>我是头部组件</Text>
            </View> : null;
    }

    /*没有数据时显示的组件*/
    listEmptyComponent() {
        return (
            <View style={styles.noDataViewStyle}>
                <Text style={styles.noDataSubViewStyle}>
                    暂时没有数据,先等2秒
                </Text>
            </View>
        )
    }

    /*刷新*/
    refresh(){
        this.setState({
            refreshing: true,
        });
        setTimeout(()=>{
            this.setState({
                refreshing: false,
            });
        },2000);
    }

    /*用户手指开始触摸*/
    responderGrant(event){
        this.scrollSectionList(event);

        this.setState({
            isTouchDown: true,
        })
    }

    /*用户手指在屏幕上移动手指，没有停下也没有离开*/
    responderMove(event){
        this.scrollSectionList(event);

        this.setState({
            isTouchDown: true,
        })
    }

    /*用户手指离开屏幕*/
    responderRelease(event){
        this.setState({
            isTouchDown: false,
        })
    }

    /*手指滑动，触发事件*/
    scrollSectionList(event) {
        const touch = event.nativeEvent.touches[0];

        // 手指滑动范围 从 A-Q  范围从50 到 50 + sectionItemHeight * cities.length
        if (touch.pageY - statusHeight >= sectionTopBottomHeight && touch.pageY <= statusHeight + sectionTopBottomHeight + sectionItemHeight * cities.length) {

            //touch.pageY 从顶部开始，包括导航条 iOS 如此，如果是android 则具体判断
            const index = (touch.pageY - statusHeight - sectionTopBottomHeight) / sectionItemHeight;

            console.log(parseInt(index));

            // 默认跳转到 第 index 个section  的第 1 个 item
            this.refs.sectionList.scrollToLocation({animated: true, itemIndex: 0, sectionIndex: parseInt(index)});

        }
    }

    /*右侧索引*/
    sectionItemView(){

        const sectionItem = cities.map((item, index)=>{
            return <Text key={index}
                         style={
                             [styles.sectionItemStyle,
                             {backgroundColor: this.state.isTouchDown ? touchDownBGColor : touchUpBGColor}]
                         }
                >
                {item.key}
                </Text>
        });

        return(
            <View style={styles.sectionItemViewStyle}
                  ref="sectionItemView"
                  onStartShouldSetResponder={()=>true} // 在用户开始触摸的时候（手指刚刚接触屏幕的瞬间），是否愿意成为响应者？
                  onMoveShouldSetResponder={()=>true} // :如果View不是响应者，那么在每一个触摸点开始移动（没有停下也没有离开屏幕）时再询问一次：是否愿意响应触摸交互呢？
                  onResponderGrant={this.responderGrant} // View现在要开始响应触摸事件了。这也是需要做高亮的时候，使用户知道他到底点到了哪里
                  onResponderMove={this.responderMove} // 用户正在屏幕上移动手指时（没有停下也没有离开屏幕）
                  onResponderRelease={this.responderRelease} // 触摸操作结束时触发，比如"touchUp"（手指抬起离开屏幕）
            >
                {sectionItem}
            </View>
        );
    }

    /*每一项的高度(rowHeight)和其在父组件中的偏移量(offset)和位置(index)
    * length :  当前rowItem的高度
    * offset ： 当前rowItem在父组件中的偏移量（包括rowItem的高度 + 分割线的高度 + section的高度）
    * index  :  当前rowItem的位置
    *
    * 如果需要手动的跳转。则必须实现此方法
    * */
    itemLayout(data, index) {
        return {length: rowHeight, offset: (rowHeight + separatorHeight) * index + headerHeight, index};
    }

    // http://www.jianshu.com/p/09dd60d7b34f

    render() {

        return (
            <View style={{flex: 1, marginTop: statusHeight}}>

                <SectionList
                    ref="sectionList"
                    renderSectionHeader={this.renderSectionHeader} // sectionHeader
                    renderItem={this.renderItem} // rowItem
                    sections={this.state.data} // 数据源
                    // getItemLayout={this.itemLayout} // 在知道高度的情况下，得到每个item的位置 , 由于我改了源码，在源码中跳转指定了位置信息，此处不实现该方法
                    keyExtractor={(item, index)=> item.code} // 每个item都有唯一的key
                    ItemSeparatorComponent={this.separatorComponent} // 分割线
                    ListHeaderComponent={this.listHeaderComponent} // 头部组件
                    ListFooterComponent={this.listFooterComponent} // 尾部组件
                    ListEmptyComponent={this.listEmptyComponent()} // 没有数据时显示的组件
                    refreshing={this.state.refreshing} // 是否刷新 ，自带刷新控件
                    onRefresh={()=>{
                              this.refresh();
                          }} // 刷新方法,写了此方法，下拉才会出现  刷新控件，使用此方法必须写 refreshing
                    // horizontal={true}
                />

                {this.sectionItemView()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sectionStyle:{
        color: 'black',
        backgroundColor: '#f5f5f5',
        paddingLeft: 20,
        height: headerHeight,
        lineHeight: headerHeight,
    },
    rowStyle:{
        height: rowHeight,
        lineHeight: rowHeight,
        width: width,
        marginLeft: 30,
        color: 'black',
    },
    separtorStyle:{
        height: separatorHeight,
        backgroundColor: '#f5f5f5'
    },
    sectionHeaderFooterStyle:{
        alignItems: 'center',
        textAlign: 'center',
        height: sectionTopBottomHeight,
        backgroundColor: 'red',
        lineHeight: sectionTopBottomHeight,
    },
    noDataViewStyle:{
        backgroundColor: 'red',
        flex: 1,
        height: height
    },
    noDataSubViewStyle:{
        alignItems: 'center',
        textAlign: 'center',
        lineHeight: height,
        color: 'white'
    },
    sectionItemViewStyle:{
        position: 'absolute',
        width: sesctionWidth,
        height: height - statusHeight,
        right: 0,
        top: 0,
        paddingTop: sectionTopBottomHeight,
        paddingBottom: sectionTopBottomHeight,
    },
    sectionItemStyle:{
        textAlign: 'center',
        alignItems: 'center',
        height: sectionItemHeight,
        lineHeight: sectionItemHeight
    },

});
