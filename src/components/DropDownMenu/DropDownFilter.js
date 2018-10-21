import React, { Component } from 'react'
import { Text, View, TouchableWithoutFeedback, Animated, TouchableOpacity } from 'react-native'
import styles from './style';
import { Icon, Button } from 'native-base';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import colors from '../../config/color';
/**
 * 下拉筛选
 */
export default class DropDownFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDownSortTop: new Animated.Value(-500),
            dropDownPriceTop: new Animated.Value(-500),
            filterTabs: [
                { title: "智能排序", isOpenSort: true },
                { title: "品牌", navigate: "carBrandSel" },
                { title: "价格", isOpenPrice: true },
                { title: "筛选", navigate: "carBrandSelb" }
            ],
            sortItem: [
                { title: "智能排序", value: "" },
                { title: "最新上架", value: "" },
                { title: "价格最低", value: "" },
                { title: "价格最高", value: "" },
                { title: "车龄最短", value: "" },
                { title: "里程最少", value: "" },
            ],
            priceItem: [
                { title: "不限", value: "" },
                { title: "3万以下", value: "" },
                { title: "3-5万", value: "" },
                { title: "5-7万", value: "" },
                { title: "7-9万", value: "" },
                { title: "9-12万", value: "" },
                { title: "12-16万", value: "" },
                { title: "6-20万", value: "" },
                { title: "20万以上", value: "" },
            ],
            priceRange: [0, 50]
        }
    }
    componentDidMount() {
    }
    _dropDownShow = (item) => {
        if (item.isOpenSort) {
            this.setState({
                dropDownSort: !this.state.dropDownSort,
                dropDownPrice: false,
            }, () => {
                Animated.timing(
                    this.state.dropDownSortTop,
                    {
                        toValue: this.state.dropDownSort ? 46 : -500,
                        duration: 1
                    }
                ).start();
                Animated.timing(
                    this.state.dropDownPriceTop,
                    {
                        toValue: this.state.dropDownPrice ? 46 : -500,
                        duration: 1
                    }
                ).start();
            })
        }
        if (item.isOpenPrice) {
            this.setState({
                dropDownPrice: !this.state.dropDownPrice,
                dropDownSort: false
            }, () => {
                Animated.timing(
                    this.state.dropDownPriceTop,
                    {
                        toValue: this.state.dropDownPrice ? 46 : -500,
                        duration: 1
                    }
                ).start();
                Animated.timing(
                    this.state.dropDownSortTop,
                    {
                        toValue: this.state.dropDownSort ? 46 : -500,
                        duration: 1
                    }
                ).start();

            })
        }



    }
    multiSliderValuesChange = (values) => {
        this.setState({
            priceRange: values,
        });
    }
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.row}>
                    {
                        this.state.filterTabs.map((item, index) => {
                            return (
                                <TouchableWithoutFeedback key={index} onPress={() => {
                                    if (item.navigate) {
                                        this.props.navigation.navigate(item.navigate)
                                    } else {
                                        this._dropDownShow(item)
                                    }
                                }}>
                                    <View style={styles.cell}>

                                        <Text style={styles.cellTitleText}>{item.title}</Text>
                                        <Icon name="md-arrow-dropdown" style={{ fontSize: 14 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })
                    }

                </View>
                <Animated.View style={{
                    position: "absolute",
                    top: this.state.dropDownSortTop,
                    width: "100%",
                    backgroundColor: "white",
                    zIndex: 997
                }}>

                    <View style={{ paddingHorizontal: 20 }}>
                        {
                            this.state.sortItem.map((item, index) => {
                                return <View key={index} style={{ height: 40, justifyContent: "center" }}>
                                    <Text>{item.title}</Text>
                                </View>
                            })
                        }
                    </View>
                </Animated.View>
                <Animated.View style={{
                    position: "absolute",
                    top: this.state.dropDownPriceTop,
                    width: "100%",
                    backgroundColor: "white",
                    zIndex: 997
                }}>

                    <View style={{
                        flexWrap: "wrap",
                        flexDirection: "row",
                        justifyContent: "center",
                        overflow: "hidden"
                    }}>
                        {
                            this.state.priceItem.map((item, index) => {
                                return <TouchableOpacity key={index} style={{
                                    width: "33.33%", height: 50,
                                    justifyContent: "center", alignItems: "center"
                                }} onPress={() => { alert(item.title) }}>

                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ lineHeight: 50, height: "100%" }}>{item.title}</Text>
                                    </View>

                                </TouchableOpacity>

                            })
                        }
                        <View>
                            <View style={{ flexDirection: "row", paddingHorizontal: 20, justifyContent: "space-between", alignItems: "center" }}>
                                <View>
                                    <Text style={{ fontWeight: "bold" }}>自定义车价
                                        <Text style={{ fontSize: 12, fontWeight: "200", color: colors.Gray }}>
                                            &nbsp;&nbsp;(万元)</Text>
                                    </Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ color: colors.MainColor }}>
                                        {this.state.priceRange[0]}-{this.state.priceRange[1]}万
                                        </Text>
                                    <Button full style={{
                                        width: 60, height: 30, borderRadius: 3,
                                        marginLeft: 10, backgroundColor: colors.MainColor
                                    }}>
                                        <Text style={{ color: "white" }}>确定</Text>
                                    </Button>
                                </View>
                            </View>
                            <View style={{ flex: 1, marginHorizontal: 20, justifyContent: "center", alignItems: "center" }}>
                                <MultiSlider
                                    selectedStyle={{
                                        backgroundColor: colors.MainColor,
                                    }}
                                    values={[this.state.priceRange[0], this.state.priceRange[1]]}
                                    sliderLength={320}
                                    onValuesChange={this.multiSliderValuesChange}
                                    min={0}
                                    max={50}
                                    step={1}

                                    allowOverlap
                                //snapped
                                />
                            </View>

                        </View>
                    </View>

                    }




                </Animated.View>

            </View>
        )
    }
}