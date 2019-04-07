import Taro, { Component } from '@tarojs/taro'
import { View, Image , Label, Checkbox, Input, Button, Text} from '@tarojs/components'
import './my.scss'

export default class My extends Component {
  constructor(){
    super(...arguments);
      this.state = {
        show_qq: '',
        show_stdnum: '',
        booknum: 'booknum',
        likes: '445',
        list: [
          {
            value: '对他人显示学号',
            text: '对他人显示学号',
            checked: this.state.show_stdnum
          },
          {
            value: '对他人显示QQ号',
            text: '对他人显示QQ号',
            checked: this.state.show_qq
          }
        ],
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

  componentDidShow () { }

  componentDidHide () { }
  handleMask(){
    this.setState({
      mask_name: 'unmask',
      content_name: 'cover',
      mask_bg: 'mask_bg_show'
    })
  }
  handleSave(){
    this.setState({
      mask_name: 'mask',
      content_name: 'uncover',
      mask_bg: 'mask_bg_none'
    })
  }
  checkboxChange() {
    console.log('改了')
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
                <View>XXXX</View>
              </View>
              <View className='student-number'>
                <View>学号：</View>
                <View>XXXXXX</View>
              </View>
              <View className='QQnumber'>
                <View>QQ：</View>
                <View>XXXXXXXXX</View>
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
              <View>1000</View>
              <View>？</View>
            </View>
          </View>
          <View className='feedback' >反馈与帮助</View>
        </View>
        <View className={this.state.mask_bg}></View>
        <View className={this.state.mask_name}>
          {this.state.list.map((item, i) => {
            return (  
              <Label className='checkbox_label' for={i} key={i}> 
                <Checkbox 
                  className='checkbox_checkbox' 
                  value={item.value} 
                  checked={item.checked}
                  onChange='checkboxChange'
                >
                {item.text}
                </Checkbox>
              </Label>
            )
          })}
          <View className='inputbox'>
            <Text>QQ号：</Text>
            <Input type='number'></Input>
          </View>
          <Button
            size={this.state.button.size}
            type={this.state.button.type}
            onClick={this.handleSave}
          >
            保存
          </Button>
        </View>
      </View>
    )
  }
}
