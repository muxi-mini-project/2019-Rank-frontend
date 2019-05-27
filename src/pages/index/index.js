import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './index.scss';
import Fetch from '../../common/require2'

export default class Index extends Component {
  constructor(props){
    super(props);
  }
 
  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () {
    //向微信运动请求数据
    Taro.getWeRunData({
      success(res){
        //将获取到的数据发给后端
        Fetch(
          'api/v1/werun/',
          {
            encryptedData: res.encryptedData,
            iv: res.iv
          },
          'POST'
        )
      }
    })
  }
  
  componentDidMount () { }
  
  componentWillUnmount () { }

  componentDidShow () {
    
  }

  componentDidHide () { }
  //转至图书借阅排行榜
  torankLib(){
    Taro.navigateTo({
      url:'../rankLib/rankLib'
    })
  }
  //转至个人步数排行榜
  torankPer(){
    Taro.navigateTo({
      url:'../rankPer/rankPer'
  })
  }
  //转至学院步数排行榜
  torankCollege(){
    Taro.navigateTo({
      url:'../rankCollege/rankCollege'
  })
  }
  render() {
    return (
      <View className='index'>
        <Image
          className='rankLib'
          src={require('../../assets/png/rankLib.png')}
          onClick={this.torankLib}
        />
        <Image
          className='rankPer'
          src={require('../../assets/png/rankPer.png')}
          onClick={this.torankPer}
        />
        <Image
          className='rankCollege'
          src={require('../../assets/png/rankCollege.png')}
          onClick={this.torankCollege}
        />
      </View>
    )
  }
}
