import React, { Component } from 'react';
import CarCamera from '../../../components/Camera/CarCamera';
import Cancel from '../../../components/NavigationButton/cancel'
import { TouchableOpacity, Text } from 'react-native';
export default class carTakePicture extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            headerLeft: <Cancel navigation={navigation} />,
            headerRight: <TouchableOpacity onPress={() => {
                navigation.goBack(null);
                navigation.state.params.onTakePictureDone(params.pictures);
            }}><Text style={{ color: "white" }}>确定</Text></TouchableOpacity>,
            headerTitle: "",
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
                backgroundColor: "black",
            },
        }
    }
    constructor(props) {
        super(props);
        this.pictures = [];
        this.state = {
        };
    }
    componentWillMount() {
        const { navigation } = this.props;
        this.pictures = navigation.state.params.pic;
        navigation.setParams({ pictures: this.pictures })
    }

    _takeOnePictureDone = (data) => {
        this.pictures.push({ uri: data.uri });
    }

    render() {
        return (
            <CarCamera takePictureDone={this._takeOnePictureDone} />
        );
    }
}
