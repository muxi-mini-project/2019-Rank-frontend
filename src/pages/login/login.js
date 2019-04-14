import Taro, { Component } from '@tarojs/taro';
import { View, Form, Input, Button, Image} from '@tarojs/components';
import './login.scss';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      stdnum:'',
      password:'',
      code:'',
      username:'',
    }
  }

  config = {
    navigationBarTitleText: '注册'
  }
  
  componentWillMount () {
    Taro.login({
      success:res => {
        if (res.code) { 
          this.setState({
            code: res.code
          })
        } else {
          Taro.showToast({
            title:'获取code失败，请联系开发者',
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
   }

  componentDidMount () { }

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
    Taro.request({
      url:'http://67.216.199.87:5000/api/v1/bind/',
      method:'POST',
      data:{
        stdnum: this.state.stdnum,
        password: this.state.password,
        code: this.state.code,
        username: this.state.username
      },
      success(res){
        //如果200，cookie存本地，转回index页面
        if(res.statusCode === 200){
          Taro.setStorage({
            key:'cookie',
            data: res.header['Set-Cookie']
          })
          Taro.navigateTo({
            url:'../index/index'
          })
        }
        //否则告诉用户账号或者密码错误
        else{
          Taro.showToast({
            title:'账号或密码输入错误，请重新输入',
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  }
  
  getUserInfo(){
    Taro.getUserInfo({
      success: res=>{
        this.setState({
          username: res.userInfo.nickName
        })
      }
    })
  }

  


  

  render() {
    return (
    <View>
      <Image
        className='icon'
        src={require("../../assets/png/logo.png")} 
      />
      <Form className='form_login'>
        <View className='username'>
            <View>学号：</View>
            <Input 
              placeholderClass='placeholder'
              type='number'
              placeholder='请输入你的学号'
              value={this.state.stdnum}
              onInput={this.changeLoginNumber}
              onChange={this.changeLoginNumber}
            />
        </View>
        <View className='passcode'>
            <View>密码：</View>
            <Input 
              placeholderClass='placeholder'
              type='number'
              placeholder='请输入你的密码'
              value={this.state.password}
              onInput={this.changePassword}
              onChange={this.changePassword}
              password='true'
            />
        </View>
        <View className='tips'>*请输入一站式服务的学号和对应的密码</View>
      </Form>
      <View>
        <Button className='loginBtn' onClick={this.toLogin.bind(this)}>
          注册
        </Button>
        <Button
          open-type='getUserInfo'
          lang='zh_CN'
          onClick={this.getUserInfo.bind(this)}
        />
      </View>
    </View>
    )
  }
}
