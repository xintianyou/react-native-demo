import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Button, Alert, TouchableHighlight } from 'react-native';

export default class MyButton extends React.Component {
  static defaultProps = {
    title: '提交'
  }
  render() {
    return (
      <TouchableHighlight style={styles.button} onPress={()=>this.props.onPressButton()}>
        <Text style={ styles.buttonText }>
          { this.props.title }
        </Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: '#ffb307'
  },
  buttonText: {
    textAlign: "center",
    lineHeight: 50,
    fontSize: 20,
    color: '#fff'
  }
});
