import Taro, { Component } from '@tarojs/taro';
import { View, Image, ScrollView } from '@tarojs/components';
import './rankDept.scss'
import Fetch from '../../common/require'

export default class rankDept extends Component {
  state = {
    list: [],
    page: 1,
    totalNum: 0
  }

  config = {
    navigationBarTitleText: '学院排行榜'
  }

  componentWillMount () {
    Taro.setNavigationBarTitle({
      title: `${this.$router.params.name}`
    })    
  }

  componentDidMount () { 
    Fetch(
      'api/v1/rank/step/dept/person',
      {
        department_id: this.$router.params.id,
        page: 1
      }
    ).then(data => {
      this.setState({
        list: this.state.list.concat(data.list),
        totalNum: data.total_page,
        page: data.now_page
      })
    }) 
  }
  
  toLinkShow(e) {
    let id = e.currentTarget.dataset.usrid
    Taro.navigateTo({
      url: `../people/people?id=${id}`
    });
  }

  scrolltobottom() {
    const { page,totalNum,list } = this.state
    if(page < totalNum) {
      Fetch(
        'api/v1/rank/step/dept/person',
        {
          department_id: this.$router.params.id,
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
    const { list } = this.state;
    return (
      <View className='rankDept'>
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
                    src={require('../../assets/png/collegeBG.png')}
                  />
                </View>           
                <View className='main'>
                <View className='head'>
                  <View className='rank inline'>名次</View>
                  <View className='avatar inline'>头像</View>
                  <View className='name inline'>昵称</View>
                  <View className='count inline'>步数</View>
                </View>              
                {list.map((item, index) => {
                  return (
                    <View className='rank-item' key={item.user_id} data-usrid={item.user_id} onClick={this.toLinkShow}>
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