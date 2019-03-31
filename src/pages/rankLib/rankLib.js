import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './rankLib.scss'

export default class rankLib extends Component {

  config = {
    navigationBarTitleText: '学霸排行榜'
  }

  state = {
      list: []
  }

  componentWillMount () { }

  componentDidMount () {
    Taro.request({
      url: rank/lib,
      data: {limit: 100},
      method: GET
    }).then(data => {
      this.setState({
        list: data
      })
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  render() {
    return (
      <View className = 'rankLib'>
        <Image className = 'rank-background'></Image>
        <View className = 'head'>
          <View className = 'title'>名次</View>
          <View className = 'title'>头像</View>
          <View className = 'title'>昵称</View>
          <View className = 'title'>借书本数</View>
        </View>
        <View className = 'body'>
          {list.map((item, index) => {
            return (
              <View className = 'item'>
                <View>{index + 1}</View>
                <Image></Image>
                <View>{item.username}</View>
                <View>{item.booknum}</View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}