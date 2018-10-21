import React, { Component } from 'react';
import {
    View, ScrollView, TextInput, Picker, Image,
    TouchableWithoutFeedback, TouchableOpacity
} from 'react-native';
import { Textarea } from 'native-base'
import SectionHeader from '../../../components/SectionHeader'
import Modal from "react-native-modal";
import { Text, Icon, Button } from 'native-base';
import { styles } from '../styleSheet/form';
import colors from '../../../config/color'
export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            formBody: {
                carSeries: "",
                carPictures: []
            }
        };

    }
    selBrandHandler = (brand) => {
        this.setState(prevState => ({
            formBody: {
                ...prevState.formBody,
                carSeries: brand.pchexi
            }
        }))

    }
    _takeCarPictureDone = (pictrures => {
        this.setState(prevState => ({
            formBody: {
                ...prevState.formBody,
                carPictures: pictrures
            }
        }))
    })
    _takeCarPicture = () => {
        this.props.navigation.navigate('carTakePicture', { pic: this.state.formBody.carPictures, onTakePictureDone: this._takeCarPictureDone })
    }
    _carVinScan = () => {
        this.props.navigation.navigate('carVinScan')
    }
    render() {
        return (
            <ScrollView styles={styles.container}>
                <View styes={styles.section}>
                    <SectionHeader section={{ leftTitle: "车辆照片" }} />

                    <View style={styles.carImage}>
                        <View style={styles.carImageSection}>
                            <Text style={styles.carImageMarkText}>
                                {
                                    this.state.formBody.carPictures.length === 0 ?
                                        "请添加车辆照片" : `共${this.state.formBody.carPictures.length}张照片`
                                }
                            </Text>
                            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                <TouchableOpacity style={{ position: "relative", left: 0 }} onPress={this._takeCarPicture}>
                                    <View style={styles.imgThumb}>
                                        <Icon name="ios-camera-outline" />
                                    </View>
                                </TouchableOpacity>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >

                                    {
                                        this.state.formBody.carPictures.map((item, index) => {
                                            return <View key={index} style={styles.imgThumb}>
                                                <Image source={{ uri: item.uri }} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
                                            </View>
                                        })
                                    }

                                </ScrollView>

                            </View>

                        </View>
                    </View>
                </View>
                <View styes={styles.section}>
                    <SectionHeader section={{ leftTitle: "基本信息" }} />
                    <View style={styles.row}>
                        <View style={styles.cellLeft}><Text style={styles.leftText}>车架号(VIN码)</Text></View>
                        <View style={styles.cellMiddle}><TextInput placeholder="扫码可自动识别车型" /></View>
                        <TouchableOpacity onPress={this._carVinScan}>
                            <View style={styles.cellRight}><Icon name="ios-barcode-outline" /></View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableWithoutFeedback onPress={() => {
                            this.props.navigation.navigate('carBrandSel',
                                { onSelBrand: this.selBrandHandler })
                        }
                        } >
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <View style={styles.cellLeft}><Text style={styles.leftText}>品牌车系</Text></View>
                                <View style={styles.cellMiddle}>
                                    <TextInput editable={false} placeholder="选择品牌/车系" value={this.state.formBody.carSeries} />
                                </View>
                                <View style={styles.cellRight}><Icon name="arrow-forward" /></View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.row}>
                        <TouchableWithoutFeedback onPress={() => this.setState({ showModal: true })} >
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <View style={styles.cellLeft}><Text style={styles.leftText}>车辆分类</Text></View>
                                <View style={styles.cellMiddle}>
                                    <TextInput editable={false} placeholder="选择车辆分类(新车/二手车)" />
                                </View>
                                <View style={styles.cellRight}><Icon name="arrow-forward" /></View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.cellLeft}><Text style={styles.leftText}>首次上牌</Text></View>
                        <View style={styles.cellMiddle}><TextInput placeholder="首次上牌时间" /></View>
                        <View style={styles.cellRight}><Icon name="arrow-forward" /></View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.cellLeft}><Text style={styles.leftText}>当前里程</Text></View>
                        <View style={styles.cellMiddle}><TextInput placeholder="实表里程数" /></View>
                        <View style={styles.cellRight}><Text style={styles.leftText}>万公里</Text></View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.cellLeft}><Text style={styles.leftText}>过户次数</Text></View>
                        <View style={styles.cellMiddle}><TextInput placeholder="" /></View>
                        <View style={styles.cellRight}><Text style={styles.leftText}>次</Text></View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.cellLeft}><Text style={styles.leftText}>新车价格</Text></View>
                        <View style={styles.cellMiddle}><TextInput keyboardType="numeric" placeholder="0.00" /></View>
                        <View style={styles.cellRight}><Text style={styles.leftText}>万元</Text></View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.cellLeft}><Text style={styles.leftText}>零售价格</Text></View>
                        <View style={styles.cellMiddle}><TextInput keyboardType="numeric" placeholder="0.00" /></View>
                        <View style={styles.cellRight}><Text style={styles.leftText}>万元</Text></View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.cellLeft}><Text style={styles.leftText}>{this.props.carSourceType === "tonghang" ? "同行底价" : "批发价格"}</Text></View>
                        <View style={styles.cellMiddle}><TextInput keyboardType="numeric" placeholder="0.00" /></View>
                        <View style={styles.cellRight}><Text style={styles.leftText}>万元</Text></View>
                    </View>

                </View>

                <View style={styles.section}>
                    <SectionHeader section={{ leftTitle: "车辆描述" }} />
                    <Textarea rowSpan={5} placeholder="请输入车辆详细信息..." />
                </View>
                <View style={[styles.section, { paddingVertical: 20, paddingHorizontal: 10 }]}>
                    <Button full success style={{ backgroundColor: colors.MainColor, }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>发 布</Text>
                    </Button>
                </View>

                <Modal
                    isVisible={this.state.showModal}
                    onSwipe={() => this.setState({ showModal: false })}
                    swipeDirection="down"

                    style={{
                        justifyContent: "flex-end",
                        margin: 0,
                        padding: 0
                    }}>
                    <View style={styles.pickerHeader}>
                        <View>
                            <TouchableWithoutFeedback onPress={() => { this.setState({ showModal: false }) }}>
                                <Text>确定</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <Picker
                        selectedValue={"newCar"}
                        style={{ backgroundColor: "#fff", height: 200, }}
                        mode={"dropdown"}
                        onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
                        <Picker.Item label="二手车" value="oldCar" />
                        <Picker.Item label="新车" value="newCar" />
                        <Picker.Item label="事故车" value="carsCar" />
                    </Picker>
                </Modal>


            </ScrollView>
        );
    }
}
