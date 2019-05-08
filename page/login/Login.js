import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, AsyncStorage, TouchableOpacity } from 'react-native';

export default class Login extends React.Component{
    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        return {
            title: '登录',
        }
    };
    constructor(props) {
        super(props)
        this.state = {
            phone: '13611841359',
            pwd: '123456',
            loginEnter: []
        }
    }
    _jumpPage() {
        fetch(`https://www.huipiaoxian.com/gateway/customers/customerLoginEnterprise`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.phone,
                password: this.state.pwd
            })
        }).then((response) => response.json()).then((responseJson) => {
            if (responseJson) {
                if (responseJson.status == 201) {
                    this.setState({
                        loginEnter: responseJson.data.enterprises
                    })
                    if (responseJson.data.enterprises.length == 1) {
                        let loginForm = {
                            username: this.state.phone,
                            password: this.state.pwd,
                            enterprise_id: responseJson.data.enterprises[0].enterprise_id
                        }
                        this._login(loginForm);
                    }
                } else if(responseJson.status == 410) {
                    alert('密码错误')
                }
            }
        })
    }
    _login(loginForm) {
        fetch(`https://www.huipiaoxian.com/gateway/customers/customerLogin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginForm)
        }).then((response) => response.json()).then((responseJson) => {
            if (responseJson) {
                if (responseJson.status == 201) {
                    let { 
                        token,
                        customer_id,
                        enterprise_name,
                        customer_name,
                        enterprise_id,
                        corpNo
                    } = responseJson.data;
                    let userInfo = {
                        token,
                        customer_id,
                        enterprise_id,
                        enterprise_name,
                        customer_name,
                        corpNo
                    }
                    AsyncStorage.setItem('userInfo', JSON.stringify(userInfo), (error)=>{
                        if (!error) {
                            alert('登录成功');
                            this.props.navigation.navigate('MinePage');
                        } else {
                            alert('数据保存失败');
                        }
                    });
                }
            }
        })
    }
    render() {
        return (
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    keyboardType={'numeric'}
                    value={this.state.phone}
                    placeholder="请输入账号"
                    maxLength={11}
                    onChangeText={(phone)=>this.setState({phone:phone})}
                />
                <TextInput
                    style={styles.input}
                    value={this.state.pwd}
                    placeholder="请输入密码"
                    password={true}
                    secureTextEntry={true}
                    onChangeText={(pwd)=>this.setState({pwd:pwd})}
                />
                <TouchableOpacity style={styles.button}>
                    <Button title="登录" onPress={()=>this._jumpPage()}></Button>
                </TouchableOpacity>
            </View>
        )
    }
}

const windowstyle = Dimensions.get('window');
const styles = StyleSheet.create({
    inputBox: {
        flex: 1
    },
    input: {
        height: 40,
        width: windowstyle.width * 0.64,
        marginLeft: windowstyle.width * 0.18,
        marginTop: 20,
        borderColor: 'gray',
        borderWidth: 1
    },
    button: {
        height: 40,
        width: windowstyle.width * 0.64,
        marginLeft: windowstyle.width * 0.18,
        borderRadius:10,
        marginTop :20
    }
})