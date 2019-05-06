import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from "react-navigation";

import HomePage from '../page/homePage/HomePage';
import MarketPage from '../page/marketPage/MarketPage';
import MinePage from '../page/minePage/MinePage';

const MainTabSelectedIcon = require("../assets/images/i_home_foc.png");
const MainTabUnSelectedIcon = require("../assets/images/i_home.png");
const LiveTabSelectedIcon = require("../assets/images/i_live_foc.png");
const LiveTabUnSelectedIcon = require("../assets/images/i_live.png");
const MineTabSelectedIcon = require("../assets/images/i_mine_foc.png");
const MineTabUnSelectedIcon = require("../assets/images/i_mine.png");

export default BottomNavigator = createBottomTabNavigator({
    HomePage: {
      screen: HomePage,
      navigationOptions: ({ navigation, screeProps }) => ({
        title: '首页',
        headerStyle:styles.navigator,
        headerTitleStyle:styles.navigatorTitle,
        tabBarIcon:(({tintColor,focused}) => {
          return(
            <Image 
              source={focused ? MainTabSelectedIcon : MainTabUnSelectedIcon}
              style={styles.tabbarImage}
            />
          )
        }),
      })
    },
    MarketPage: {
      screen: MarketPage,
      navigationOptions: ({ navigation, screeProps }) => ({
        title: '票据商城',
        headerStyle:styles.navigator,
        headerTitleStyle:styles.navigatorTitle,
        tabBarIcon:(({tintColor,focused}) => {
          return(
            <Image 
              source={focused ? LiveTabSelectedIcon : LiveTabUnSelectedIcon}
              style={styles.tabbarImage}
            />
          )
        }),
      })
    },
    MinePage: {
      screen: MinePage,
      navigationOptions: ({ navigation, screeProps }) => ({
        title: '我的交易',
        headerStyle:styles.navigator,
        headerTitleStyle:styles.navigatorTitle,
        tabBarIcon:(({tintColor,focused}) => {
          return(
            <Image 
              source={focused ? MineTabSelectedIcon : MineTabUnSelectedIcon}
              style={styles.tabbarImage}
            />
          )
        }),
      })
    },
}, {
  initialRouteName:'HomePage'
});

const styles = StyleSheet.create({
    navigatorTitle:{
        fontSize:17,
        color:'white',
    },
    navigator:{
        backgroundColor:'#d81e06',
    },
    tabbarImage:{
        width:25,
        height:25,
        marginBottom:-3,
    },
})