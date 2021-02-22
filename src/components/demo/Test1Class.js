import React, { Component } from 'react';
import { Button } from '@ant-design/react-native';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  navigateBtn: {
    flex: 1,
    borderColor: '#00BCD4',
    backgroundColor: '#00BCD4' 
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

export default class Test1Class extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.warn('Test1组件挂载了') // 第一次挂载执行
  }

  componentDidUpdate() {
    console.warn('Test1组件更新了')
  }

  componentWillUnmount() {
    console.warn('Test1组件卸载了')
  }

  render() {
    return (
      <View style={{ height:'100%', backgroundColor: '#E8EAF6' }}>
        <View style={{paddingHorizontal: 20}}>
          <Text style={styles.comTitle}>我是Test1组件</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button type="primary" style={styles.navigateBtn} onPress={() => this.props.navigation.navigate('Test2Class')}> navigate 去 Test2 </Button>
          </View>
        </View>
      </View>
    )
  }
}