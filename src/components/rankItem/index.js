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
        <View 
          className={rank == 1 ? 'rank inline first': ( rank == 2 ? 'rank inline second': (rank == 3 ? 'rank inline third' :'rank inline') )}
        >
          <View>{rank}</View>
        </View>
        <View className='avatar inline'>
          <Image src={url}></Image>
        </View>
        <View className='name inline'>{username}</View>
        <View className='count inline'>{count}</View>
      </View>
    )
  }
}



