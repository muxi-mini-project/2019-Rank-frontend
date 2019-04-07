import Taro, { Component } from '@tarojs/taro';
import { View, Form, Input, Label, Button } from '@tarojs/components';
import './login.scss';
import Fetch from '../../common/require'

export default class Login extends Component {
  state = {
    stdnum:'',
    password:'',
    code:'',
    username:'',
  }

  config = {
    navigationBarTitleText: '登录'
  }

  componentWillMount () { }

  componentDidMount () {
    //获取用户信息的授权函数
    Taro.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          Taro.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序使用获取用户信息功能，后续调用 Taro.getUserInfo 接口不会弹窗询问
              Taro.getUserInfo()
            }
          })
        }
      }
    })
    //获取用户微信运动步数的授权函数
    Taro.getSetting({
      success(res) {
        if (!res.authSetting['scope.werun']) {
          Taro.authorize({
            scope: 'scope.werun',
            success() {
              // 用户已经同意小程序获取微信运动步数功能，后续调用 wx.getWeRunData 接口不会弹窗询问
              Taro.getWeRunData()
            }
          })
        }
      }
    })
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  //记录学号的值
  changeLoginNumber(e){
    this.setState({
      stdnum: e.detail.value
    });
  }
  //记录密码的值
  changePassword(e){
    this.setState({
      password: e.detail.value
    })
  }
  
  toLogin(){
    //如果学号为空，提醒输入学号
    if(!this.state.stdnum){
      Taro.showToast({
        title: "请输入学号",
        icon: "none"
      });
      return;
    }
    //如果密码为空，提醒输入密码
    if(!this.state.password){
      Taro.showToast({
        title:'请输入密码',
        icon: 'none'
      })
    }
    //把学号、密码以及微信昵称和code发送给后端
    Fetch(
      'bind',
      {
        stdnum: this.state.stdnum,
        password: this.state.password,
        code: this.state.code,
        username: this.state.username
      },
      'POST'
    ).then(res =>{
      //如果学号密码正确，（把token缓存到本地）然后跳转到首页
      if(res.statusCode === 200){
        Taro.redirectTo({
          url:'../index/index'
        })
      }
      //如果学号或者密码不正确显示不正确，要求重新输入
      else{
        Taro.showToast({
          title:'账号或密码输入错误，请重新输入',
          icon: 'none',
          duration: 1000
        });
      }
    })
  }

  render() {
    return (
        <Form className='form_login'>
            <View className='username'>
                <Label>学号：</Label>
                <Input 
                  placeholderClass='placeholder'
                  type='number'
                  placeholder='请输入你的学号'
                  value={this.state.stdnum}
                  onInput={this.changeLoginNumber}
                  onChange={this.changeLoginNumber}/>
            </View>
            <View className='passcode'>
                <Label>密码：</Label>
                <Input 
                  placeholderClass='placeholder'
                  type='number'
                  placeholder='请输入你的密码'
                  value={this.state.password}
                  onInput={this.changePassword}
                  onChange={this.changePassword}/>
            </View>
            <View className='tips'>*请输入一站式服务的学号和对应的密码</View>
            <View>
              <Button className='loginBtn' onClick={this.toLogin}>
                登录
              </Button>
            </View>
        </Form>
    )
  }
}
