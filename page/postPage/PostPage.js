import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button, TouchableOpacity, Dimensions, CameraRoll, Image, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import CameraButton from '../../component/common/CameraButton';

export default class PostPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: '发布票据',
    }
  };
  constructor(props) {
    super(props)
    this.state = {
        avatarSource: null
    }
  }
  render() {
    return (
      <View style={styles.contaiter}>
        <Text>发布票据</Text>
        <CameraButton
          onFileUpload={this.onFileUpload.bind(this)}
          style={styles.cameraBtn}
          photos={[]}
          text={
            <Text style={styles.cameraBtnText}>上传</Text>
          }
        />
        <Image source={this.state.avatarSource} style={styles.uploadAvatar} />
      </View>
    )
  }
  onFileUpload(file, fileName) {
    const source = { uri: file };
    this.setState({
      avatarSource: source,
    });
  }
}

let Screen = Dimensions.get('window')
const styles = StyleSheet.create({
  contaiter: {
    flex: 1
  },
  cameraBtn: {
    width: 200,
    height: 50,
    borderRadius: 8,
    borderColor: '#ffb307',
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  cameraBtnText: {
    lineHeight: 50,
    textAlign: 'center',
    color: '#ffb307'
  },
  uploadAvatar: {
    width: Screen.width,
    height: Screen.width,
  },
})