import Taro, { Component } from '@tarojs/taro';
import { View, Image, ScrollView } from '@tarojs/components';
import './rankCollege.scss'
import Fetch from '../../common/require'

export default class rankCollege extends Component {
  state = {
    list1: [],
    list2: [],
    list: [],
    currentNav: 0,
    navList:['周榜','月榜']
  }
  config = {
    navigationBarTitleText: '学院运动榜'
  }

  componentDidMount () { 
    Fetch('api/v1/rank/step/dept/week').then(data => {
      console.log(data)
      this.setState({list1: data, list: data})
    })
    Fetch('api/v1/rank/step/dept/month').then(data => {
      console.log(data)
      this.setState({list2: data})
    })
  }

  toLinkDept(e) {
    let name = e.currentTarget.dataset.name
    Taro.navigateTo({
      url: `../rankDept/rankDept?id=${name}`
    });
  }

  switchNav(e) {
    const { list1,list2 } = this.state
    var cur = e.currentTarget.id
    //取事件源组件上的tag值, 此处target可以替换成currentTarget（指向当前组件）吗
    if(this.state.currentNav == cur){
      return false
    }else if (cur == 0) {
      this.setState({
        currentNav:cur,
        list: list1
      })
      console.log('week')
    }else if (cur == 1){
      this.setState({
        currentNav:cur,
        list: list2
      })
      console.log('month')
    }else{
      console.log('error' + e)
    }
  }  

  render() {
    const { list,navList } = this.state;
    return (
      <View className='rankCollege'>
        <View className='nav-title'>
          {navList.map((item, index) => {
            return (
              <View
                className={this.state.currentNav == index ? 'now' : 'then'}
                key={index}
                id={index}
                onClick={this.switchNav.bind(this)}
              >
                {item}
              </View>
            )
          })}
        </View>                      
        <View className='swiper-box'>
            <View className='main'>
              <ScrollView
                className='scrollbox'
                scrollY
                scrollWithAnimation
                scrollTop='0'
                enableBackToTop
                style={`height:${Taro.getSystemInfoSync().windowHeight}px`}
                onScrollToLower={this.scrolltobottom}
                lowerThreshold='20'
              >
                <View className='background'>
                  <Image className='rank-background'></Image>
                </View>               
                <View className='head'>
                  <View className='title'>名次</View>
                  <View className='title'>学院名称</View>
                  <View className='title'>平均步数</View>
                </View>
                <View className='body-list'>
                  {list.map((item, index) => {
                    return (
                      <View 
                        key={index}
                        className='college-item' 
                        data-name={item.department_name}
                        onClick={this.toLinkDept}
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
      </View>
    )
  }
}