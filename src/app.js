import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import Fetch from './common/require2'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/login/login',
      'pages/my/my',
      'pages/help/help',
      'pages/feedback/feedback',
      'pages/rankLib/rankLib',
      'pages/rankPer/rankPer',
      'pages/rankCollege/rankCollege',
      'pages/people/people',
      'pages/libLogin/libLogin',
      'pages/rankDept/rankDept',
      'pages/visitorlogin/visitorlogin'
    ],
    tabBar: {
      list: [
        {
          pagePath: "pages/index/index",
          text: "首页",
          iconPath:'./assets/png/unhome.png',
          selectedIconPath:'./assets/png/home.png'
        },
        {
          pagePath: "pages/my/my",
          text: "我的",
          iconPath:'./assets/png/unmy.png',
          selectedIconPath:'./assets/png/my.png'
        }
      ]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#FF9125',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white',
      backgroundColor: '#EFEFF4'
    }
  }

  componentDidMount () {
    //获取code并把code发给后端
    Taro.login({
      success(res){
        if(res.code){
          Taro.request({
            url:'https://rank.muxixyz.com/api/v1/login/',
            data:{
              code:res.code
            },
            method: 'POST',
            success(res){
              //如果200说明已经注册过了只是session过期，那就储存session并且登陆成功
              if(res.statusCode === 200){
                Taro.setStorage({
                  key:'cookie',
                  data: res.header['Set-Cookie']
                })
                
                if(res.data.department_id !== 25){
                  if(!Taro.getStorageSync('stdnum') || !Taro.getStorageSync('password')){
                    Taro.redirectTo({
                        url:'../libLogin/libLogin'
                    })
                  }
                }
              }
              //否则就跳转到注册界面注册
              if(res.statusCode != 200)
              {
                Taro.redirectTo({
                  url:'../login/login'
                })
              }
            }
          })
        }
      }
    })
    Fetch(
      'api/v1/users/lib/',
      {
        stdnum: Taro.getStorageSync('stdnum'),
        password: Taro.getStorageSync('password')
      },
      'POST'
    )
    //判断微信运动是否授权，如果没有授权就去授权
    Taro.getSetting({
      success(res){
        if (res.authSetting['scope.werun']) {
          Taro.getWeRunData({
            success(res){
              //已经授权的基础上获取数据，将数据后发给后端
              Fetch(
                'api/v1/werun/',
                {
                  encryptedData: res.encryptedData,
                  iv: res.iv
                },
                'POST'
              )
            }
          })
        } 
      }
    })
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
