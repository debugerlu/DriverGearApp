import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import CarBrand from '../../../components/Brand/BrandSel';
import Cancel from '../../../components/NavigationButton/cancel';
/**
 *  品牌选择
 */
@connect(
    state => { return { ...state } }
)
export default class carBrandSel extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            headerTitle: "品牌选择",
            headerLeft: <Cancel navigation={navigation} />,
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
                backgroundColor: "white",
            },
        }
    }
    onCarSeriesSelHandle = (carSeries) => {
        const { navigation } = this.props;
        navigation.goBack();
        navigation.state.params.onSelBrand(carSeries);
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <CarBrand onCarSeriesSel={this.onCarSeriesSelHandle} />
            </View>
        )
    }
}