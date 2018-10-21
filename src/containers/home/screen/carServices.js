import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import LableLine from '../../../components/SectionHeader/lableLine'
import { carServicesStyle } from '../styleSheet'
export default class CarServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            girdData: [
                { lable: "保养", mark: '4s保养记录', thumb: require('../../../assets/images/header.jpg') },
                { lable: "维修", mark: '服务至善至美', thumb: require('../../../assets/images/header.jpg') },
            ]
        };
    }

    render() {
        return (
            <View style={carServicesStyle.grid}>
                <View style={carServicesStyle.sectionLable}>
                    <LableLine lableText={"车商服务"} />
                </View>
                <View style={carServicesStyle.row}>
                    {
                        this.state.girdData.map(item => {
                            return <View style={carServicesStyle.cell}>
                                <View style={carServicesStyle.cellLeft}>
                                    <View style={{ flex: 1,justifyContent:"center" }}><Text style={carServicesStyle.lableText}>{item.lable}</Text></View>
                                    <View style={{ flex: 1 }}><Text style={carServicesStyle.markText}>{item.mark}</Text></View>
                                </View>
                                <View style={carServicesStyle.cellRight}>
                                    <Image source={item.thumb} style={carServicesStyle.thumb} />
                                </View>
                            </View>
                        })
                    }
                </View>


            </View>
        );
    }
}
