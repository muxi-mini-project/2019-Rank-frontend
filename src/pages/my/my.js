import Taro, { Component } from '@tarojs/taro'
import { View, Image , Checkbox, Input, Button, Text, CheckboxGroup} from '@tarojs/components'
import './my.scss'

export default class My extends Component {
  constructor(){
    super(...arguments);
      this.state = {
        stdnum:'',
        qq:'',
        username:'',
        show_qq: false,
        show_stdnum: false,
        booknum: '',
        likes: '',
        contribute: '',
        rank:'',
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
    var that = this
    Taro.request({
      url:'http://67.216.199.87:5000/api/v1/users/my/info/',
      method:'GET',
      header: {
        'cookie': Taro.getStorageSync('cookie')
      },
      success(res){
        that.setState({
          stdnum: res.data.stdnum,
          // show_stdnum: res.data.show_stdnum,
          qq: res.data.qq,
          // show_qq: res.data.show_qq,
          booknum: res.data.booknum,
          likes: res.data.likes,
          username: res.data.username,
          contribute: res.data.contribute,
          rank: res.data.rank
        })
      }
    })
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
      url:'http://67.216.199.87:5000/api/v1/users/my/info/',
      method:'PUT',
      header:{
        'cookie': Taro.getStorageSync('cookie')
      },
      data:{
        qq: that.state.qq,
        show_qq: that.state.show_qq,
        show_stdnum: that.state.show_stdnum
      },
      success(res){
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
  goToHelp(){
    Taro.navigateTo({
      url:'../feedback/feedback'
    })
  }
  render() {
    return (
      <View>
        <View className={this.state.content_name}>
          <Image className='avatar'></Image>
          <View className='top-container'>
            <View className='likebox'>
              <Image className='likePhoto' src={require('../../assets/png/like.png')}></Image>
              <Text>{this.state.likes}</Text>
            </View>
            <View className='per-information'>
              <View className='nickname'>
                <View>昵称：</View>
                <View>{this.state.username}</View>
              </View>
              <View className='student-number'>
                <View>学号：</View>
                {this.state.show_stdnum && <View>{this.state.stdnum}</View>}
                {!this.state.show_stdnum && <View>*********</View>}
              </View>
              <View className='QQnumber'>
                <View>QQ：</View>
                {this.state.show_qq && <View>{this.state.qq}</View>}
                {!this.state.show_qq && <View>*********</View>}
              </View>
            </View>
            <View 
              className='setting'
              onClick={this.handleMask.bind(this)}
            >
              编辑
            </View>
          </View>
          <View className='data'>
            <View className='first-row'>
              <View>借书次数</View>
              <View>步数排名</View>
              <View>学院贡献值</View>
            </View>
            <View className='second-row'>
              <View>{this.state.booknum}</View>
              <View>{this.state.rank}</View>
              <View>{this.state.contribute}</View>
            </View>
          </View>
          <View className='feedback' onClick={this.goToHelp}>反馈与帮助</View>
        </View>
        <View className={this.state.mask_bg}></View>
        <View className={this.state.mask_name}>
          <CheckboxGroup className='checkbox_label' onChange={this.changeShow.bind(this)}>
            <Checkbox checked={this.state.show_qq} value='qq'>对他人显示QQ号</Checkbox>
            <Checkbox checked={this.state.show_stdnum} value='stdnum'>对他人显示学号</Checkbox>
          </CheckboxGroup>
          <View className='inputbox'>
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
