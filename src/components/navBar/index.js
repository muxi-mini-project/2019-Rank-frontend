import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import './index.scss'

export default class NavBar extends Component {

  constructor(props){
    super(props)
    this.state = { 
      currentTab: 0
    }
  }
  
  switchNav(e) {
    var cur = e.target.dataset.index 
    //取事件源组件上的index值, 此处target可以替换成currentTarget（指向当前组件）吗
    if(this.state.currentTab == cur){
      return false
    }else{
      this.setState({
        currentTab:cur
      })
    }
  }  
  render() {
    const { navList } = this.props
    return (
      <View className='nav-title'>
        {navList.map((item, index) => {
          return (
            <View
              className={this.state.currentTab===index?'active':''}
              key={index}
              onClick={this.switchNav.bind(this)}
            >
              {item}
            </View>
          )
        })}
      </View>
    )
  }
}