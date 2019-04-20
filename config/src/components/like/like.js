import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import 'like.scss'
class Like extends Component{   
  constructor(){
    super(...arguments);
      this.state = {
        likeNumber:'',
        src: '',
      }
  }

  render(){
    return (
      <View className = "like">
        <Image Taro:if="{{collection}}" src="../../assets/png/unlike.png" bindtap="toCollect"></Image>
        <View  onClick = "this.page" className = "like-number">195</View>
    )
  }
}
export default Like;