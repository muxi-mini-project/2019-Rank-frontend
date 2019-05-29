import Taro, { Component } from '@tarojs/taro'
import { View, Image , Checkbox, Input, Button, Text, CheckboxGroup} from '@tarojs/components'
import './my.scss'
import Fetch from '../../common/require2'

export default class My extends Component {
  constructor(){
    super(...arguments);
      this.state = {
        stdnum:'',
        qq:'',
        name:'',
        username:'',
        showqq: false,
        showStdnum: false,
        booknum: '',
        likes: '',
        contribute: '',
        rank:'',
        changename:false,
        url:'',
        maskName: 'mask',
        contentName: 'uncover',
        maskBg: 'none',
        departmentID: '',
        showReLogin: false
      }
  }
  config = {
    navigationBarTitleText: '我的'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    const { departmentID } = this.state
    //获取我的qq、学号、是否显示、借书次数、排名、头像url等信息
    Fetch('api/v1/users/my/info/').then(data =>{
      this.setState({
        stdnum: data.stdnum,
        showStdnum: data.show_stdnum,
        departmentID: data.department_id, 
        qq: data.qq,
        showqq: data.show_qq,
        booknum: data.booknum,
        likes: data.likes,
        username: data.username,
        contribute: data.contribute,
        rank: data.rank,
        url: data.url
      })
    })
    //游客模式下的用户都在第25个学院，如果判断学院ID为25，那么就显示“学号绑定”
    if(departmentID === 25){
      this.setState({
        showReLogin: true
      })
    }
  }

  componentDidHide () { }
  handleMask(){
    this.setState({
      maskName: 'unmask',
      contentName: 'cover',
      maskBg: 'show'
    })
  }
  handleSave(){
    const { qq, showqq, showStdnum, name } = this.state
    this.setState({
      maskName: 'mask',
      contentName: 'uncover',
      maskBg: 'none',
    })
    Fetch(
      'api/v1/users/my/info/',
      {
        qq: qq,
        show_qq: showqq,
        show_stdnum: showStdnum,
        username: name
      },
      'PUT'
    )
      .then(data =>{
        if(data){
          Taro.showToast({
            title:'编辑成功'
          })
        }
      })
      .then(statusCode =>{
        if(statusCode === 400){
          Taro.showToast({
            title:'昵称或QQ重复，请重新尝试',
            icon: 'none',
            duration: 1000
          })
        }
        if(statusCode === 502 || statusCode === 401){
          Taro.showToast({
            title:'网络错误，请重新尝试',
            icon: 'none',
            duration: 1000
          })
        }
      })
  }
  //是否显示QQ和学号
  changeShow(e){
    var arr = e.detail.value
    if(arr.indexOf("qq") > -1){
      this.setState({
        showqq: true
      })
    }else{
      this.setState({
        showqq: false
      })
    }
    if(arr.indexOf("stdnum") > -1){
      this.setState({
        showStdnum: true
      })
    }else{
      this.setState({
        showStdnum: false
      })
    }
  }
  changeQQNumber(e){
    this.setState({
      qq: e.detail.value
    })
  }
  //更改昵称，changename为true，渲染的时候显示更改过后的昵称而不是微信的昵称
  changename(e){
    this.setState({
      name: e.detail.value,
      changename: true
    })
  }
  //跳转至帮助页面
  goToHelp(){
    Taro.navigateTo({
      url:'../help/help'
    })
  }
  //跳转至“学号绑定”页面，并将头像url和昵称传到该页面
  toReLogin(){
    Taro.navigateTo({
      url:`../visitorlogin/visitorlogin?url=${this.state.url}&username=${this.state.username}`
    })
  }
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
    const {showReLogin, contentName, url, changename, username, name, showStdnum, showqq, stdnum, likes, booknum, rank, contribute, qq, maskBg, maskName} = this.state
    return (
      <View className={contentName}>
        <View className='content'>
          <Image 
            className='avatar'
            src={url}
          />
          <View className='top-container'>
            <View className='per-information'>
              <View className='nickname'>
                <Text>昵称：</Text>
                {changename && <Text>{name}</Text>}
                {!changename && <Text>{username}</Text>}
              </View>
              <View className='student-number'>
                <Text>学号：</Text>
                {showStdnum && <Text>{stdnum}</Text>}
                {!showStdnum && <Text>*********</Text>}
              </View>
              <View className='QQnumber'>
                <Text className='left'>QQ：</Text>
                {showqq && <Text className='right'>{qq}</Text>}
                {!showqq && <Text className='right'>*********</Text>}
                <View className='setting' onClick={this.handleMask.bind(this)}>编辑</View>
              </View>
            </View>
            <View className='top-container-right'>
              <View className='likebox'>
                <Image className='likePhoto' src={require('../../assets/png/like.png')}></Image>
                <Text>{likes}</Text>
              </View>
            </View>
          </View>
          <View className='data'>
            <View className='book'>
              <Image className='pointPhoto' src={require('../../assets/png/book.png')}></Image>
              <Text className='name' onClick={this.torankLib}>借书本数：{booknum}</Text>
            </View>
            <View className='rank'>
              <Image className='pointPhoto' src={require('../../assets/png/sport.png')}></Image>
              <Text className='name' onClick={this.torankPer}>步数排名：{rank}</Text>
            </View>
            <View className='contribute'>
              <Image className='pointPhoto' src={require('../../assets/png/college.png')}></Image>
              <Text className='name' onClick={this.torankCollege}>学院贡献：{contribute}</Text>
            </View>
          </View>
          <View className='feedback' onClick={this.goToHelp}>问题与反馈</View>
          {showReLogin && <View className='feedback' onClick={this.toReLogin.bind(this)}>绑定学号</View>}
          {!showReLogin && <View />}
        </View>
        <View className={maskBg}></View>
        <View className={maskName}>
          <CheckboxGroup className='left-box' onChange={this.changeShow.bind(this)}>
            <Checkbox className='showqq' checked={showqq} value='qq' />
            <Checkbox checked={showStdnum} value='stdnum' />
          </CheckboxGroup>
          <View className='right-box'>
            <View className='input_box'>
              <View className='shownamebox'>
                <Text>昵称：</Text>
                <Input
                  placeholderClass='placeholder'
                  type='text '
                  placeholder='请输入你的昵称'
                  value={name}
                  onInput={this.changename.bind(this)}
                  onChange={this.changename.bind(this)}
                />
              </View>
              <View className='showQQbox'>
                <Text>QQ号：</Text>
                <Input
                  placeholderClass='placeholder'
                  type='number'
                  placeholder='请输入你的QQ号'
                  value={qq}
                  onInput={this.changeQQNumber.bind(this)}
                  onChange={this.changeQQNumber.bind(this)}
                />
              </View>
            </View> 
            <View className='stdnum'>
              <Text>学号：   {stdnum}</Text>
            </View>         
          </View>
          <View className='tips'>*勾选代表对其他人可见</View>
          <Button
            size={this.state.button.size}
            type={this.state.button.type}
            onClick={this.handleSave.bind(this)}
          >
            保存
          </Button>
        </View>
      </View>
    )
  }
}
