import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
class Homepage extends Component{   
    constructor(){
        super(...arguments);
        this.state = {

        }
    }
    render(){
        return (
            <View> 首页</View>
        )
    }
}
export default Homepage;