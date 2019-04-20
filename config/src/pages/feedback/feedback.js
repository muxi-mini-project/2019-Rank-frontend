import Taro, { Component } from "@tarojs/taro";
import { View, Label, Input, Button, Textarea } from "@tarojs/components";
import Fetch from '../../common/require'

export default class Index extends Component {

    config = {
      navigationBarTitleText: '意见反馈'
    };
  
    state = {
      contact: '',
      content: ''
    };

    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

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
      ).then((res) => {
        console.log(res.data)
        Taro.showToast({
          title: '反馈成功',
          icon: 'success',
          duration: 1000
        })
      })
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
        <View className='feedback'>
          <View className='form'>
            <View>
              <Label>联系方式</Label>
              <Input 
                type='text'
                placeholder='请填写您的QQ号或手机号'
                value={contact}
                onChange={this.onChange.bind(this, "contact")}
              />
            </View>
            <Textarea 
              value={content}
              placeholder='请填写您的意见或建议，同时欢迎加入小程序交流群XXXXXXXXX与我们交流'
              className='text'
              onInput={this.onChange.bind(this, "content")}
            />
            <View>
              <Button onClick={this.submit}>提交</Button>
            </View>
          </View>
        </View>
      )
    }

}