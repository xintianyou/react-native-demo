import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Button, Alert, Image, FlatList, ActivityIndicator, AsyncStorage } from 'react-native';
import moment from 'moment';
import calc from 'calculatorjs';

export default class BillList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null
        }
    }
    
    renderRow(rowData) {
        if (!this.props.data.length) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        } else {
            return (
                <View style={[styles.item, rowData.bidding_mode == 3210 ? styles.borderBlue : styles.borderYellow]}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={[styles.biddingMode, rowData.bidding_mode == 3210 ? styles.borderBlueSma : styles.borderYellowSma, rowData.acceptor_type_id != 407 && rowData.acceptor_type_id != 408 ? styles.hide : '']}>
                            {rowData.acceptor_type_id == 407 ? '财票' : (rowData.acceptor_type_id == 408 ? '商票' : '')}
                        </Text>
                        <Text style={[styles.biddingMode, rowData.bidding_mode == 3210 ? styles.borderBlueSma : styles.borderYellowSma]}>
                            {rowData.bidding_mode == 3210 ? '一口价' : '自由竞价'}
                        </Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: "space-between"}}>
                        <Text style={styles.row}>
                            <Text>票面金额: </Text>
                            <Text style={styles.hpxRedTips}>{calc.div(rowData.bill_sum_price, 10000)}万</Text>
                        </Text>
                        <Text style={styles.row}>{moment(rowData.bill_product_create_time).format('MM-DD HH:mm')}</Text>
                    </View>
                    <Text style={styles.row} numberOfLines={1}>承兑机构: {rowData.acceptor_name}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between" }}>
                        <Text style={styles.row}>到期时间: {rowData.bill_deadline_time_format}</Text>
                        <TouchableOpacity style={rowData.bill_status_code == 801 ? styles.button : styles.disableButton}>
                            <Text
                                style={styles.buttonText}
                                onPress={() => this.bidding(rowData.bill_status_code, JSON.stringify(rowData.bill_product_id))}
                            >
                                { this.getBtnText(rowData.drawer_id, rowData.bill_status_code) }
                                </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

    bidding(status, id) {
        if (status != 801) {
            return false
        }
        this.props.fn(id)
    }
    componentDidMount() {
        AsyncStorage.getItem('userInfo').then((values) => {
            this.setState({
                userInfo: JSON.parse(values)
            })
        });
    }
    getBtnText(drawer_id, status) {
        return status == 801 ? '我要买' : (status >= 804 && status < 810 ? '交易中' : '交易完成') 
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.data}
                    renderItem={({ item }) => this.renderRow(item)}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}
let MainHeight = Dimensions.get('window').height;
let MainWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    item: {
        paddingBottom: 10,
        backgroundColor: '#fff',
        marginBottom: 15,
        borderRadius: 6
    },
    row: {
        paddingLeft: 10,
        paddingRight: 10,
        height: 28,
        lineHeight: 28
    },
    borderYellow: {
        borderTopColor: '#ffb307',
        borderTopWidth: 1
    },
    borderBlue: {
        borderTopColor: '#085AFF',
        borderTopWidth: 1
    },
    biddingMode: {
        borderWidth: 1,
        borderTopLeftRadius: 6,
        borderBottomRightRadius: 6,
        borderColor: '#ffb307',
        borderTopWidth: 0,
        width: 70,
        paddingLeft: 5,
        paddingRight: 5,
        textAlign: 'center',
        marginRight: 10,
        marginTop: -1
    },
    borderYellowSma: {
        borderColor: '#ffb307',
        color: '#ffb307'
    },
    borderBlueSma: {
        borderColor: '#085AFF',
        color: '#085AFF'
    },
    hide: {
        display: 'none'
    },
    hpxRedTips: {
        color: 'red',
        fontSize: 18
    },
    button: {
        height: 26,
        backgroundColor: '#fff',
        borderColor: 'red',
        borderWidth: 1,
        marginRight: 10,
        marginTop: 2,
        borderRadius: 4,
        paddingLeft: 12,
        paddingRight: 12,
    },
    disableButton: {
        borderWidth: 0,
        marginRight: 10,
    },
    buttonText: {
        height: 26,
        lineHeight: 22,
        color: 'red',
    }
})
