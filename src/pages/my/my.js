import Taro, { Component } from '@tarojs/taro'
import { View, Image , Checkbox, Input, Button, Text, CheckboxGroup} from '@tarojs/components'
import './my.scss'

export default class My extends Component {
  constructor(){
    super(...arguments);
      this.state = {
        stdnum:'',
        qq:'',
        name:'',
        username:'',
        show_qq: false,
        show_stdnum: false,
        booknum: '',
        likes: '',
        contribute: '',
        rank:'',
        changename:false,
        url:'',
        button:[{
          text:'保存',
          size:'primary',
          type: '{{mini}}'
        }],
        mask_name: 'mask',
        content_name: 'uncover',
        mask_bg: 'mask-bg-none'
      }
  }
  config = {
    navigationBarTitleText: '我的'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    //获取我的qq、学号、是否显示、借书次数、排名等信息
    var that = this
    Taro.request({
      url:'https://rank.muxixyz.com/api/v1/users/my/info/',
      method:'GET',
      header: {
        'cookie': Taro.getStorageSync('cookie')
      },
      success(res){
        that.setState({
          stdnum: res.data.stdnum,
          show_stdnum: res.data.show_stdnum,
          qq: res.data.qq,
          show_qq: res.data.show_qq,
          booknum: res.data.booknum,
          likes: res.data.likes,
          username: res.data.username,
          contribute: res.data.contribute,
          rank: res.data.rank,
          url: res.data.url
        })
      }
    })
    //获取我的头像url
  }

  componentDidHide () { }
  handleMask(){
    this.setState({
      mask_name: 'unmask',
      content_name: 'cover',
      mask_bg: 'mask_bg_show'
    })
  }
  handleSave(){
    var that = this
    this.setState({
      mask_name: 'mask',
      content_name: 'uncover',
      mask_bg: 'mask_bg_none',
    })
    Taro.request({
      url:'https://rank.muxixyz.com/api/v1/users/my/info/',
      method:'PUT',
      header:{
        'cookie': Taro.getStorageSync('cookie')
      },
      data:{
        qq: that.state.qq,
        show_qq: that.state.show_qq,
        show_stdnum: that.state.show_stdnum,
        username: that.state.name
      },
      success(res){
        console.log('my' + res.statusCode)
        console.log(res)
        if(res.statusCode === 200){
          Taro.showToast({
            title:'编辑成功',
            icon: 'none',
            duration: 1000
          })
        }
        else{
          Taro.showToast({
            title:'编辑失败，请重新尝试',
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  }
  changeShow(e){
    console.log(e.detail.value)
    var arr = e.detail.value
    if(arr.indexOf("qq") > -1){
      this.setState({
        show_qq: true
      })
    }else{
      this.setState({
        show_qq: false
      })
    }
    if(arr.indexOf("stdnum") > -1){
      this.setState({
        show_stdnum: true
      })
    }else{
      this.setState({
        show_stdnum: false
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
    return (
      <View className={this.state.content_name}>
        <View className='content'>
          <Image 
            className='avatar'
            src={this.state.url}
          />
          <View className='top-container'>
            <View className='per-information'>
              <View className='nickname'>
                <Text>昵称：</Text>
                {this.state.changename && <Text>{this.state.name}</Text>}
                {!this.state.changename && <Text>{this.state.username}</Text>}
              </View>
              <View className='student-number'>
                <Text>学号：</Text>
                {this.state.show_stdnum && <Text>{this.state.stdnum}</Text>}
                {!this.state.show_stdnum && <Text>*********</Text>}
              </View>
              <View className='QQnumber'>
                <Text>QQ：</Text>
                {this.state.show_qq && <Text>{this.state.qq}</Text>}
                {!this.state.show_qq && <Text>*********</Text>}
              </View>
              <View 
                className='setting'
                onClick={this.handleMask.bind(this)}
              >
                编辑
              </View>
            </View>
            <View className='top-container-right'>
              <View className='likebox'>
                <Image className='likePhoto' src={require('../../assets/png/like.png')}></Image>
                <Text>{this.state.likes}</Text>
              </View>
            </View>
          </View>
          <View className='data'>
            <View className='book'>
              <Image className='pointPhoto' src={require('../../assets/png/point.png')}></Image>
              <Text className='name'>借书次数：{this.state.booknum}</Text>
            </View>
            <View className='rank'>
              <Image className='pointPhoto' src={require('../../assets/png/point.png')}></Image>
              <Text className='name'>步数排名：{this.state.rank}</Text>
            </View>
            <View className='contribute'>
              <Image className='pointPhoto' src={require('../../assets/png/point.png')}></Image>
              <Text className='name'>学院贡献：{this.state.contribute}</Text>
            </View>
          </View>
          <View className='feedback' onClick={this.goToHelp}>问题与反馈</View>
        </View>
        <View className={this.state.mask_bg}></View>
        <View className={this.state.mask_name}>
          <CheckboxGroup className='left-box' onChange={this.changeShow.bind(this)}>
            <Checkbox className='showqq' checked={this.state.show_qq} value='qq' />
            <Checkbox checked={this.state.show_stdnum} value='stdnum' />
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
              <Text>学号：{this.state.stdnum}</Text>
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
