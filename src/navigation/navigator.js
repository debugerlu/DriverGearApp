/**
 * App导航路由
 */

import {
    createStackNavigator,
    createBottomTabNavigator,
    createSwitchNavigator,
} from 'react-navigation';
// 首页面
import home from '../containers/home/screen/index'

// 车圈
import carClub from '../containers/carClub/screen/index'

//找车
import findCar from '../containers/car/screen/findCar'
import searchScreen from '../containers/car/screen/search'
import carDetailScreen from '../containers/car/screen/carDetailScreen';
//发布
import publishCar from '../containers/car/screen/publish';
//品牌车系选择
import carBrandSel from '../containers/car/screen/carBrandSel';
//车辆拍照
import carTakePicture from '../containers/car/screen/carTakePicture';
//车架号扫描
import carVinScan from '../containers/car/screen/carVinScan'

//我的
import user from '../containers/user/screen/index'
import userInfo from '../containers/user/screen/userInfo'
import setting from '../containers/user/screen/setting'
//登录认证
import login from '../containers/auth/screen/login'
import register from '../containers/auth/screen/register'
import authLoading from '../containers/auth/screen/authLoading'

import {
    headerOptions,
    RouteConfigs,
    TabNavigatorConfig
} from "./config"


const TabBarText = {
    HomeText: "首页",
    FindCarText: "找车",
    PublishCarText: "发布",
    CarClubText: "车圈",
    User: "我的",
}
const HOME = createStackNavigator({
    home: {
        screen: home
    },
})
const FINDCAR = createStackNavigator({
    findeCar: {
        screen: findCar
    },
})
const SEARCH = createStackNavigator({
    search: {
        screen: searchScreen
    }
}, { headerMode: "screen", mode: "card", })
const CARBRANDSEL = createStackNavigator({
    carBrandSel: {
        screen: carBrandSel
    }
})
const CARCLUB = createStackNavigator({
    carClub: {
        screen: carClub,
        navigationOptions: props => {
            return {
                headerStyle: {
                    height: 30
                },
                headerTitle: "车圈"
            }

        }
    },
})
const USER = createStackNavigator({
    user: {
        screen: user,
        navigationOptions: props => {
            return {
                headerStyle: {
                    height: 30
                },
                headerTitle: "我的"
            }

        }
    },
})
const CARDETAIL = createStackNavigator({
    carDetail: {
        screen: carDetailScreen
    }
}, { headerMode: "screen", mode: "card", })
const PUBLISHCAR = createStackNavigator({
    publishCar: {
        screen: publishCar
    }
}, { headerMode: "screen", mode: "card", })
const CARTAKEPICTURE = createStackNavigator({
    carTakePicture: {
        screen: carTakePicture
    }
}, { headerMode: "screen", mode: "card", })
const Tabs = createBottomTabNavigator({
    home: {
        screen: HOME,
        path: "home",
        navigationOptions: props => {
            return RouteConfigs({
                props,
                icon: "ios-home",
                activeIcon: 'ios-home-outline',
                label: TabBarText.HomeText,
            })
        },
    },
    findCar: {
        screen: FINDCAR,
        path: "findCar",
        navigationOptions: props => {
            return RouteConfigs({
                props,
                icon: "ios-search",
                activeIcon: 'ios-search-outline',
                label: TabBarText.FindCarText,

            })
        },
    },
    publishCar: {
        screen: PUBLISHCAR,
        path: "publishCar",
        navigationOptions: props => {
            return RouteConfigs({
                props,
                icon: "ios-home",
                activeIcon: 'ios-home-outline',
                label: TabBarText.PublishCarText,
            })
        },

    },
    carClub: {
        screen: CARCLUB,
        path: "carClub",
        navigationOptions: props => {
            return RouteConfigs({
                props,
                icon: "ios-keypad",
                activeIcon: 'ios-keypad-outline',
                label: TabBarText.CarClubText,
            })
        },

    },
    user: {
        screen: USER,
        path: "user",
        navigationOptions: props => {
            return RouteConfigs({
                props,
                icon: "ios-contact",
                activeIcon: 'ios-contact-outline',
                label: TabBarText.User,

            })
        },
    },
},
    TabNavigatorConfig({
        lazy: true,
        initialRouteName: "home",
    }),
);

const Auth = createStackNavigator({
    login: {
        screen: login,
        navigationOptions: props => {
            return headerOptions({
                ...props,
                visible: true
            })
        }
    },
    register: {
        screen: register,
        navigationOptions: props => {
            return headerOptions({
                ...props,
                back: true
            })
        }
    },
}
);
const App = createStackNavigator({
    tabs: {
        screen: Tabs
    },
    carDetail: {
        screen: CARDETAIL
    },
    carBrandSel: {
        screen: CARBRANDSEL
    },
    carTakePicture: {
        screen: CARTAKEPICTURE
    },
    carVinScan: {
        screen: carVinScan,
        navigationOptions: props => {
            return headerOptions({
                ...props,
                back: true
            })
        }
    },
    userInfo: {
        screen: userInfo,
        navigationOptions: props => {
            return headerOptions({
                ...props,
                back: true
            })
        }
    },
    setting: {
        screen: setting,
        navigationOptions: props => {
            return headerOptions({
                ...props,
                back: true
            })
        }
    },
    search: {
        screen: SEARCH
    },
},
    {
        headerMode: "none"
    }
);

const Routers = createSwitchNavigator({
    AuthLoading: authLoading,
    App: App,
    Auth: Auth,
}, { initialRouteName: 'AuthLoading' });
export default Routers;