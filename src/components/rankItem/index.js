import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

export default class RankItem extends Component {
  
  onClick = () => {
    const { item, onClick } = this.props
    onClick(item)
  }
  render() {
    const { username,rank,count } = this.props;
    return (
      <View className='item' onClick={this.onClick}>
        <View>{rank}</View>
        <Image></Image>
        <View>{username}</View>
        <View>{count}</View>
      </View>
    )
  }
}



