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
      // 'pages/help/help',
      'pages/feedback/feedback',
      'pages/rankLib/rankLib',
      'pages/rankPer/rankPer',
      'pages/rankCollege/rankCollege',
      // 'pages/rankCollegeMonth/rankCollegeMonth',
      'pages/people/people',
      'pages/libLogin/libLogin',
      
    ],
    tabBar: {
      list: [
        {
          pagePath: "pages/index/index",
          text: "首页"
        },
        {
          pagePath: "pages/my/my",
          text: "我的"
        }
      ]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#FF9125',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    }
  }

  componentDidMount () {
    Taro.request({
      url:'http://47.103.103.195:5000/api/v1/users/lib/',
      data:{
        stdnum: Taro.getStorageSync('stdnum'),
        password: Taro.getStorageSync('password')
      },
      method:'POST'
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
