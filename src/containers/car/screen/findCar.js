/**
 * 找车页
 */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Animated,
    SafeAreaView,
    StatusBar
} from 'react-native';
import { Tabs, Tab } from 'native-base';
import DropDownFilter from '../../../components/DropDownMenu/DropDownFilter';
import colors from '../../../config/color'
import SearchBox from '../../../components/SearchBox';
import NewCarList from './carsList/newCarList';
import OldCarList from './carsList/oldCarList';
import DamageCarList from './carsList/damageCarList';
@connect(
    state => {
        return { ...state }
    }
)
export default class findCar extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            headerTitle: <SearchBox editable={false} navigation={navigation} />,
            headerLeft: <Animated.Text style={{ color: 'black' }}>呼和浩特</Animated.Text>,
            headerRight: <Animated.Text style={{ color: 'black' }}>客服</Animated.Text>,
            headerStyle: {
                //top: (!params ? 0 : params.headerTop),
                paddingHorizontal: 10,
                backgroundColor: 'white',
                borderBottomWidth: 0,
            }
        }

    };
    constructor(props, context) {
        super(props, context)
        this.state = {
            modalVisible: false,
            pageNo: 1,
            pageSize: 10
        };
        this.scrollY = new Animated.Value(0);
    }

    _scrollToSection = (sectionIndex, itemIndex) => {
        this._sectionView.getNode().scrollToLocation({ sectionIndex, itemIndex });
    }
    componentWillMount() {
        this.props.navigation.setParams({
            headerTop: this.scrollY.interpolate({
                inputRange: [0, 100],
                outputRange: [0, -50],
                extrapolate: 'clamp'
            })
        });
    }
    componentDidMount() {

    }
    render() {
        const { data, section, navigation, isLoading } = this.props;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {/* <StatusBar backgroundColor="red"/> */}
                <DropDownFilter navigation={navigation} />
                <Tabs tabBarUnderlineStyle={{ height: 1, backgroundColor: colors.MainColor }}>
                    <Tab heading="新车">
                        <NewCarList navigation={this.props.navigation} />
                    </Tab>
                    <Tab heading="二手车">
                        <OldCarList navigation={this.props.navigation} />
                    </Tab>
                    <Tab heading="事故车">
                        <DamageCarList navigation={this.props.navigation} />
                    </Tab>
                </Tabs>

            </SafeAreaView>
        );
    }

}


