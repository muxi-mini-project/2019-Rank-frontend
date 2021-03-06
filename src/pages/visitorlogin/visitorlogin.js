import Taro, { Component } from '@tarojs/taro';
import { View, Input, Button, Image} from '@tarojs/components';
import './visitorlogin.scss';

export default class Visitorlogin extends Component {
  constructor(props){
    super(props);
    this.state = {
      stdnum:'',
      password:'',
      code:''
    }
  }

  config = {
    navigationBarTitleText: '学号绑定'
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
    const { stdnum, password, code } = this.state
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
      url:'https://rank.muxixyz.com/api/v1/rebind/student',
      method:'POST',
      data:{
        stdnum: stdnum,
        password: password,
        code: code
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

  render() {
    return (
    <View>
      <Image
        className='icon'
        src={require("../../assets/png/logo.png")} 
      />
      <View className='login'>
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
      </View>
      <View>
        <Button onClick={this.toLogin.bind(this)}>
          注册
        </Button>
      </View>
    </View>
    )
  }
}
