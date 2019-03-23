import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Label, Button } from '@tarojs/components'
import './login.scss'

export default class Login extends Component {
  state = {
    loginNumber = "",
    password = ""
  }

  config = {
    navigationBarTitleText: '登录'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  changeLoginNumber(e){
    this.setState({
      loginNumber: e.detail.value
    });
  }
  changePassword(e){
    this.setState({
      password: e.detail.value
    })
  }

  render() {
    return (
        <Form className = "form_login">
            <View className = "username">
                <Label>学号：</Label>
                <Input 
                placeholderClass = "placeholder"
                type = "number"
                placeholder = "请输入你的学号"
                value = {loginNumber}
                onInput = {this.changeLoginNumber}
                onChange = {this.changeLoginNumber}/>
            </View>
            <View className = "passcode">
                <Label>密码：</Label>
                <Input 
                placeholderClass = "placeholder"
                type = "number"
                placeholder = "请输入你的密码"
                value = {password}
                onInput = {this.changePassword}
                onChange = {this.changePassword}/>
            </View>
            <View className = "tips">*请输入一站式服务的学号和对应的密码</View>
            <View>
              <Button className = "loginBtn" onClick = {this.toLogin}>
                登录
              </Button>
            </View>
        </Form>
    )
  }
}
