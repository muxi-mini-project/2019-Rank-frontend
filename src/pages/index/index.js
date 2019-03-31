import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

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
        <navigator url='../rankCollegeDay/rankCollegeDay'>学院运动榜</navigator>
        <navigator url='../login/login'>登录</navigator>
        <navigator url='../test/test'>测试</navigator>
      </View>
    )
  }
}
