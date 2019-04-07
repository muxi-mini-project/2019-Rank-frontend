import Taro, { Component } from '@tarojs/taro';
import { View, Image, ScrollView } from '@tarojs/components';
import './rankPer.scss'
import RankItem from '../../components/RankItem/index'

export default class rankPer extends Component {
  state = {
    list: [],
    my: [],
    currentNum: 0,
    totalNum: 0,
    pageSize: 10
  }
  config = {
    navigationBarTitleText: '运动健将榜'
  }


  componentWillMount () {
    const prehttp ='http://67.216.199.87:5000/'
    Taro.request({
      url: prehttp+'api/v1/rank/step/person',
      data: {
        offset: 0,
        limit: 5
      },
      method: 'GET'
    }).then(data => {
        this.setState({
          list: this.state.list.concat(data.list),
          my: data.my,
          totalNum: data.total,
          currentNum: this.state.currentNum+5
        })
    })  
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  
  toLinkShow(item) {
    Taro.navigateTo({
      url: `/pages/myShow?id=${item.user_id}`
    });
  }

  scrolltobottom() {
    const { currentNum, pageSize, totalNum, list } = this.state
    if(list.length < totalNum) {
      Taro.request({
        url: 'rank/step/person',
        data: {
        offset: currentNum,
        limit: pageSize
        },
        method: 'GET'
    }).then(data => {
        this.setState({
          list: this.state.list.concat(data.list),
          totalNum: data.total,
          currentNum: currentNum+pageSize
        })
    })
    }
  }

  render() {
    const { list, my } = this.state;
    return (
      <View className='rankLib'>
        <Image className='rank-background'></Image>
        <View className='head'>
          <View className='title'>名次</View>
          <View className='title'>头像</View>
          <View className='title'>昵称</View>
          <View className='title'>步数</View>
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
            <View className='item'>
              <View>{my.rank}</View>
              <Image></Image>
              <View>{my.username}</View>
              <View>{my.step}</View>
            </View>
            {list.map((item, index) => {
              return (
                <RankItem 
                  key={index}
                  item={item}
                  onCLick={this.toLinkShow}
                />
              )
            })}  
          </ScrollView>
        </View>
      </View>
    )
  }
}