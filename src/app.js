import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

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
      'pages/feedback/feedback'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#FF9125',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    }
  }

  componentDidMount () {
    Taro.login({
      success(res) {
        if (res.code) {
          // 发起网络请求
          Taro.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=APPSECRET&js_code=CODE&grant_type=authorization_code',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
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
