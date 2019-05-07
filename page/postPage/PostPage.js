import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button, TouchableOpacity, Dimensions, CameraRoll, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class PostPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarSource: null
        }
    }
    render() {
        return (
            <View>
                <Text>发布票据</Text>
                <Button title="上传" onPress={()=>this.uploadImg()}></Button>
            </View>
        )
    }
    uploadImg() {
        ImagePicker.showImagePicker(options, (response) => {
            alert(JSON.stringify(response));
          
            if (response.didCancel) {
              alert('User cancelled image picker');
            } else if (response.error) {
              alert('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              alert('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                avatarSource: source,
              });
            }
        });
    }
}
const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
};