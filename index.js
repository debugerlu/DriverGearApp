import {AppRegistry} from 'react-native';
import DriverGearApp from './src/index'
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
AppRegistry.registerComponent('DriverGearApp', () => DriverGearApp);
