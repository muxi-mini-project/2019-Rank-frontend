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
      mask_name: 'unmask',
      content_name: 'cover',
      mask_bg: 'mask_bg_show'
    }
  }

  config = {
    navigationBarTitleText: '注册'
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
  
  toLogin(){
    const { stdnum, password } = this.state
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
    //把学号、密码以及微信昵称和code发送给后端
    // Fetch(
    //   'api/v1/bind/',
    //   {
    //     stdnum: stdnum,
    //     password: password,
    //     code: code,
    //     username: username,
    //     url: url
    //   },
    //   'POST'
    // )
      // .then(data =>{
      //   if(data){
      //     Taro.setStorage({
      //       key:'cookie',
      //       data: data.header['Set-Cookie']
      //     })
      //     Taro.setStorage({
      //       key:'stdnum',
      //       data: stdnum
      //     })
      //     Taro.setStorage({
      //       key:'password',
      //       data: password
      //     })
      //     Taro.switchTab({
      //       url:'../index/index'
      //     })
      //     Taro.showToast({
      //       title:'登录成功'
      //     })
      //   }
      // })
      // .then(statusCode =>{
      //   if(statusCode){
      //     Taro.showToast({
      //       title:'账号或密码输入错误，请重新输入',
      //       icon: 'none',
      //       duration: 1000
      //     })
      //     Taro.login({
      //       success(res){
      //         if (res.code) { 
      //           that.setState({
      //             code: res.code
      //           })
      //         } else {
      //           Taro.showToast({
      //             title:'获取code失败，请联系开发者',
      //             icon: 'none',
      //             duration: 1000
      //           })
      //         }
      //       }
      //     })
      //   }
      // })

    Taro.request({
      url:'https://rank.muxixyz.com/api/v1/bind/',
      method:'POST',
      data:{
        stdnum: this.state.stdnum,
        password: this.state.password,
        code: this.state.code,
        username: this.state.username,
        url: this.state.url
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
  //获取用户信息被授权后把username储存下来以便注册时发给后端
  onGotUserInfo(e){
    this.setState({
      username: e.detail.userInfo.nickName,
      url: e.detail.userInfo.avatarUrl
    })
  }

  handleSave(){
    this.setState({
      mask_name: 'mask',
      content_name: 'uncover',
      mask_bg: 'mask_bg_none',
    })
  }
  render() {
    const {content_name, mask_bg, mask_name} = this.state
    return (
    <View className={content_name}>
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
      <View className={mask_bg}></View>
      <View className={mask_name}>
        <Image></Image>
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
