import Taro, { Component } from '@tarojs/taro'
import { View, Image , Text} from '@tarojs/components'
import './people.scss'
import Fetch from '../../common/require'

export default class People extends Component {
  constructor(){
    super(...arguments);
      this.state = {
        stdnum:'',
        qq:'',
        username:'',
        booknum: '',
        contribute: '',
        rank:'',
        is_liked: true,
        likes: 0,
        url:'',
        id:''
      }
  }
  config = {
    navigationBarTitleText: '个人展示页面'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    Fetch(`api/v1/users/${this.$router.params.id}/info`).then(data => {
      this.setState({
        stdnum: data.stdnum,
          qq: data.qq,
          booknum: data.booknum,
          likes: data.likes,
          username: data.username,
          contribute: data.contribute,
          rank: data.rank,
          id: data.id
      });
    });
    Fetch(`api/v1/users/${this.$router.params.id}/info/avatar`).then(data => {
      this.setState({
        url: data.url
      });
    });
  }

  componentDidHide () { }
  //add like发送给后端，并把is_liked改为true(已经点赞啦)
  changeToLike(){
    var that = this
    const {id} = this.state
    Taro.request({
      url:'http://67.216.199.87:5000/api/v1/likes/',
      method:'POST',
      header: {
        'cookie': Taro.getStorageSync('cookie')
      },
      data:{
        star_id: id
      },
      success(res){
        if(res.statusCode === 200){
          Taro.showToast({
            title:'点赞成功'
          })    
        }
        else{
          Taro.showToast({
            title:'点赞失败',
            icon: 'none'
          })
        }
      }
    })
    that.setState({
      is_liked: true,
      likes: this.state.likes + 1
    })  
  }
  //delete like发送给后端，并把is_liked改为false(还没有点赞)
  changeToUnlike(){
    var that = this
    const {id} = this.state
    Taro.request({
      url:'http://67.216.199.87:5000/api/v1/likes/',
      method:'DELETE',
      header: {
        'cookie': Taro.getStorageSync('cookie')
      },
      data:{
        star_id: id
      },
      success(res){
        if(res.statusCode === 200){
          Taro.showToast({
            title:'取消点赞成功'
          })    
        }
        else{
          Taro.showToast({
            title:'取消点赞失败',
            icon: 'none'
          })
        }
      }
    })
    that.setState({
      is_liked: false,
      likes: this.state.likes - 1
    })  
  }
  render() {
    return (
      <View>
        <View className={this.state.content_name}>
          <Image 
            className='avatar'
            src={this.state.url}
          />
          <View className='top-container'>
            <View className='likebox'>
              {this.state.is_liked && <Image onClick={this.changeToUnlike.bind(this)} className='likePhoto' src={require('../../assets/png/like.png')} />}
              {!this.state.is_liked && <Image onClick={this.changeToLike.bind(this)} className='likePhoto' src={require('../../assets/png/unlike.png')} />}
              <Text>{this.state.likes}</Text>
            </View>
            <View className='per-information'>
              <View className='nickname'>
                <View>昵称：</View>
                <View>{this.state.username}</View>
              </View>
              <View className='student-number'>
                <View>学号：</View>
                {this.state.stdnum && <View>{this.state.stdnum}</View>}
                {!this.state.stdnum && <View>*********</View>}
              </View>
              <View className='QQnumber'>
                <View>QQ：</View>
                {this.state.qq && <View>{this.state.qq}</View>}
                {!this.state.qq && <View>*********</View>}
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


