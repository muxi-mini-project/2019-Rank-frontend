import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import './index.scss';

export default class RankItem extends Component {
  
  onClick = () => {
    const { item, onClick } = this.props
    onClick(item)
  }
  render() {
    const { rank,username,url,count } = this.props;
    return (
      <View className='item' onClick={this.onClick}>
        <View className='rank'>
          <View>{rank}</View>
        </View>
        <View className='avatar'>
          <Image url={url}></Image>
        </View>
        <View className='name'>{username}</View>
        <View className='count'>{count}</View>
      </View>
    )
  }
}



