import Taro, { Component } from '@tarojs/taro';
import { View, Image, ScrollView, Swiper, SwiperItem } from '@tarojs/components';
import './rankCollege.scss'
import NavBar from '../../components/NavBar/index'
import Fetch from '../../common/require'

export default class rankCollege extends Component {
  state = {
    list1: [],
    list2: [],
    currentNav: 0,
    navList:['周榜','月榜']
  }
  config = {
    navigationBarTitleText: '学院运动榜'
  }


  componentWillMount () { }

  componentDidMount () { 
    Fetch('api/v1/rank/step/dept/week').then(data => {
      console.log(data)
      this.setState({list1: data})
    })
    Fetch('api/v1/rank/step/dept/month').then(data => {
      console.log(data)
      this.setState({list2: data})
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  switchNav(e) {
    var cur = e.target.dataset.index 
    //取事件源组件上的index值, 此处target可以替换成currentTarget（指向当前组件）吗
    if(this.state.currentNav == cur){
      return false
    }else{
      this.setState({
        currentNav:cur
      })
    }
  }  
  switchSwiper(e) {
    var cur = e.detail.current
    this.setState({
      currentNav:cur
    })
  }

  render() {
    const { list1,list2,navList } = this.state;
    return (
      <View className='rankCollege'>
        <View className='nav-title'>
          {navList.map((item, index) => {
            return (
              <View
                className={this.state.currentNav===index?'active':''}
                key={index}
                onClick={this.switchNav.bind(this)}
              >
                {item}
              </View>
            )
          })}
        </View>
        <Image className='rank-background'></Image>
        <Swiper
          indicatorDots
          className='swiper-box'
          current={this.state.currentNav}
          onChange={this.switchSwiper.bind(this)}
        >
          <SwiperItem>
            <View className='head'>
              <View className='title'>名次1</View>
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
                  {list1.map((item, index) => {
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
          </SwiperItem>
          <SwiperItem>
            <View className='head'>
              <View className='title'>名次2</View>
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
                  {list2.map((item, index) => {
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
          </SwiperItem>
        </Swiper>              
      </View>
    )
  }
}