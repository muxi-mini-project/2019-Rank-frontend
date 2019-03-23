import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
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

  render () {
    return (
      <View className='index'>
        <navigator url="../rankLib/rankLib">学霸排行榜</navigator>
        <navigator url="../rankPer/rankPer">运动健将榜</navigator>
        <navigator url="../rankCollegeDay/rankCollegeDay">学院运动榜</navigator>
      </View>
    )
  }
}

