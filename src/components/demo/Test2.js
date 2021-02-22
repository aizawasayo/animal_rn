import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
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

const Test = ({ navigation, route }) => {
  const [name,setName] = useState("妞妞")
  useLayoutEffect(() => {
    console.warn('effect Test2 A: Test2组件挂载了') // 第一次挂载（其实是渲染后）执行
    return () => {
      console.warn('effect Test2 A 清除了：Test2组件卸载了')
    }
  },[])

  useEffect(() => {
    // console.warn(navigation, route)
    console.warn('effect Test2 B: Test2组件渲染了') // 每一次渲染后 执行
    return () => {
      console.warn('effect Test2 B清除了')
    }
  })

  useEffect(() => {
    // console.warn(navigation, route)
    console.warn('effect Test2 C: Test2组件更新了') // 每一次渲染后 执行
    return () => {
      console.warn('effect Test2 C清除了')
    }
  },[name])

  
 
  return (
    <View style={{ height:'100%', backgroundColor: '#E8EAF6' }}>
      <View style={{paddingHorizontal: 20}}>
        <Text style={styles.comTitle}>我是Test2组件，名字是 {name}</Text>
        <View style={{ justifyContent: 'space-between'}}>
          <Button type="primary" style={styles.navigateBtn} onPress={() => navigation.navigate('Test1')}> navigate 去 Test1 </Button>
          <Button type="primary" style={styles.toggleBtn} onPress={() => navigation.push('Test1')}> push 去 Test1 </Button>
          <Button type="primary" style={styles.navigateBtn} onPress={() => setName('啵啵')}> 改名字 </Button>
          <Button type="primary" style={styles.toggleBtn} onPress={() => navigation.navigate('Test3')}> navigate 去 Test3 </Button>
          {/* <Button type="primary" style={styles.navigateBtn} onPress={() => navigation.navigate('Test2')}> navigate 去 Test2 </Button>
           */}
        </View>
      </View>
    </View>
  )
}

export default Test