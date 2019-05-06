import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { createAppContainer } from "react-navigation";
import StackNavigator from './app/StackNavigator';

export default class App extends React.Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}
const AppContainer = createAppContainer(StackNavigator);
