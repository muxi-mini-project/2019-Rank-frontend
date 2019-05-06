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
    Fetch(`api/v1/users/${this.$router.params.id}/info/`).then(data => {
      this.setState({
        stdnum: data.stdnum,
        qq: data.qq,
        booknum: data.booknum,
        username: data.username,
        contribute: data.contribute,
        rank: data.rank,
        id: data.id,
        likes: data.likes,
        is_liked: data.is_liked
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
      url:'https://rank.muxixyz.com/api/v1/likes/',
      method:'POST',
      header: {
        'cookie': Taro.getStorageSync('cookie')
      },
      data:{
        star_id: id
      },
      success(res){
        console.log('likes' + res.statusCode)
        console.log(res)
        if(res.statusCode === 200){
          Taro.showToast({
            title:'点赞成功'
          })
          that.setState({
            is_liked: true,
            likes: that.state.likes + 1
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
  }
  //delete like发送给后端，并把is_liked改为false(还没有点赞)
  changeToUnlike(){
    const { id } = this.state
    var that = this
    Taro.request({
      url:'https://rank.muxixyz.com/api/v1/likes/',
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
          that.setState({
            is_liked: false,
            likes: that.state.likes - 1
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
     
  }
  render() {
    return (
      <View className='content'>
        <Image 
          className='avatar'
          src={this.state.url}
        />
        <View className='top-container'>
          <View className='top-contaniner-right'>
            <View className='likebox'>
              {this.state.is_liked && <Image style='width:54rpx; height:44rpx; margin-left:460rpx; margin-right: 15rpx' onClick={this.changeToUnlike.bind(this)} src={require('../../assets/png/like.png')} />}
              {!this.state.is_liked && <Image style='width:54rpx; height:44rpx; margin-left:460rpx; margin-right: 15rpx' onClick={this.changeToLike.bind(this)} src={require('../../assets/png/unlike.png')} />}
              <Text>{this.state.likes}</Text>
            </View>
          </View>
          <View className='per-information'>
            <View className='nickname'>
              <Text>昵称：</Text>
              <Text>{this.state.username}</Text>
            </View>
            <View className='student-number'>
              <Text>学号：</Text>
              {this.state.stdnum && <Text>{this.state.stdnum}</Text>}
              {!this.state.stdnum && <Text>*********</Text>}
            </View>
            <View className='QQnumber'>
              <Text>QQ：</Text>
              {this.state.qq && <Text>{this.state.qq}</Text>}
              {!this.state.qq && <Text>*********</Text>}
            </View>
          </View>
        </View>
        <View className='data'>
            <View className='book'>
              <Image className='pointPhoto' src={require('../../assets/png/point.png')}></Image>
              <Text className='name'>借书次数：{this.state.booknum}</Text>
            </View>
            <View className='rank'>
              <Image className='pointPhoto' src={require('../../assets/png/point.png')}></Image>
              <Text className='name'>步数排名：{this.state.rank}</Text>
            </View>
            <View className='contribute'>
              <Image className='pointPhoto' src={require('../../assets/png/point.png')}></Image>
              <Text className='name'>学院贡献：{this.state.contribute}</Text>
            </View>
          </View>
      </View>
    )
  }
}


