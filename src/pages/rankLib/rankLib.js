import Taro, { Component } from '@tarojs/taro';
import { View, Image, ScrollView } from '@tarojs/components';
import './rankLib.scss'
import RankItem  from '../../components/RankItem/index'
import Fetch from '../../common/require'

export default class rankLib extends Component {
  state = {
    list: [],
    my: [],
    currentNum: 0,
    totalNum: 0,
    pageSize: 10
  }
  config = {
    navigationBarTitleText: '学霸排行榜'
  }


  componentWillMount () { }

  componentDidMount () {
    Fetch(
      'api/v1/rank/lib',
      {
        offset: 0,
        limit: 5
      }
    ).then(data => {
      this.setState({
        list: this.state.list.concat(data.list),
        my: data.my,
        totalNum: data.total,
        currentNum: this.state.currentNum+5, //setState异步，可能要改成函数用prevState实现？
      })
    }) 
  }

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
      Fetch(
        'api/v1/rank/lib',
        {
          offset: currentNum,
          limit: pageSize
        }
      ).then(data => {
        this.setState({
          list: this.state.list.concat(data.list),
          totalNum: data.total,
          currentNum: currentNum+pageSize//同上？
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
          <View className='title'>借书本数</View>
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
              <View>{my.booknum}</View>
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