import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';
import Fetch from '../../common/require'

export default class Index extends Component {
  state = {
    code:'',
    id:'',
    openid:'',
    stdnum:'',
    departemnt_id:'',
    departemnt_name:'',
    username:'',
    qq:'',
    show_stdnum:'',
    show_qq:'',
    booknum:'',
    likes:''
  };
  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () {
    //判断本地是否缓存有token
    Taro.getStorage({
      key: 'token',
      //如果成功的话显示登陆成功，然后就可以正常使用
      success(){
        Taro.showToast({
          title:'登录成功',
          icon: 'none',
          duration: 1000
        })
      },
      //如果失败的话获取code并把code发送后端看是什么返回结果
      fail(){
        //获取code并把code存到code这个变量中
        Taro.login({
          success(res) {
            if (res.code) {
              this.setState({
                code: res.code
              })
              console.log('登录成功！')
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
        // post方法把code传给后端
        Fetch(
          'login',
          {
            code: this.state.code
          },
          'POST'
        ).then(res =>{
          //返回200则表示登陆成功，获取用户信息(包括openid和token)
          if(res.statusCode === 200){
            this.setState({
              id: res.data.id,
              openid: res.data.openid,
              stdnum: res.data.stdnum,
              departemnt_id: res.data.departementid,
              username: res.data.username,
              qq: res.data.qq,
              show_stdnum: res.data.show_stdnum,
              show_qq: res.data.show_qq,
              booknum: res.data.booknum,
              likes: res.data.likes
            })
            //把token存到本地
            Taro.setStorageSync("token", res.header['Set-Cookie']);
            //显示登陆成功
            Taro.showToast({
              title:'登录成功',
              icon: 'none',
              duration: 1000
            });
            Taro.switchTab({
              url: '/pages/index/index'
            });
          }else if(res.statusCode === 400){
          //返回400错误即显示code错误
            Taro.showToast({
              title:'code error',
              icon:'none',
              duration:1000
            })
          }else if(res.statusCode === 401){
            //返回401错误即该用户没有注册过需要注册，显示错误并跳转到注册页面
            Taro.showToast({
              title:'you need to register',
              icon:'none',
              duration:1000
            })
            //跳转到login页面，表示此时需要注册
            Taro.redirectTo({
              url:'../login/login'
            })
          }
        })
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  render() {
    return (
      <View className='index'>
        <navigator url='../feedback/feedback'>反馈与帮助</navigator>
        <navigator url='../my/my'>我的</navigator>
        <navigator url='../rankLib/rankLib'>学霸排行榜</navigator>
        <navigator url='../rankPer/rankPer'>运动健将榜</navigator>
        <navigator url='../rankCollege/rankCollege'>学院运动榜</navigator>
        <navigator url='../login/login'>登录</navigator>
        <navigator url='../test/test'>测试</navigator>
      </View>
    )
  }
}
