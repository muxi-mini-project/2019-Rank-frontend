import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

export default class RankItem extends Component {
  
  render() {
    const { item, index } = this.props;
    return (
      <View className='college-item' onClick={this.onClick}>
        <View>{index+1}</View>
        <View>{item.department_name}</View>
        <View>{item.count}</View>
      </View>
    )
  }
}