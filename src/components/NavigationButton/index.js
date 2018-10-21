import React, { Component } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { Icon } from 'native-base';
const AnimatedIcon = Animated.createAnimatedComponent(Icon)
export default class ArrowBack extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={() => {
        this.props.navigation.goBack(null);
      }}>
        <AnimatedIcon name="ios-arrow-back" style={{ color: this.props.color }} />
      </TouchableOpacity>
    );
  }
}
