import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import colors from '../../config/color'
export default class ArrowBack extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={() => {
        this.props.navigation.goBack(null);
      }}>
        <Text style={{ color: colors.MainColor }}>取消</Text>
      </TouchableOpacity>
    );
  }
}
