import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import MyButton from '../../component/common/MyButton';
import BillList from '../../component/common/BillList';
import BillDetail from '../../component/common/BillDetail';

import Swiper from 'react-native-swiper';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      texts: '张三',
      age: 20,
      billList: [],
      userInfo: ''
    };
  }
  async getBillList() {
    fetch('https://www.huipiaoxian.com/gateway/bills/billProduct/list?n=10', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
    }).then((response) => response.json()).then((responseJson) => {
      if (responseJson) {
        this.setState({
          billList: responseJson.data.listName
        })
      }
    })
  }

  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => {
      this.getBillList();
    });
  }

  fn(id) {
    let userInfo = AsyncStorage.getItem('userInfo').then((values) => {
      this.setState({
        userInfo: values
      })
      if (!this.state.userInfo) {
        alert('请先登录')
        return false
      }
      this.props.navigation.navigate('BillDetail', {id: id});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Swiper style={styles.wrapper} showsButtons={true}>
            <View style={styles.slide1}>
              <Text style={styles.text}>Hello Swiper</Text>
            </View>
            <View style={styles.slide2}>
              <Text style={styles.text}>Beautiful</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.text}>And simple</Text>
            </View>
          </Swiper>
          <View style={styles.mainContent}>
            <View style={styles.blockTitle}>
              <Text>最新票源</Text>
              <TouchableOpacity>
                <Text onPress={() => { this.props.navigation.navigate('MarketPage') }}>查看更多></Text>
              </TouchableOpacity>
            </View>
            <BillList data={this.state.billList} fn={this.fn.bind(this)}/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  mainContent: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 10
  },
  blockTitle: {
    height: 28,
    lineHeight: 28,
    color: '#666',
    fontSize: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    height: 160
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});
