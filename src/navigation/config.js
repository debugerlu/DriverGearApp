/**
 * Created by bear on 2018/2/5.
 */
import React from "react"
import { View, StyleSheet } from "react-native"
import { Icon } from '../components/Icon/index'
import colors from '../config/color';
const activeTabColor = colors.MainColor
const defaultTabColor = "#7a86a2"
export const headerOptions = props => {
    const {
        navigationOptions,
        visible = true,
        title = ''
    } = props
    const header = visible === false
        ? null
        : undefined;
    return {
        header,
        title,
        headerBackTitle: '返回',
        headerTintColor: '#6f6f6f',
        headerTitleStyle: {
            fontSize: 16,
            alignSelf: "center",
            color: "black"
        },
        headerStyle: {
            height: 44,
            backgroundColor: "white"
        },
        ...navigationOptions
    }
}
export const RouteConfigs = options => {
    const {
        icon = null,
        activeIcon = null,
        label = null,
        props,
        headerTitle,
        visible = true
    } = options

    return {
        ...headerOptions({
            ...props,
            visible
        }),
        title: headerTitle,
        tabBarLabel: label,
        tabBarIcon: ({ focused }) => {
            const IcoName = focused
                ? icon
                : activeIcon
            const IcoColor = focused
                ? activeTabColor
                : defaultTabColor
            return label === '发布'
                ? <View style={styles.tabMark}>

                    <Icon name={`iconfont|dongtai`} size={38} color={IcoColor} />
                </View>
                : <Icon name={`ionicons|${IcoName}`} size={26} color={IcoColor} />
        }
    }
}
export const TabNavigatorConfig = options => {
    const {
        initialRouteName: InitialRouteName = "",
        tabBarPosition: TabBarPosition = "bottom",
        swipeEnabled: SwipeEnabled = false,
        scrollEnabled: ScrollEnabled = false,
        animationEnabled: AnimationEnabled = false,
        showIcon: ShowIcon = true
    } = options

    return {
        lazy: true,
        initialRouteName: InitialRouteName,
        tabBarPosition: TabBarPosition,
        swipeEnabled: SwipeEnabled,
        scrollEnabled: ScrollEnabled,
        animationEnabled: AnimationEnabled,
        backBehavior: "none",
        tabBarOptions: {
            labelStyle: {
                margin: 0,
                padding: 0,
                fontSize: 12
            },
            style: {
                borderTopColor: '#e5e5e5',
                backgroundColor: "#fff",
                opacity: 1
            },
            pressColor: "#e5e5e5",
            pressOpacity: 0.3,
            indicatorStyle: {
                height: 0
            },
            inactiveTintColor: defaultTabColor,
            activeTintColor: activeTabColor,
            showLabel: true,
            showIcon: ShowIcon,
            upperCaseLabel: false
        }
    }
}


const styles = StyleSheet.create({
    tabMark: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        alignItems: 'center',
        backgroundColor: "#fff",
        marginTop: -20
    }

})
