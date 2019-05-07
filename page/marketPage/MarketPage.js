import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Button, Alert, FlatList, AsyncStorage } from 'react-native';
import MyButton from '../../component/common/MyButton';
import BillList from '../../component/common/BillList';

export default class MarketPage extends React.Component {
  static navigationOptions = ({navigation}) => {
    let headerRight = (
      <Button title="Info" />
    );
    return {
      headerRight: headerRight
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      texts: '张三',
      age: 20,
      billList: []
    };
  }
  onPressButton() {
    Alert.alert(this.state.texts)
  }

  async getBillList() {
    // Alert.alert('请求数据')
    fetch('https://www.huipiaoxian.com/gateway/bills/billProduct/list?n=50', {
      //请求方式，GET或POST
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
