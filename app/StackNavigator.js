import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from "react-navigation";
import BottomNavigator from './BottomNavigator';

import BillDetail from '../component/common/BillDetail';

export default StackNavigator = createStackNavigator({
    BottomNavigator: {
      screen: BottomNavigator,
      navigationOptions: ({navigation, screenProps}) => ({
        header: null,
      })
    },
    BillDetail: {
      screen: BillDetail
    }
})