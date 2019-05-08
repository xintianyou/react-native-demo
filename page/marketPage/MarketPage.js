import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Button, Alert, FlatList, AsyncStorage, RefreshControl } from 'react-native';
import MyButton from '../../component/common/MyButton';
import BillList from '../../component/common/BillList';

export default class MarketPage extends React.Component {
  static navigationOptions = ({navigation}) => {
    let headerRight = (
      <Button title="Info" />
    );
    return {
      title: '票据商城',
      headerRight: headerRight
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      texts: '张三',
      age: 20,
      billList: [],
      isRefreshing: false
    };
  }
  onPressButton() {
    Alert.alert(this.state.texts)
  }

  async getBillList() {
    fetch('https://www.huipiaoxian.com/gateway/bills/billProduct/list?n=20', {
      //请求方式，GET或POST
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
    }).then((response) => response.json()).then((responseJson) => {
      if (responseJson) {
        this.setState({
          billList: responseJson.data.listName,
          isRefreshing: false,
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
  _onRefresh = () => {
    this.setState({ isRefreshing: true }, () => {
      this.getBillList()
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffffff"
            />
          }>
          <View style={styles.mainContent}>
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
  input: {
    height: 50,
  },
  button: {
    height: 50,
    backgroundColor: '#ffb307'
  },
  buttonText: {
    textAlign: "center",
    lineHeight: 50,
    fontSize: 20,
    color: '#fff'
  }
});
