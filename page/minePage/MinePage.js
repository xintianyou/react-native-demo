import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button, TouchableOpacity, Dimensions, CameraRoll, Image } from 'react-native';

export default class MinePage extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            userInfo: null,
            photo: ''
        }
    }
    componentDidMount() {
        this.props.navigation.addListener('didFocus', () => {
            this._getUserInfo();
        });
    }
    //查询用户信息
    _getUserInfo() {
        let token = AsyncStorage.getItem('userInfo').then((values) => {
            this.setState({
                userInfo: JSON.parse(values)
            })
        });
    }
    _loginout() {
        AsyncStorage.removeItem('userInfo', (err) => {
            if (!err) {
                this._getUserInfo();
                alert('退出登录成功')
            } else {
                alert('退出登录失败')
            }
        })
    }
    _jumpPage() {
        this.props.navigation.navigate('Login');
    }
    _enterpriseName() {
        if (!this.state.userInfo) {
            return (
                <TouchableOpacity style={styles.button}>
                    <Button title="登录" onPress={()=>this._jumpPage()}></Button>
                </TouchableOpacity>
            )
        } else {
            return (
                <View>
                    <Text style={{textAlign:"center"}}>
                        {this.state.userInfo.enterprise_name}
                    </Text>
                    <Text style={{textAlign:"center"}}>
                        企业ID:{this.state.userInfo.enterprise_id}
                    </Text>
                </View>
            )
        }
    }
    _uploadImg() {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
        })
        .then(r => {
            alert('success')
            this.setState({ photo: r.edges });
        })
        .catch((err) => {
            alert(err)
            //Error Loading Images
        });
    };
    render() {
        return (
            <View>
                <TouchableOpacity style={styles.button}>
                    <Button title="设置" onPress={()=>this.props.navigation.navigate('Settings')}></Button>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={this._uploadImg}>
                    <View style={styles.photoImg}>
                    
                    </View>
                </TouchableOpacity> */}
                {this._enterpriseName()}
            </View>
        )
    }
}
const windowstyle = Dimensions.get('window');
const styles = StyleSheet.create({
    button: {
        height: 40,
        width: windowstyle.width * 0.64,
        marginLeft: windowstyle.width * 0.18,
        borderRadius:10,
        marginTop :20
    },
    photoBox: {
        width: 110,
        height: 110,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    photoImg: {
        width: 110,
        height: 110,
        borderRadius: 100,
        backgroundColor: '#000',
    }
})