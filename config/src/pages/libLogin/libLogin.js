import Taro, { Component } from '@tarojs/taro';
import { View, Form, Input, Button, Image} from '@tarojs/components';
import './libLogin.scss';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      stdnum:'',
      password:''
    }
  }

  config = {
    navigationBarTitleText: '注册'
  }
  
  componentWillMount () { }

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
    var that = this
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
    Taro.request({
        url:'https://rank.muxixyz.com/api/v1/users/lib/',
        data:{
          stdnum: that.state.stdnum,
          password: that.state.password
        },
        header:{
            'cookie': Taro.getStorageSync('cookie')
        },
        method:'POST',
        success(res){
          if(res.statusCode === 200){
            Taro.setStorage({
              key:'stdnum',
              data: that.state.stdnum
          })
          Taro.setStorage({
              key:'password',
              data: that.state.password,
              success(){
                Taro.switchTab({
                url:'../index/index'
              })  
            }
          })
          }
          if(res.statusCode != 200){
            Taro.showToast({
              title:'账号或密码输入错误',
              icon:'none'
            })
          }
        }
    })
  }
  
  render() {
    return (
    <View className={this.state.content_name}>
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
              type='text'
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
      </View>
    </View>
    )
  }
}
