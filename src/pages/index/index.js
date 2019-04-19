import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';


export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      // id:'',
      // openid:'',
      // stdnum:'',
      // departemnt_id:'',
      // departemnt_name:'',
      // username:'',
      // qq:'',
      // show_stdnum:'',
      // show_qq:'',
      // booknum:'',
      // likes:''
    }
    
  }
 
  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { 
    Taro.getSetting({
      success(res) {
        if (!res.authSetting['scope.werun']) {
          Taro.authorize({
            scope: 'scope.werun',
            success(){
              Taro.getWeRunData({
                success(res){
                  Taro.request({
                    url: 'http://67.216.199.87:5000/api/v1/werun/',
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
     // 用户已经同意小程序使用微信运动功能，后续调用 Taro.getWeRunData 接口不会弹窗询问
    //  Taro.getWeRunData({
    //   success(res){
    //     Taro.request({
    //       url: 'http://67.216.199.87:5000/api/v1/werun/',
    //       method: 'POST',
    //       data:{
    //         encryptedData: res.encryptedData,
    //         iv: res.iv
    //       },
    //       success(){
    //         console.log('发送微信运动数据成功啦')
    //       }
    //     })
    //   }
    // })
  }
  
  componentDidMount () { }
  
  componentWillUnmount () { }

  componentDidShow () {
    //如果本地没有cookie
    if (!Taro.getStorageSync('cookie')) {
      var that = this
      //获取code并把code发给后端
      Taro.login({
        success(res){
          if(res.code){
            Taro.request({
              url:'http://67.216.199.87:5000/api/v1/login/',
              data:{
                code:res.code
              },
              method: 'POST',
              success(res){
                //如果400说明没有注册需要去注册，跳转页面
                if(res.statusCode === 400){
                  Taro.navigateTo({
                    url:'../login/login'
                  })
                }
                //如果200说明已经注册过了只是session过期，那就储存session并且登陆成功
                else if(res.statusCode === 200){
                  // that.setState({
                  //   id: res.data.id,
                  //   openid: res.data.openid,
                  //   stdnum: res.data.stdnum,
                  //   departemnt_id: res.data.departementid,
                  //   username: res.data.username,
                  //   qq: res.data.qq,
                  //   show_stdnum: res.data.show_stdnum,
                  //   show_qq: res.data.show_qq,
                  //   booknum: res.data.booknum,
                  //   likes: res.data.likes
                  // })
                  Taro.setStorage({
                    key:'cookie',
                    data: res.header['Set-Cookie']
                  })
                }
                else{
                  console.log(res.statusCode)
                }
              }
            })
          }
        }
      })
    }
  }

  componentDidHide () { }
  
  render() {
    return (
      <View className='index'>
        <navigator url='../my/my'>我的</navigator>
        <navigator url='../rankLib/rankLib'>学霸排行榜</navigator>
        <navigator url='../rankPer/rankPer'>运动健将榜</navigator>
        <navigator url='../rankCollege/rankCollege'>学院运动榜</navigator>
        <navigator url='../login/login'>登录</navigator>
        <navigator url='../people/people'>个人展示页面</navigator>
      </View>
    )
  }
}
