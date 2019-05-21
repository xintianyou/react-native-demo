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
    _Login() {
        this.props.navigation.navigate('Login');
    }
    _Signin() {
        alert('注册')
    }
    _enterpriseName() {
        if (!this.state.userInfo) {
            return (
                <View style={styles.loginBtn}>
                    <TouchableOpacity>
                        <Text onPress={()=>this._Login()}>登录</Text>
                    </TouchableOpacity>
                    <Text> / </Text>
                    <TouchableOpacity>
                        <Text onPress={()=>this._Signin()}>注册</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <Text style={{color: '#fff'}}>
                    {this.state.userInfo.enterprise_name} {this.state.userInfo.customer_name}
                </Text>
            )
        }
    }
    render() {
        return (
            <View>
                {/* 头部 */}
                <View style={styles.trade_header}>
                    {/* 顶部按钮 */}
                    <View style={styles.top_operate}>
                        <View><Text>分享库存</Text></View>
                        <View style={styles.right_operate}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Settings')}>
                                <Image
                                    source={require('../../assets/images/setting.png')}
                                    style={styles.top_icon}
                                    />
                            </TouchableOpacity>
                            <Image source={require('../../assets/images/message.png')} style={styles.top_icon}/>
                        </View>
                    </View>
                    {/* 头像部分 */}
                    <View style={styles.photoBox}>
                        <View style={styles.photoImg}>

                        </View>
                    </View>
                    {/* 用户信息部分 */}
                    <View style={styles.userInfo}>
                        {this._enterpriseName()}
                    </View>
                    {/* 操作 */}
                    <View style={styles.bottom_operate}>
                        <TouchableOpacity style={styles.operate_item}>
                            <Text style={styles.btn_text}>企业机构认证</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.operate_item}>
                            <Text style={[styles.btn_text,styles.btn_border]}>绑定操作员</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.operate_item}>
                            <Text style={styles.btn_text}>我的邀请</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* 账户管理 */}
                <View style={styles.account}>
                    <TouchableOpacity>
                        <View style={styles.account_item}>
                            <View style={styles.account_icons}>
                                <Image
                                    source={require('../../assets/images/bank_account.png')}
                                    style={styles.account_icon} />
                            </View>
                            <Text style={styles.account_btn}>银行账户管理</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.account_item}>
                            <View style={styles.account_icons}>
                                <Image
                                    source={require('../../assets/images/bill_beans.png')}
                                    style={styles.account_icon}/>
                            </View>
                            <Text style={styles.account_btn}>汇票豆账户</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* 待办事项 */}
                <View style={styles.upcoming}>
                    <View style={styles.block_title}>
                        <Text style={styles.block_title_text}>待办事项</Text>
                    </View>
                    <TouchableOpacity>
                        <View style={styles.upcoming_item}>
                            <View style={styles.account_icons}>
                                <Image
                                    source={require('../../assets/images/wait_do.png')}
                                    style={styles.account_icon}/>
                            </View>
                            <Text style={styles.wait_btn}>待确认交易</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.upcoming_item}>
                            <View style={styles.account_icons}>
                                <Image
                                    source={require('../../assets/images/wait_pay.png')}
                                    style={styles.account_icon}/>
                            </View>
                            <Text style={styles.wait_btn}>待支付</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.upcoming_item}>
                            <View style={styles.account_icons}>
                                <Image
                                    source={require('../../assets/images/wait_endorsement.png')}
                                    style={styles.account_icon}/>
                            </View>
                            <Text style={styles.wait_btn}>待背书确认</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.upcoming_item}>
                            <View style={styles.account_icons}>
                                <Image
                                    source={require('../../assets/images/wait_signfor.png')}
                                    style={styles.account_icon}/>
                            </View>
                            <Text style={styles.wait_btn}>待签收</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* 买卖方 */}
                <View style={styles.trade_person}>
                    <View style={styles.seller}>
                        <View style={styles.trade_title}>
                            <Text style={styles.trade_title_text}>我是卖方</Text>
                        </View>
                        <TouchableOpacity>
                            <View style={styles.trade_item}>
                                <View style={styles.account_icons}>
                                    <Image
                                        source={require('../../assets/images/posted_bill.png')}
                                        style={styles.trade_icon}/>
                                </View>
                                <Text style={styles.wait_btn}>发布票据</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.trade_item}>
                                <View style={styles.account_icons}>
                                    <Image
                                        source={require('../../assets/images/myBill.png')}
                                        style={styles.trade_icon}/>
                                </View>
                                <Text style={styles.wait_btn}>我的票据</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.trade_item}>
                                <View style={styles.account_icons}>
                                    <Image
                                        source={require('../../assets/images/order_seller.png')}
                                        style={styles.trade_icon}/>
                                </View>
                                <Text style={styles.wait_btn}>卖方订单</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.seller}>
                        <View style={styles.trade_title}>
                            <Text style={styles.trade_title_text}>我是买方</Text>
                        </View>
                        <TouchableOpacity>
                            <View style={styles.trade_item}>
                                <View style={styles.account_icons}>
                                    <Image
                                        source={require('../../assets/images/myBidding.png')}
                                        style={styles.trade_icon}/>
                                </View>
                                <Text style={styles.wait_btn}>我的竞价</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.trade_item}>
                                <View style={styles.account_icons}>
                                    <Image
                                        source={require('../../assets/images/newOffer.png')}
                                        style={styles.trade_icon}/>
                                </View>
                                <Text style={styles.wait_btn}>发布买票</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.trade_item}>
                                <View style={styles.account_icons}>
                                    <Image
                                        source={require('../../assets/images/order_buyer.png')}
                                        style={styles.trade_icon}/>
                                </View>
                                <Text style={styles.wait_btn}>买方订单</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
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
        borderRadius: 10,
        marginTop: 20
    },
    trade_header: {
        backgroundColor: '#FFCF62',
        height: 200,
        width: windowstyle.width,
    },
    top_operate: {
        color: '#fff',
        width: windowstyle.width,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    right_operate: {
        width: 55,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    top_icon: {
        width: 20,
        height: 20
    },
    photoBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    photoImg: {
        width: 80,
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 100,
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    loginBtn: {
        width: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: '#fff'
    },
    bottom_operate: {
        width: windowstyle.width,
        padding: 8,
        padding: 8,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FEB307'
    },
    operate_item: {
        width: windowstyle.width * 0.33,
        height: 29,
    },
    btn_text: {
        height: 29,
        lineHeight: 29,
        textAlign: 'center',
        color: '#fff'
    },
    btn_border: {
        borderColor: '#fff',
        borderLeftWidth: 1,
        borderRightWidth: 1
    },
    account: {
        width: windowstyle.width,
        height: 86,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 6,
        borderBottomWidth: 10,
        borderColor: '#eee'
    },
    account_item: {
        width: windowstyle.width * 0.5,
        height: 70,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    account_icons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    account_icon: {
        width: 23,
        height: 26
    },
    account_btn: {
        textAlign: 'center',
        color: '#000'
    },
    upcoming: {
        width: windowstyle.width,
        height: 85,
        paddingLeft: 12,
        paddingRight: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 10,
        borderColor: '#eee'
    },
    block_title: {
        width: 56,
        height: 75,
        marginRight: 10
    },
    block_title_text: {
        height: 75,
        lineHeight: 75,
        color: '#000',
        textAlign: 'center',
        fontSize: 14
    },
    upcoming_item: {
        width: (windowstyle.width - 80) * 0.25,
        height: 75,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    wait_btn: {
        textAlign: 'center',
    },
    trade_person: {
        width: windowstyle.width,
        paddingLeft: 12,
        paddingRight: 12,
    },
    seller: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        height: 90,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    trade_title: {
        width: 56,
        height: 90,
        marginRight: 10
    },
    trade_title_text: {
        height: 90,
        lineHeight: 90,
        color: '#000',
        textAlign: 'center',
        fontSize: 14
    },
    trade_item: {
        width: (windowstyle.width - 80) * 0.33,
        height: 90,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    trade_icon: {
        width: 25,
        height: 25
    }
})