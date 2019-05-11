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
        maskBg: 'none'
      }
  }
  config = {
    navigationBarTitleText: '我的'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    //获取我的qq、学号、是否显示、借书次数、排名、头像url等信息
    Fetch('api/v1/users/my/info/').then(data =>{
      this.setState({
        stdnum: data.stdnum,
        showStdnum: data.show_stdnum,
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
  changename(e){
    this.setState({
      name: e.detail.value,
      changename: true
    })
  }
  goToHelp(){
    Taro.navigateTo({
      url:'../feedback/feedback'
    })
  }
  render() {
    const {contentName, url, changename, username, name, showStdnum, showqq, stdnum, likes, booknum, rank, contribute, qq, maskBg, maskName} = this.state
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
              <Text className='name'>借书本数：{booknum}</Text>
            </View>
            <View className='rank'>
              <Image className='pointPhoto' src={require('../../assets/png/sport.png')}></Image>
              <Text className='name'>步数排名：{rank}</Text>
            </View>
            <View className='contribute'>
              <Image className='pointPhoto' src={require('../../assets/png/college.png')}></Image>
              <Text className='name'>学院贡献：{contribute}</Text>
            </View>
          </View>
          <View className='feedback' onClick={this.goToHelp}>问题与反馈</View>
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
                  value={this.state.name}
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
                  value={this.state.QQ}
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
