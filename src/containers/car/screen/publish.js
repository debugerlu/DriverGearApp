//载入基础依赖库
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styleSheet/publish';
import { connect } from 'react-redux'
import { Tabs, Tab } from 'native-base';
import Form from './form'
import color from '../../../config/color'
// 创建组件 Publish
@connect(
    state => { return { ...state } }
)
class Publish extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            headerTitle: "车源发布",
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
    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                {/* <BrandSel /> */}
                <Tabs
                    tabBarUnderlineStyle={{ height: 1, backgroundColor: color.MainColor }}
                    tabBarPosition="overlayTop">
                    <Tab heading="同行车源">
                        <Form navigation={navigation} carSourceType={"tonghang"} />
                    </Tab>
                    <Tab heading="限时批发">
                        <Form navigation={navigation} carSourceType={"pifa"} />
                    </Tab>
                </Tabs>
            </View>
        );
    }
}
export default Publish;



