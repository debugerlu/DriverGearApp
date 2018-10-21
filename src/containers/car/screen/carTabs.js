import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'native-base';
import color from '../../../config/color';
import UserClickCarList from './carsList/userClickCarList';
import UserDownLoadCarList from './carsList/userDownLoadCarList';
@connect(
    state => {
        return { ...state };
    }
)
export default class carTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                { title: "会员点击榜" },
                { title: "人气下载榜" },
            ]
        };
    }
    componentDidMount() {

    }
    render() {
        return (
            <Tabs
                tabBarUnderlineStyle={{ height: 1, backgroundColor: color.MainColor }}
                tabBarPosition="overlayTop">
                <Tab heading="会员点击榜">
                    <UserClickCarList navigation={this.props.navigation} />
                </Tab>
                <Tab heading="人气下载榜">
                    <UserDownLoadCarList navigation={this.props.navigation} />
                </Tab>
            </Tabs>
        );
    }
}
