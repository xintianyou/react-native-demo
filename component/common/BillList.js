import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Button, Alert, Image, FlatList } from 'react-native';

export default class BillList extends Component {
    constructor(props) {
        super(props);
    }
    
    renderRow(rowData) {
        if (!this.props.data.length) {
            return (
                <Text>loading...</Text>
            )
        } else {
            return (
                <TouchableOpacity
                    onPress={()=>this.props.fn(JSON.stringify(rowData.bill_product_id))}
                >
                    <View style={styles.item}>
                        <Text>票面金额: {rowData.bill_sum_price}</Text>
                        <Text>承兑机构: {rowData.acceptor_name}</Text>
                        <Text>发布时间: {rowData.bill_product_create_time}</Text>
                        <Text>到期时间: {rowData.bill_deadline_time_format}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    componentDidMount() {
        // Alert.alert(typeof this.props.data)
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
        flex: 1,
        marginBottom: 15,
        backgroundColor: '#F5F7FA',
    },
    item: {
        // flex: 1,
        width: MainWidth * 0.9,
        marginLeft: MainWidth * 0.05,
        padding: 10,
        height: 120,
        backgroundColor: '#fff',
        marginBottom: 15,
        borderRadius: 4
    },
})
