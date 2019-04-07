import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

export default class RankItem extends Component {
  
  onClick = () => {
    const { item, onClick } = this.props
    onClick(item)
  }
  render() {
    const { item, index } = this.props;
    return (
      <View className='item' onClick={this.onClick}>
        <View>{index+1}</View>
        <Image></Image>
        <View>{item.username}</View>
        <View>{item.booknum||item.step}</View>
      </View>
    )
  }
}



