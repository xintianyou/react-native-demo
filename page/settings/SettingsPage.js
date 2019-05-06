import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, AsyncStorage, TouchableOpacity } from 'react-native';

export default class SettingsPage extends React.Component{
    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        return {
            title: '设置',
        }
    };
    constructor(props) {
        super(props)
        this.state = {
            userInfo: null
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('userInfo').then((values) => {
            this.setState({
                userInfo: JSON.parse(values)
            })
        });
    }
    _loginout() {
        AsyncStorage.removeItem('userInfo', (err) => {
            if (!err) {
                this.props.navigation.navigate('HomePage');
                alert('退出登录成功')
            } else {
                alert('退出登录失败')
            }
        })
    }
    _isShowLoginout() {
        if (this.state.userInfo) {
            return (
                <TouchableOpacity style={styles.button}>
                    <Button title="退出当前账户" onPress={()=>this._loginout()}></Button>
                </TouchableOpacity>
            )
        }
    }
    render () {
        return (
            <View>
                {this._isShowLoginout()}
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
    }
})