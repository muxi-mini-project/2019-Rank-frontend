import Taro, { Component } from '@tarojs/taro';
import { View, Form, Input, Button, Image} from '@tarojs/components';
import './libLogin.scss';
import Fetch from '../../common/require2';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      stdnum:'',
      password:''
    }
  }

  config = {
    navigationBarTitleText: 'lib注册'
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
    const { stdnum, password } = this.state
    
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
    //把账号和密码发送给后端便于后端去学校官网获取书籍借阅本数
    Fetch(
      'api/v1/users/lib/',
      {
        stdnum: stdnum,
        password: password
      },
      'POST'
    )
      //如果成功了就显示“登陆成功”
      .then(data =>{
        if(data){
          Taro.setStorage({
            key:'stdnum',
            data: stdnum
          })
          Taro.setStorage({
            key:'password',
            data: password,
            success(){
              Taro.showToast({
                title:'登录成功'
              })
              Taro.switchTab({
                url:'../index/index'
              })  
            }
          })
        }
      })
      .then(statusCode =>{
        //如果账号密码错误就显示“账号密码错误”
        if(statusCode === 400){
          Taro.showToast({
            title:'账号或密码输入错误',
            icon:'none'
          })
        }
        //如果因为某些原因返回了500，那就弹出提示框显示请求错误
        //如果点击重新尝试那会回到页面中，可通过点击注册按钮重新尝试
        //如果点击确定那会直接进入到首页，取消此次账号密码的获取（放弃本次图书借阅本书的数据更新）
        if(statusCode === 500){
          Taro.showModal({
            title: '错误',
            content: '请求错误',
            confirmText:'确定',
            cancelText:'重新尝试',
            success(res) {
              if (res.confirm) {
                Taro.switchTab({
                  url:'../index/index'
                })
              } 
            }
          })
        }
      })
  }
  
  render() {
    const {stdnum, password} = this.state
    return (
    <View>
      <Image
        className='icon'
        src={require("../../assets/png/logo.png")} 
      />
      <Form className='login'>
        <View className='username'>
            <View>学号：</View>
            <Input 
              placeholderClass='placeholder'
              type='number'
              placeholder='请输入你的学号'
              value={stdnum}
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
              value={password}
              onInput={this.changePassword}
              onChange={this.changePassword}
              password='true'
            />
        </View>
        <View className='tips'>*请输入一站式服务的学号和对应的密码</View>
      </Form>
      <View>
        <Button onClick={this.toLogin.bind(this)}>
          注册
        </Button>
      </View>
    </View>
    )
  }
}
