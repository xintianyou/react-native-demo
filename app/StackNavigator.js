import React, { Component } from 'react';
import { createStackNavigator } from "react-navigation";
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