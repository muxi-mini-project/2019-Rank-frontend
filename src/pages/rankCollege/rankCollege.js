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
      this.setState({list1: data, list: data})
    })
    Fetch('api/v1/rank/step/dept/month').then(data => {
      this.setState({list2: data})
    })
  }

  toLinkDept(e) {
    let id = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    Taro.navigateTo({
      url: `../rankDept/rankDept?id=${id}&name=${name}`
    });
  }

  switchNav(e) {
    const { list1,list2 } = this.state
    var cur = e.currentTarget.id
    //取事件源组件上的tag值
    if(this.state.currentNav == cur){
      return false
    }else if (cur == 0) {
      this.setState({
        currentNav:cur,
        list: list1
      })
    }else if (cur == 1){
      this.setState({
        currentNav:cur,
        list: list2
      })
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
                className={this.state.currentNav == index ? 'now common-title' : 'then common-title'}
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
                style={`height:${Taro.getSystemInfoSync().windowHeight-40}px`}
                onScrollToLower={this.scrolltobottom}
                lowerThreshold='20'
              >
                <View className='background'>
                <Image 
                  className='rank-background'
                  src='../../assets/png/collegeBG.png'
                />
                </View>               
                <View className='head'>
                  <View className='rank'>名次</View>
                  <View className='name'>学院名称</View>
                  <View className='count'>平均步数</View>
                </View>
                <View className='body-list'>
                  {list.map((item, index) => {
                    return (
                      <View 
                        key={index}
                        className='college-item' 
                        data-name={item.department_name}
                        data-id={item.department_id}
                        onClick={this.toLinkDept}
                      >
                        <View
                          className={index == 0 ? 'rank first': ( index == 1 ? 'rank second': (index == 2 ? 'rank third' :'rank') )}
                        >
                          <View>{index+1}</View>
                        </View>
                        <View className='name'>{item.department_name}</View>
                        <View className='count'>{item.step}</View>
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