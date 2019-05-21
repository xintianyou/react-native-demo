import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, AsyncStorage, TouchableOpacity, Image } from 'react-native';

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
            userInfo: null,
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
            <View style={styles.container}>
                <View style={styles.setting_item}>
                    <View style={styles.item_title}>
                        <Image source={require('../../assets/images/set_safe.png')} style={styles.title_icon}/>
                        <Text style={styles.title_text}>安全设置</Text>
                    </View>
                    <View>
                        <Image source={require('../../assets/images/cell_arrow.png')} style={styles.title_icon}/>
                    </View>
                </View>
                <View style={styles.setting_item}>
                    <View style={styles.item_title}>
                        <Image source={require('../../assets/images/set_guide.png')} style={styles.title_icon}/>
                        <Text style={styles.title_text}>新手指引</Text>
                    </View>
                    <View>
                        <Image source={require('../../assets/images/cell_arrow.png')} style={styles.title_icon}/>
                    </View>
                </View>
                <View style={styles.setting_item}>
                    <View style={styles.item_title}>
                        <Image source={require('../../assets/images/set_server.png')} style={styles.title_icon}/>
                        <Text style={styles.title_text}>服务协议</Text>
                    </View>
                    <View>
                        <Image source={require('../../assets/images/cell_arrow.png')} style={styles.title_icon}/>
                    </View>
                </View>
                <View style={styles.setting_item}>
                    <View style={styles.item_title}>
                        <Image source={require('../../assets/images/set_version.png')} style={styles.title_icon}/>
                        <Text style={styles.title_text}>版本信息</Text>
                    </View>
                    <View>
                        <Image source={require('../../assets/images/cell_arrow.png')} style={styles.title_icon}/>
                    </View>
                </View>
                <View style={styles.setting_item}>
                    <View style={styles.item_title}>
                        <Image source={require('../../assets/images/set_about.png')} style={styles.title_icon}/>
                        <Text style={styles.title_text}>关于我们</Text>
                    </View>
                    <View>
                        <Image source={require('../../assets/images/cell_arrow.png')} style={styles.title_icon}/>
                    </View>
                </View>
                {this._isShowLoginout()}
            </View>
        )
    }
}
const windowstyle = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa'
    },
    setting_item: {
        height: 45,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderColor: '#eee'
    },
    item_title: {
        width: 94,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title_icon: {
        width: 17,
        height: 17,
        marginTop: 13
    },
    title_text: {
        height: 45,
        width: 56,
        lineHeight: 45
    },
    button: {
        height: 40,
        width: windowstyle.width * 0.64,
        marginLeft: windowstyle.width * 0.18,
        borderRadius:10,
        marginTop :20
    }
})