import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
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

const Test = ({ navigation, route }) => {
  useLayoutEffect(() => {
    console.warn('effect Test3 A: Test3组件挂载了') // 第一次挂载（其实是渲染后）执行
    return () => {
      console.warn('effect Test3 A 清除了：Test3组件卸载了')
    }
  },[])


  useEffect(() => {
    // navigation 导航方法 route 当前屏幕的数据
    console.warn('effect Test3 A: Test3组件渲染了') // 每一次渲染后 执行
    return () => {
      console.warn('effect Test3 B 清除了')
    }
  })
 
  return (
    <View style={{ height:'100%', backgroundColor: '#E0F7FA' }}>
      <View style={{paddingHorizontal: 20}}>
        <Text style={styles.comTitle}>我是Test3组件</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button type="primary" style={styles.navigateBtn} onPress={() => navigation.navigate('Test1')}> navigate 去 Test1 </Button>
        </View>
      </View>
    </View>
  )
}

export default Test