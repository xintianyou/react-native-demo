import React, { Component } from 'react';
import { createStackNavigator } from "react-navigation";
import BottomNavigator from './BottomNavigator';

import BillDetail from '../component/common/BillDetail';
import Login from '../page/login/Login';
import Settings from '../page/settings/SettingsPage';
import SettingsPage from '../page/settings/SettingsPage';

export default StackNavigator = createStackNavigator({
  BottomNavigator: {
    screen: BottomNavigator,
    navigationOptions: ({navigation, screenProps}) => ({
      header: null,
      // headerBackTitle: null
    })
  },
  BillDetail: {
    screen: BillDetail
  },
  Login: {
    screen: Login
  },
  Settings: {
    screen: SettingsPage
  }
})