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
                    <View>
                        <Text>企业信息</Text>
                        <View>
                            <Text style={{flex:1,justifyContent:'space-between'}}><Text>企业名称</Text><Text>{form.publisher_name}</Text></Text>
                            <Text>历史交易成功率{form.publisher_name}</Text>
                        </View>
                    </View>
                    <View>
                        <Text>票据信息</Text>
                        <Text>票据号{form.bill_number}</Text>
                        <Text>承兑机构{form.bill_acceptor_type_name}</Text>
                        <Text>票面金额[元]{form.bill_sum_price}</Text>
                        <Text>到期日{form.bill_deadline_time}</Text>
                        <Text>承兑人全称{form.bill_acceptor_name}</Text>
                        <Text>票据瑕疵{form.bill_flaw_names.join(',')}</Text>
                        <Text>背书次数{form.bill_endorsement_number}</Text>
                    </View>
                    <View>
                        <Image source={{ uri: form.bill_front_photo_path }} style={styles.billImg}/>
                    </View>
                </View>
            )
        }
    }
    render() {
        const { params } = this.props.navigation.state;
        return (
            <ScrollView style={styles.container}>{this.detail()}</ScrollView>
        );
    }
}

let MainHeight = Dimensions.get('window').height;
let MainWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    item: {
        flex: 1,
        padding: 10,
        height: 203,
        backgroundColor: '#fff',
        marginBottom: 15,
    },
    billImg: {
        width: MainWidth * 0.4,
        height: 200
    }
})
