import Taro, { Component } from '@tarojs/taro';
import { View, Image, ScrollView } from '@tarojs/components';
import './rankCollege.scss'
import NavBar from '../../components/NavBar/index'
import Fetch from '../../common/require'

export default class rankCollege extends Component {
  state = {
    list: []
  }
  config = {
    navigationBarTitleText: '学院运动榜'
  }


  componentWillMount () { }

  componentDidMount () { 
    Fetch('api/v1/rank/step/dept/week').then(data => {
      console.log(data)
      this.setState({list: data})
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render() {
    const { list } = this.state;
    return (
      <View className='rankCollege'>
        <View>周榜 月榜</View>
        <NavBar navlist={['周榜','月榜']}>111222</NavBar>
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
            <View className='body-list'>
              {list.map((item, index) => {
                return (
                  <View 
                    key={index}
                    className='college-item' 
                  >
                    <View>{index+1}</View>
                    <View>{item.department_name}</View>
                    <View>{item.step}</View>
                 </View>
                )
              })} 
            </View> 
          </ScrollView>
        </View>
      </View>
    )
  }
}