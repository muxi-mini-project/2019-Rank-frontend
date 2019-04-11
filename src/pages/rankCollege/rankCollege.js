import Taro, { Component } from '@tarojs/taro';
import { View, Image, ScrollView } from '@tarojs/components';
import './rankCollege.scss'
import RankCollegeItem from '../../components/rankCollegeItem/index'
import NavBar from '../../compoments/navBar/index'

export default class rankCollege extends Component {
  state = {
    list: []
  }
  config = {
    navigationBarTitleText: '学院运动榜'
  }


  componentWillMount () {
    Taro.request({
      
    })  
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render() {
    const { list } = this.state;
    return (
      <View className='rankCollege'>
        <NavBar navlist={['周榜','月榜']} />
        <Image className='rank-background'></Image>
        <View className='head'>
          <View className='title'>名次</View>
          <View className='title'>学院名称</View>
          <View className='title'>平均步数</View>
        </View>
        <View className='body'>
          <ScrollView
            className='scrollbox'
            scrollY
            scrollWithAnimation
            scrollTop='0'
            enableBackToTop
            onScrollToLower={this.scrolltobottom}
            lowerThreshold='20'
          >
            {list.map((item, index) => {
              return (
                <RankCollegeItem 
                  key={index}
                  item={item}
                />
              )
            })}  
          </ScrollView>
        </View>
      </View>
    )
  }
}