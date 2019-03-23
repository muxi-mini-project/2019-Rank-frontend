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


  render() {
    return (
      <View className='index'>
        <Image 
          circle
          image = " " 
          className = "avatar" />
        <View className = "top-container">
          <View className = "like">
            <Image></Image>
            <View className = "like-number">195</View>
          </View>
          <View className = "per-information">
            <View className = "nickname">
              <View>昵称：</View>
              <View>XXXX</View>
            </View>
            <View className = "student-number">
              <View>学号：</View>
              <View>XXXXXX</View>
            </View>
            <View className = "QQnumber">
              <View>QQ：</View>
              <View>XXXXXXXXX</View>
            </View>
          </View>
          <View className = "setting">编辑</View>
        </View>
        <View className = "form">
          <View className = "first-row">
            <View>借书次数</View>
            <View>步数排名</View>
            <View>学院贡献值</View>
          </View>
          <View className = "second-row">
            <View>40</View>
            <View>1000</View>
            <View>？</View>
          </View>
        </View>
        <View className = "feedback" >反馈与帮助</View>
      </View>
    )
  }
}
