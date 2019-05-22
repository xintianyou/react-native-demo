import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button, TouchableOpacity, TouchableHighlight, Dimensions, CameraRoll, Image, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: null,
  cancelButtonTitle:'取消',
  takePhotoButtonTitle: '拍照', 
  chooseFromLibraryButtonTitle: '从相册选择',
  cameraType: 'back',
  mediaType: 'photo',
  videoQuality: 'high', 
  durationLimit: 10,
  maxWidth: 600,
  maxHeight: 600,
  aspectX: 2, 
  aspectY: 1,
  quality: 0.8,
  angle: 0,
  allowsEditing: false,
  noData: false,
  storageOptions: { 
    skipBackup: true,
    path: 'images'
  }
};

export default class CameraButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false
    }
  }
  render() {
    const {photos,type,text} = this.props;
    return (
      <TouchableHighlight
        onPress={this.showImagePicker.bind(this)}
        style={[this.props.style,styles.cameraBtn]}>
        {text}
      </TouchableHighlight>
    )
  }

  showImagePicker() {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        // alert('User cancelled image picker');
      }
      else if (response.error) {
        alert('ImagePicker Error: ', response.error);
      }
      else {
        let source;
        if (Platform.OS === 'android') {
            source = {uri: response.uri, isStatic: true}
        } else {
            source = {uri: response.uri.replace('file://', ''), isStatic: true}
        }
      
        let file;
        if(Platform.OS === 'android'){
            file = response.uri
        }else {
            file = response.uri.replace('file://', '')
        }

        this.setState({
            loading:true
        });
        this.props.onFileUpload(file,response.fileName)
        this.setState({
          loading:false
        })
      }
    });
  }
}
const styles = StyleSheet.create({
  
});