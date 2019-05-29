import Taro, { Component } from '@tarojs/taro';
import { View, Image, ScrollView } from '@tarojs/components';
import './rankPer.scss'
import RankItem from '../../components/RankItem/index'
import Fetch from '../../common/require'

export default class rankPer extends Component {
  state = {
    list: [],
    my: [],
    page: 1,
    totalNum: 0
  }
  config = {
    navigationBarTitleText: '运动健将榜'
  }

  componentDidMount () { 
    Fetch(
      'api/v1/rank/step/person',
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
  
  toLinkShow(item) {
    const { my } = this.state
    if(item.user_id !== my.user_id){
      Taro.navigateTo({
        url: `../people/people?id=${item.user_id}`
      });
    }
  }

  toLinkMy() {
    Taro.switchTab({
      url: `../my/my`
    });
  }

  scrolltobottom() {
    const { page,totalNum,list } = this.state
    if(page < totalNum) {
      Fetch(
        'api/v1/rank/step/person',
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
    }
  }
  render() {
    const { list, my } = this.state;
    return (
      <View className='rankPer'>
        <View className='main-box'>
            <View className='body'>
              <ScrollView
                className='scrollbox'
                scrollY
                scrollWithAnimation
                style={`height:${Taro.getSystemInfoSync().windowHeight}px`}
                enableBackToTop
                onScrollToLower={this.scrolltobottom}
                lowerThreshold='20'
              >
                <View className='background'>
                  <Image 
                    className='rank-background'
                    src='../../assets/png/runBG.png'
                  />
                </View>           
                <View className='main'>
                <View className='head'>
                  <View className='rank inline'>名次</View>
                  <View className='avatar inline'>头像</View>
                  <View className='name inline'>昵称</View>
                  <View className='count inline'>步数</View>
                </View>              
                <View className='item my' onCLick={this.toLinkMy}>
                  <View className='rank inline'>{my.rank}</View>
                  <View className='avatar  inline'>
                    <Image src={my.url}></Image>
                  </View>
                  <View className='name inline'>{my.username}</View>
                  <View className='count inline'>{my.step}</View>
                </View>
                {list.map((item, index) => {
                  return (
                    <RankItem 
                      key={item.user_id}
                      rank={index+1}
                      item={item}
                      url={item.url}
                      count={item.step}
                      username={item.username}
                      onCLick={this.toLinkShow}
                    />
                    /*<View className='rank-item' key={item.user_id} data-usrid={item.user_id} onClick={this.toLinkShow}>
                    <View 
                      className={index == 0 ? 'ranking inline first': ( index == 1 ? 'ranking inline second': (index == 2 ? 'ranking inline third' :'ranking inline') )}
                    >
                      <View>{index+1}</View>
                    </View>
                    <View className='avatar inline'>
                      <Image src={item.url}></Image>
                    </View>
                    <View className='name inline'>{item.username}</View>
                    <View className='count inline'>{item.step}</View>
                  </View>*/
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