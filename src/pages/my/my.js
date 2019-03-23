import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './my.scss'

export default class My extends Component {

  config = {
    navigationBarTitleText: '我的'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='my'>
        <Text>Hello world!</Text>
        <navigator url="../feedback/feedback">意见反馈</navigator>
      </View>
    )
  }
}