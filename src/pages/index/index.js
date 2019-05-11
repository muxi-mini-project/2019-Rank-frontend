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
    //微信运动授权
    //判断是否授权过微信运动
    Taro.getSetting({
      success(res) {
        //如果没有授权过就去授权
        if (!res.authSetting['scope.werun']) {
          Taro.authorize({
            scope: 'scope.werun',
            success(){
              //授权成功调取微信运动API获得数据
              Taro.getWeRunData({
                success(res){
                  //获取数据后发给后端
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
          })
        }
      }
    })
  }
  
  componentDidMount () { }
  
  componentWillUnmount () { }

  componentDidShow () {
    //获取code并把code发给后端
    Taro.login({
      success(res){
        if(res.code){
          Taro.request({
            url:'https://rank.muxixyz.com/api/v1/login/',
            data:{
              code:res.code
            },
            method: 'POST',
            success(res){
              //如果200说明已经注册过了只是session过期，那就储存session并且登陆成功
              if(res.statusCode === 200){
                Taro.setStorage({
                  key:'cookie',
                  data: res.header['Set-Cookie']
                })
                if(!Taro.getStorageSync('stdnum') || !Taro.getStorageSync('password')){
                  Taro.redirectTo({
                      url:'../libLogin/libLogin'
                  })
                }
              }
              //否则就跳转到注册界面注册
              if(res.statusCode != 200)
              {
                Taro.redirectTo({
                  url:'../login/login'
                })
              }
            }
          })
        }
      }
    })
  }

  componentDidHide () { }
  
  torankLib(){
    Taro.navigateTo({
      url:'../rankLib/rankLib'
    })
  }
  torankPer(){
    Taro.navigateTo({
      url:'../rankPer/rankPer'
  })
  }
  torankCollege(){
    Taro.navigateTo({
      url:'../rankCollege/rankCollege'
  })
  }
  toMy(){
    Taro.navigateTo({
      url:'../my/my'
    })
  }
  toIndex(){
    Taro.navigateTo({
      url:'../index/index'
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
