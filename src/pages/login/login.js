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
      url:'',
      maskName: 'unmask',
      contentName: 'cover',
      maskBg: 'maskBgShow'
    }
  }

  config = {
    navigationBarTitleText: '主注册'
  }
  
  componentWillMount () {
    //向微信获取code并存下来
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

  //获取用户信息被授权后把username储存下来以便注册时发给后端
  onGotUserInfo(e){
    this.setState({
      username: e.detail.userInfo.nickName,
      url: e.detail.userInfo.avatarUrl
    })
  }
  //添加遮罩
  handleSave(){
    this.setState({
      maskName: 'mask',
      contentName: 'uncover',
      maskBg: 'maskBgNone',
    })
  }
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
  //学生登录
  toLogin(){
    const { stdnum, password , code, username, url} = this.state
    var that = this
    //如果学号为空，提醒输入学号
    if(!stdnum){
      Taro.showToast({
        title: "请输入学号",
        icon: "none"
      });
      return;
    }
    //如果密码为空，提醒输入密码
    if(!password){
      Taro.showToast({
        title:'请输入密码',
        icon: 'none'
      })
    }
    Taro.request({
      url:'https://rank.muxixyz.com/api/v1/bind/student',
      method:'POST',
      data:{
        stdnum: stdnum,
        password: password,
        code: code,
        username: username,
        url: url
      },
      success(res){
        //如果200，cookie存本地，转回index页面
        if(res.statusCode === 200){
          Taro.setStorage({
            key:'cookie',
            data: res.header['Set-Cookie']
          })
          Taro.setStorage({
            key:'stdnum',
            data: stdnum
          })
          Taro.setStorage({
            key:'password',
            data: password
          })
          Taro.switchTab({
            url:'../index/index'
          })
          Taro.showToast({
            title:'登录成功'
          })
        }
        //否则告诉用户账号或者密码错误
        if(res.statusCode != 200){
          Taro.showToast({
            title:'账号或密码输入错误，请重新输入',
            icon: 'none',
            duration: 1000
          })
          //向微信获取code并存下来
          Taro.login({
            success(res){
              if (res.code) { 
                that.setState({
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
      }
    })
  }
  //游客登录
  visitorLogin(){
    const { username, url, code } = this.state
    Taro.request({
      url:'https://rank.muxixyz.com/api/v1/bind/visitor',
      method:'POST',
      data:{
        code: code,
        username: username,
        url: url
      },
      success(res){
        if(res.statusCode === 200){
          Taro.setStorage({
            key:'cookie',
            data: res.header['Set-Cookie']
          })
          Taro.switchTab({
            url:'../index/index'
          })
          Taro.showToast({
            title:'登录成功'
          })
        }
        else if(res.statusCode !== 200){
          Taro.showToast({
            title:'网络错误，请重新尝试',
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  }


  render() {
    const {contentName, maskBg, maskName} = this.state
    return (
    <View className={contentName}>
      <Image
        className='icon'
        src={require("../../assets/png/logo.png")} 
      />
      <Form className='formLogin'>
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
        <Button className='loginBtn' onClick={this.visitorLogin.bind(this)}>
          游客登录
        </Button>
      </View>
      <View className={maskBg}></View>
      <View className={maskName}>
        <Image   src={require("../../assets/png/welcome.png")} />
        <View className='rank'>欢迎来到华师rank小程序</View>
        <View className='welcome'>Welcome!</View>
        <Button
          open-type='getUserInfo' 
          lang='zh_CN' 
          onGetUserInfo={this.onGotUserInfo.bind(this)}
          onClick={this.handleSave.bind(this)}
        >
        点我授权
        </Button>
      </View>
    </View>
    )
  }
}
