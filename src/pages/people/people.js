import Taro, { Component } from '@tarojs/taro'
import { View, Image , Text} from '@tarojs/components'
import './people.scss'
import Fetch from '../../common/require2'

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
        isLiked: true,
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
        isLiked: data.is_liked
      });
    });
    Fetch(`api/v1/users/${this.$router.params.id}/info/avatar`).then(data => {
      this.setState({
        url: data.url
      });
    });
  }

  componentDidHide () { }
  //add like发送给后端，并把isLiked改为true(已经点赞啦)
  changeToLike(){
    const {id, likes} = this.state

    Fetch(
      'api/v1/likes/',
      {
        star_id: id
      },
      'POST'
    )
      .then(data =>{
        if(data){
          Taro.showToast({
            title:'点赞成功'
          })
          this.setState({
            isLiked: true,
            likes: likes + 1
          })
        }
      })
      .then(statusCode =>{
        if(statusCode){
          Taro.showToast({
            title:'网络错误，请重新尝试',
            icon: 'none'
          })
        }
      })
  }
  //delete like发送给后端，并把isLiked改为false(还没有点赞)
  changeToUnlike(){
    const { id, likes } = this.state
    Fetch(
      'api/v1/likes/',
      {
        star_id: id
      },
      'DELETE'
    )
      .then(data =>{
        if(data){
          Taro.showToast({
            title:'取消点赞成功'
          })
          this.setState({
            isLiked: false,
            likes: likes - 1
          })
        }
      })
      .then(statusCode =>{
        if(statusCode){
          Taro.showToast({
            title:'网络错误，请重新尝试',
            icon: 'none'
          })
        }
      })
  }
  render() {
    const { url, isLiked, username, stdnum, likes, booknum, rank, contribute, qq } = this.state
    return (
      <View className='content'>
        <Image 
          className='avatar'
          src={url}
        />
        <View className='top-container'>
          <View className='top-contaniner-right'>
            <View className='likebox'>
              {isLiked && <Image style='width:54rpx; height:44rpx; margin-left:460rpx; margin-right: 15rpx' onClick={this.changeToUnlike.bind(this)} src={require('../../assets/png/like.png')} />}
              {!isLiked && <Image style='width:54rpx; height:44rpx; margin-left:460rpx; margin-right: 15rpx' onClick={this.changeToLike.bind(this)} src={require('../../assets/png/unlike.png')} />}
              <Text>{likes}</Text>
            </View>
          </View>
          <View className='per-information'>
            <View className='nickname'>
              <Text>昵称：</Text>
              <Text>{username}</Text>
            </View>
            <View className='student-number'>
              <Text>学号：</Text>
              {stdnum && <Text>{stdnum}</Text>}
              {!stdnum && <Text>*********</Text>}
            </View>
            <View className='QQnumber'>
              <Text>QQ：</Text>
              {qq && <Text>{qq}</Text>}
              {!qq && <Text>*********</Text>}
            </View>
          </View>
        </View>
        <View className='data'>
            <View className='book'>
              <Image className='pointPhoto' src={require('../../assets/png/book.png')}></Image>
              <Text className='name'>借书本数：{booknum}</Text>
            </View>
            <View className='rank'>
              <Image className='pointPhoto' src={require('../../assets/png/sport.png')}></Image>
              <Text className='name'>步数排名：{rank}</Text>
            </View>
            <View className='contribute'>
              <Image className='pointPhoto' src={require('../../assets/png/college.png')}></Image>
              <Text className='name'>学院贡献：{contribute}</Text>
            </View>
          </View>
      </View>
    )
  }
}


