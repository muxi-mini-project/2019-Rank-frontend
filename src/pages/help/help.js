import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import './help.scss';

export default class Index extends Component {

    config = {
      navigationBarTitleText: '反馈与帮助'
    };

    toFeedback() {
      Taro.navigateTo({
        url:`../feedback/feedback`
      })
    }

    render() {
      return (
        <View 
          className='help'
          style={`height:${Taro.getSystemInfoSync().windowHeight}px`}
        >
          <View className='box'>
            <View className='feedback' onClick={this.toFeedback}>问题反馈</View>
            <View className='form'>
              <View className='text'>
                <View className='question'>Q：学霸排行榜是什么？</View>
                <View className='answer'>A：学霸排行榜就是每月借阅书籍次数的排行。</View>
              </View>
              <View className='text'>
                <View className='question'>Q：运动健将榜是什么？</View>
                <View className='answer'>A：运动健将榜就是每天运动步数的排行。</View>              
              </View>
              <View className='text'>
                <View className='question'>Q：学院运动榜是什么？</View>
                <View className='answer'>A：学院运动周榜就是本学院所有学生一周运动步数总和的平均值，学院运动月榜则按月统计。</View>              
              </View>
              <View className='text'>
                <View className='question'>Q：学院贡献值是什么？</View>
                <View className='answer'>A：学院贡献值为该学生对学院运动的贡献，按排名计算，排名前1/10就是100分，排名前1/10-2/10就是90分…以此类推。</View>              
              </View>             
            </View>
          </View>
        </View>

      )
    }

}