import Taro, { Component } from "@tarojs/taro";
import { View, Input, Button, Textarea } from "@tarojs/components";
import Fetch from '../../common/require';
import './feedback.scss';

export default class Index extends Component {

    config = {
      navigationBarTitleText: '意见反馈'
    };
  
    state = {
      contact: '',
      content: ''
    };

    submit() {
      const { contact, content } = this.state
      if (content === "") {
        Taro.showToast({
          title: '写点什么吧～', 
          icon: 'none'
        })
        return
      }
      if (contact === "") {
        Taro.showToast({
          title: '写点什么吧～', 
          icon: 'none'
        })
        return
      }
      Fetch(
        'api/v1/suggestions/',
        {
          contact,
          content
        },
        'POST'
      ).then(
        Taro.showToast({
          title: '反馈成功',
          icon: 'success',
          duration: 1000
        })
      ).then(
        Taro.switchTab({
          url:`../my/my`
        })
      )
    }
  

    onChange(type, e) {
      const obj = {}
      obj[type] = e.detail.value
      const newState = Object.assign({}, this.state, obj)
      this.setState(newState)
    } 

    render() {
      const { contact, content } = this.state
      return (
        <View 
          className='feedback'
          style={`height:${Taro.getSystemInfoSync().windowHeight}px`}
        >
          <View className='box'>
            <View className='form'>
              <View className='contact'>
                <View className='contact-head'>联系方式</View>
                <Input 
                  type='text'
                  placeholder='请填写您的QQ或手机号'
                  value={contact}
                  onChange={this.onChange.bind(this, "contact")}
                />
              </View>
              <Textarea 
                value={content}
                placeholder='请填写您的意见或建议，同时欢迎加入小程序交流群123456与我们交流'
                className='text'
                onInput={this.onChange.bind(this, "content")}
              />
            </View>
            <View className='button'>
              <Button onClick={this.submit} className='submit'>提交</Button>
            </View>
          </View>
        </View>

      )
    }

}