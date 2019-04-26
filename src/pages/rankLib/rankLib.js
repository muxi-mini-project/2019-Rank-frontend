import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './rankLib.scss'
import RankItem  from '../../components/RankItem'
import Fetch from '../../common/require'

export default class rankLib extends Component {
  state = {
    list: [],
    my: [],
    page: 1,
    totalNum: 0
  }
  config = {
    navigationBarTitleText: '学霸排行榜',
    "onReachBottomDistance": 200
  }

  componentWillMount () { }

  componentDidMount () {
    Fetch(
      'api/v1/rank/lib',
      {
        page: 1
      }
    ).then(data => {
      this.setState({
        list: this.state.list.concat(data.list),
        my: data.my,
        totalNum: data.total_page,
        page: data.now_page
      })
    }) 
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  
  toLinkShow(item) {
    const { my } = this.state
    if(item.user_id !== my.user_id){
      Taro.switchTab({
        url: `../people/people?id=${item.user_id}`
      });
    }else{
      Taro.navigateTo({
        url: `../my/my`
      });
    }
  }

  toLinkMy() {
    Taro.switchTab({
      url: `../my/my`
    });
  }
  
  onReachBottom() {
    var { page,totalNum } = this.state
    console.log("---开始上拉加载---")//
    if(page < totalNum) {
      var list=this.state.list
      Fetch(
        'api/v1/rank/lib',
        {
          page: page+1
        }
      ).then(data => {
        this.setState({
          list: list.concat(data.list),
          totalNum: data.total_page,
          page: data.now_page
        })
      })
      console.log("---结束上拉加载---")//
    }

  }

  render() {
    const { list, my } = this.state;
    return (
      <View className='rankLib'>
        <View className='main-box'>
            <View className='body'>
              <View
                className='scrollbox'
                /*style={`height:${Taro.getSystemInfoSync().windowHeight}px`}
                onScrollToLower={this.scrolltobottom}*/
              >
                <View className='background'>
                  <Image className='rank-background'></Image>
                </View>           
                <View className='main'>
                <View className='head'>
                  <View className='rank'>名次</View>
                  <View className='avatar'>头像</View>
                  <View className='name'>昵称</View>
                  <View className='count'>借书本数</View>
                </View>              
                <View className='item my'>
                  <View className='rank'>{my.rank}</View>
                  <View className='avatar'>
                    <Image src={my.url}></Image>
                  </View>
                  <View className='name'>{my.username}</View>
                  <View className='count'>{my.booknum}</View>
                </View>
                {list.map((item, index) => {
                  return (
                    <RankItem 
                      key={item.user_id}
                      rank={index+1}
                      item={item}
                      url={item.url}
                      count={item.booknum}
                      username={item.username}
                      onCLick={this.toLinkShow}
                    />
                  )
                })}  
                </View>   
              </View>
            </View>
        </View>
        <View className='clear'></View>
      </View>
    )
  }
}