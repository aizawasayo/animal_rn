import React, { Component } from 'react';
import { Button } from '@ant-design/react-native';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  navigateBtn: {
    borderColor: '#00BCD4',
    backgroundColor: '#00BCD4',
    marginBottom: 10
  },
  toggleBtn: {
    borderColor: '#F44336',
    backgroundColor: '#F44336',
    marginBottom: 10
  },
  comTitle: {
    fontSize: 20,
    lineHeight: 50
  },
  comCText: {
    fontSize: 24,
    lineHeight: 60,
    color: 'black'
  }
})

class ComA extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.warn('A组件挂载了') 
  }
  componentWillUnmount() {
    console.warn('A组件卸载了')
  }
  render(){
    return (
      <View>
        <Text style={styles.comTitle}>我是A组件</Text>
      </View>
    )
  }  
}

class ComB extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.warn('B组件挂载了') 
  }
  componentWillUnmount() {
    console.warn('B组件卸载了')
  }
  render(){
    return (
      <View>
        <Text style={styles.comTitle}>我是B组件</Text>
      </View>
    )
  }  
}

export default class Test2Class extends Component {
  constructor(props) {
    super(props)
    this.state = { name: '妞妞', flag: false }
  }
  componentDidMount() {
    console.warn('Test2组件挂载了') // 第一次挂载执行
  }

  componentDidUpdate() {
    console.warn('Test2组件更新了')
  }

  componentWillUnmount() {
    console.warn('Test2组件卸载了')
  }

  /*
    class组件生命钩子总结：
      1. 挂载：添加到DOM； 卸载：从DOM移除
      2. 初次 navigate 或 push 导航到某个屏幕，触发该屏幕组件的componentDidMount(挂载)
      3. 再次 navigate 到一个已经存在于导航堆栈记录的屏幕，我们回到这个组件的同时导航栈中历史记录在它之后的组件都会卸载(触发componentWillUnmount)。而 push 会在添加再次触发这个组件的挂载（因为push代表复用组件，不再是同一个屏幕）。
      例如，我们当前有一个历史记录为 Home > Profile > Settings 的导航栈，然后我们调用navigate('Home')，当我们回到Home，意味着剩下的屏幕变成 Home 并删除了 Profile 和 Settings屏幕。
      4. 按设备回退键，即goBack事件，会触发当前屏幕组件卸载
      5. 根据条件动态渲染的时候，触发挂载和卸载，参考ComA 和 ComB
      6. props或state的数据改变重新渲染会触发componentDidUpdate
  */
  render() {
    return (
      <View style={{ height:'100%', backgroundColor: '#E8EAF6' }}>
        <View style={{paddingHorizontal: 20}}>
          <Text style={styles.comTitle}>我是Test2组件{this.state.name}</Text>
          <View style={{ justifyContent: 'space-between'}}>
            <Button type="primary" style={styles.navigateBtn} onPress={() => this.props.navigation.navigate('Test1Class')}> navigate 去 Test1 </Button>
            <Button type="primary" style={styles.toggleBtn} onPress={() => this.props.navigation.push('Test1Class')}> push 去 Test1 </Button>
            <Button type="primary" style={styles.navigateBtn} onPress={() => this.setState({name: '啵啵'})}> 改名字 </Button>
            <Button type="primary" style={styles.toggleBtn} onPress={() => this.setState(prevS=>({ flag: !prevS.flag }))}> 切换显示{this.state.flag ? 'B组件': 'A组件' } </Button>
            <Button type="primary" style={styles.navigateBtn} onPress={() => this.props.navigation.navigate('Test3Class')}> navigate 去 Test3 </Button>
          </View>
          { this.state.flag ? <ComA /> : <ComB /> }
        </View>
      </View>
    )
  }
}