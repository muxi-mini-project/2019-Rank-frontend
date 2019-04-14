import Taro, { Component } from '@tarojs/taro'
import { View, Image , Text} from '@tarojs/components'
import './people.scss'

export default class People extends Component {
  constructor(){
    super(...arguments);
      this.state = {
        stdnum:'',
        qq:'',
        username:'',
        show_qq: false,
        show_stdnum: false,
        booknum: '',
        likes: '',
        contribute: '',
        rank:'',
      }
  }
  config = {
    navigationBarTitleText: '我的'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    var that = this
    Taro.request({
      url:'http://67.216.199.87:5000/api/v1/users/my/info/',
      method:'GET',
      header: {
        'cookie': Taro.getStorageSync('cookie')
      },
      success(res){
        that.setState({
          stdnum: res.data.stdnum,
          show_stdnum: res.data.show_stdnum,
          qq: res.data.qq,
          show_qq: res.data.show_qq,
          booknum: res.data.booknum,
          likes: res.data.likes,
          username: res.data.username,
          contribute: res.data.contribute,
          rank: res.data.rank
        })
      }
    })
  }

  componentDidHide () { }
 
  render() {
    return (
      <View>
        <View className={this.state.content_name}>
          <Image className='avatar'></Image>
          <View className='top-container'>
            <View className='likebox'>
              <Image className='likePhoto' src={require('../../assets/png/like.png')}></Image>
              <Text>{this.state.likes}</Text>
            </View>
            <View className='per-information'>
              <View className='nickname'>
                <View>昵称：</View>
                <View>{this.state.username}</View>
              </View>
              <View className='student-number'>
                <View>学号：</View>
                {this.state.show_stdnum && <View>{this.state.stdnum}</View>}
                {!this.state.show_stdnum && <View>*********</View>}
              </View>
              <View className='QQnumber'>
                <View>QQ：</View>
                {this.state.show_qq && <View>{this.state.qq}</View>}
                {!this.state.show_qq && <View>*********</View>}
              </View>
            </View>
          </View>
          <View className='data'>
            <View className='first-row'>
              <View>借书次数</View>
              <View>步数排名</View>
              <View>学院贡献值</View>
            </View>
            <View className='second-row'>
              <View>{this.state.booknum}</View>
              <View>{this.state.rank}</View>
              <View>{this.state.contribute}</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}


