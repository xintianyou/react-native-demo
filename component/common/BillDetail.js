import React, { Component } from 'react';
import { Dimensions, AsyncStorage, TextInput, StyleSheet, Text, TouchableOpacity, View, Button, Alert, Image, ScrollView, ActivityIndicator } from 'react-native';

export default class BillDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: null,
            userInfo: null
        }
    }
    
    componentDidMount() {
        let userInfo = AsyncStorage.getItem('userInfo').then((values) => {
            this.setState({
                userInfo: JSON.parse(values)
            })
            this.getBillDetail();
        });
    }
    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        return {
            title: `票据详情 ID:${state.params.id}`,
        }
    };
    async getBillDetail() {
        if (!this.state.userInfo) {
            alert('请先登录')
        }
        const { params } = this.props.navigation.state;
        fetch(`https://www.huipiaoxian.com/gateway/bills/billProduct/${params.id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.state.userInfo.token
            }
        }).then((response) => response.json()).then((responseJson) => {
            if (responseJson) {
                this.setState({
                    form: responseJson.data
                })
                this.detail()
            }
        })
    }
    //票据详细信息渲染
    detail() {
        let form = this.state.form;
        if (!form) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        } else {
            return (
                <View>
                    <View style={styles.blockContent}>
                        <View style={styles.blockTitle}>
                            <Text style={styles.titleText}>企业信息</Text>
                        </View>
                        <View>
                            <View style={styles.contentLine}>
                                <Text style={styles.span}>企业名称</Text>
                                <Text style={styles.span}>{form.publisher_name}</Text>
                            </View>
                            <View style={styles.contentLine}>
                                <Text style={styles.span}>历史交易成功率</Text>
                                <Text style={styles.span}>100%</Text>
                            </View>
                            <View style={styles.contentLine}>
                                <Text style={styles.span}>平均背书时长</Text>
                                <Text style={styles.span}>5分23秒</Text>
                            </View>
                            <View style={styles.lastContentLine}>
                                <TouchableOpacity>
                                    <Button title="查看该企业全部库存票"></Button>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.blockContent}>
                        <View style={styles.blockTitle}>
                            <Text style={styles.titleText}>票据信息</Text>
                        </View>
                        <View>
                            <View style={styles.contentLine}>
                                <Text style={styles.span}>票据号</Text>
                                <Text style={styles.span}>{form.bill_number}</Text>
                            </View>
                            <View style={styles.contentLine}>
                                <Text style={styles.span}>承兑机构</Text>
                                <Text style={styles.span}>{form.bill_acceptor_type_name}</Text>
                            </View>
                            <View style={styles.contentLine}>
                                <Text style={styles.span}>票面金额[元]</Text>
                                <Text style={styles.span}>{form.bill_sum_price}</Text>
                            </View>
                            <View style={styles.contentLine}>
                                <Text style={styles.span}>到期日</Text>
                                <Text style={styles.span}>{form.bill_deadline_time}</Text>
                            </View>
                            <View style={styles.contentLine}>
                                <Text style={styles.span}>承兑人全称</Text>
                                <Text style={styles.span}>{form.bill_acceptor_name}</Text>
                            </View>
                            <View style={styles.contentLine}>
                                <Text style={styles.span}>票据瑕疵</Text>
                                <Text style={styles.span}>{form.bill_flaw_names.join(',')}</Text>
                            </View>
                            <View style={styles.contentLine}>
                                <Text style={styles.span}>被书次数</Text>
                                <Text style={styles.span}>{form.bill_endorsement_number}</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',paddingLeft: 15,paddingRight: 15, paddingTop: 10, paddingBottom: 10, backgroundColor: '#fff', marginBottom: 5}}>
                                <Image source={{ uri: form.bill_front_photo_path }} style={styles.billImg}/>
                                <Image source={{ uri: form.bill_back_photo_path1 }} style={styles.billImg}/>
                            </View>
                            <View style={[styles.contentLine, {borderBottomWidth: 0}]}>
                                <Text style={styles.span}>票据状态</Text>
                                <Text style={styles.span}>{form.bill_status_name}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.blockContent}>
                        <View style={styles.blockTitle}>
                            <Text style={styles.titleText}>交易信息</Text>
                        </View>
                        <View>
                            <View style={styles.contentLine}>
                                <Text style={styles.span}>期望利率</Text>
                                <Text style={styles.span}>{form.hope_rate}</Text>
                            </View>
                            <View style={styles.contentLine}>
                                <Text style={styles.span}>每十万加[元]</Text>
                                <Text style={styles.span}>{form.hope_every_plus}</Text>
                            </View>
                            <View style={styles.contentLine}>
                                <Text style={styles.span}>期望贴现额[元]</Text>
                                <Text style={styles.span}>{form.bill_hope_deal_price}</Text>
                            </View>
                            <View style={styles.contentLine}>
                                <Text style={styles.span}>竞价方式</Text>
                                <Text style={styles.span}>{form.bidding_mode_name}</Text>
                            </View>
                            <View style={styles.contentLine}>
                                <Text style={styles.span}>发布期限</Text>
                                <Text style={styles.span}>T+{form.trade_appoint_day}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.blockContent}>
                        <View style={styles.blockTitle}>
                            <Text style={styles.titleText}>报价信息</Text>
                        </View>
                        <View>
                            
                        </View>
                    </View>
                    <TouchableOpacity style={styles.buyBtn}>
                        <Text style={styles.btnText}>我要购买</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <ScrollView>{this.detail()}</ScrollView>
            </View>
        );
    }
}

let MainHeight = Dimensions.get('window').height;
let MainWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    blockContent: {
        marginBottom: 15
    },
    blockTitle: {
        height: 48,
        backgroundColor: '#fff',
        marginBottom: 5
    },
    titleText: {
        color: '#1C1F33',
        fontSize: 16,
        lineHeight: 48,
    },
    contentLine: {
        height: 48,
        paddingLeft: 15,
        paddingRight: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#d5d5d5',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    lastContentLine: {
        height: 48,
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#fff',
    },
    span: {
        lineHeight: 48
    },
    
    billImg: {
        width: MainWidth * 0.4,
        height: 120
    },
    buyBtn: {
        height: 54,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#ffb307',
    },
    btnText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center'
    }
})
