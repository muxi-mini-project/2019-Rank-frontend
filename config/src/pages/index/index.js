import Taro, { Component } from '@tarojs/taro';
import { View, Image , Swiper, SwiperItem} from '@tarojs/components';
import './index.scss';


export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
    } 
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
                  Taro.request({
                    url: 'https://rank.muxixyz.com/api/v1/werun/',
                    method: 'POST',
                    header:{
                      'cookie': Taro.getStorageSync('cookie')
                    },
                    data:{
                      encryptedData: res.encryptedData,
                      iv: res.iv
                    },
                    success(){
                      console.log('发送微信运动数据成功啦')
                    }
                  })
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
    //如果本地没有cookie
    if (!Taro.getStorageSync('cookie')) {
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
                }
                //否则就跳转到注册界面注册
                else{
                  console.log(res.statusCode)
                  Taro.navigateTo({
                    url:'../login/login'
                  })
                }
              }
            })
          }
        }
      })
    }

    if(!Taro.getStorageSync('stdnum') || !Taro.getStorageSync('password')){
      Taro.navigateTo({
          url:'../libLogin/libLogin'
      })
    }
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
        <navigator url='../login/login'>登录</navigator>
        <Swiper
          className='banner'
          onChange={this.toMy}
          display-multiple-items='2'
        >
        <SwiperItem>
          <View className='demo-text-1' onClick={this.toIndex}>首页</View>
        </SwiperItem>
        <SwiperItem>
          <View className='demo-text-2'onClick={this.toMy}>我的</View>
        </SwiperItem>
        </Swiper>
      </View>
    )
  }
}
