import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from "react-navigation";

import HomePage from '../page/homePage/HomePage';
import MarketPage from '../page/marketPage/MarketPage';

const MainTabSelectedIcon = require("../assets/images/i_home_foc.png");
const MainTabUnSelectedIcon = require("../assets/images/i_home.png");
const LiveTabUnSelectedIcon = require("../assets/images/i_live.png");
const LiveTabSelectedIcon = require("../assets/images/i_live_foc.png");

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