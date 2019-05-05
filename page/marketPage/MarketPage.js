import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Button, Alert, FlatList } from 'react-native';
import MyButton from '../../component/common/MyButton';
import BillList from '../../component/common/BillList';

export default class MarketPage extends Component {
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
    fetch('https://www.huipiaoxian.com/gateway/bills/billProduct/list?n=10', {
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
    this.getBillList()
  }

  fn(id) {
    this._billDetail(id)
  }
  _billDetail(id) {
    Alert.alert(id)
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <TextInput
          style={ styles.input }
          defaultValue={ this.state.texts }
          placeholder="请输入"
          onChangeText={(ss) => this.setState({texts: ss})}
        />
        <MyButton title="ss" onPressButton={this.onPressButton.bind(this)}/> */}
        <BillList data={this.state.billList} fn={this.fn.bind(this)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
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
