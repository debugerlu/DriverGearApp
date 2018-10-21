import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { businessStyles } from '../styleSheet/index'
export default class BusinessModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            girdData: [
                { lable: "同行车源", thumb: require('../../../assets/images/header.jpg') },
                { lable: "限时批发", thumb: require('../../../assets/images/header.jpg') },
                { lable: "客服咨询", thumb: require('../../../assets/images/header.jpg') },
                { lable: "车商服务", thumb: require('../../../assets/images/header.jpg') }
            ]
        };
    }

    render() {
        return (
            <View style={businessStyles.grid}>
                {
                    this.state.girdData.map(item => {

                        return <View style={businessStyles.gridCell}>
                            <View>
                                <Image source={item.thumb} style={businessStyles.thumb} />
                            </View>
                            <View>
                                <Text style={businessStyles.lableText}>{item.lable}</Text>
                            </View>
                        </View>
                    })
                }

            </View>
        );
    }
}
