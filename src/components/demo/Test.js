import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@ant-design/react-native';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  navigateBtn: {
    flex: 1,
    borderColor: '#F44336',
    backgroundColor: '#F44336'
  },
  toggleBtn: {
    flex: 1,
    borderColor: '#00BCD4',
    backgroundColor: '#00BCD4' 
  },
  countBtn: {
    borderColor: '#7E57C2',
    backgroundColor: '#7E57C2'
  },
  nameBtn: {
    marginVertical: 10,
    borderColor: '#689F38',
    backgroundColor: '#689F38'
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

function ComA(props) {
  useEffect(() => {
    console.warn('effect A1: A组件挂载了') // 第一次挂载（其实是渲染后）执行
    return () => {
      console.warn('effect A1清除了：A组件卸载了')
    }
  },[])
  useEffect(() => {
    console.warn('effec A2: A渲染了')
    return () => {
      console.warn('effec A2清除了')
    }
  })
  useEffect(() => {
    console.warn('effect A3: A组件更新了') // 第一次挂载（其实是渲染后）执行
    return () => {
      console.warn('effect A3清除了')
    }
  },[props.name])
  return (
    <View>
      <Text style={styles.comTitle}>我是{props.name}组件</Text>
    </View>
  )
}

function ComB(props) {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('妞妞')
  // useEffect(() => {
  //   console.warn('effect B1: B组件挂载了') // 第一次挂载（其实是渲染后）执行
  //   return () => {
  //     console.warn('effect B1清除了：B组件卸载了')
  //   }
  // },[])
  // useEffect(() => {
  //   console.warn('effec B2: B组件渲染了') // // 每一次渲染都会执行
  //   return () => {
  //     console.warn('effec B2清除了') // 先渲染
  //   }
  // })
  // useEffect(() => {
  //   console.warn('effect B3: B组件更新了') // 第一次挂载（其实是渲染后）执行
  //   return () => {
  //     console.warn('effect B3清除了')
  //   }
  // },[count])
  return (
    <View style={{ backgroundColor: '#EDE7F6', marginVertical: 20 }}>
      <View style={{ paddingHorizontal: 20}}>
        <Text style={styles.comTitle}>我是{props.name}组件，底色浅紫色</Text>
        <Button style={styles.countBtn} type="primary" onPress={() => setCount(c => c + 1)}>让 count + 1</Button>
        <Button style={styles.nameBtn} type="primary" onPress={() => setName('啵啵')}>改个名字：{name}</Button>
      </View>
      {/* <ComC count={count} name={name} /> */}
    </View>
  )
}

/* 函数组件的总结：

  1. 根据条件动态渲染组件，无论它的useEffect是否有依赖项，每一个都会被触发(根据渲染与否重复以下步骤： A effect -> 清理 A effect )

  2. 初次渲染，useEffect如果有依赖项，即使父组件没有传该属性，useEffect也会执行，接收到的依赖项的值为undefined

  3. useEffect没有依赖项，每次组件数据变化都会执行；依赖项为[]，只在初次渲染后执行，有依赖项则除了组件初次渲染，只在依赖项改变(引用数据类型只浅对比)时执行

  4. 初次 navigate 或 push 导航到某个屏幕，所有useEffect无论是否有依赖项都会被触发(同2.)

  5. 再次 navigate 到一个已经存在于导航栈记录的屏幕，导航栈中历史记录在它之后的组件都会被删除， 对应触发这些已卸载组件所有useEffect的清除阶段。

  6. 而 push 会再次触发这个组件的所有useEffect(同2.) 为复用组件，不再是同一个屏幕。

  7. 按设备回退键，即goBack事件(因为goBack也是删除在目标屏幕历史记录之后的所有屏幕)，会触发当前屏幕组件所有useEffect的清除阶段

  8. props或state的数据改变重新渲染组件时会触发无依赖项或依赖项为改变数据的useEffect
 */


function ComC(props) { 
  useEffect(() => {
    console.warn('effect C1: C组件挂载了') // 第一次挂载（其实是渲染后）执行
    return () => {
      console.warn('effect C1清除了：C组件卸载了')
    }
  },[])

  useEffect(() => {
    console.warn('effect C2: C组件渲染了') // 第一次渲染后 执行
    return () => {
      console.warn('effect C2清除了') // 1. props.count 改变后 第一个执行
    }
  })

  useEffect(() => {
    console.warn('effect C3: count更新了',props.count) // 第一次渲染后 就算没传count，也会执行，count是 undefined
    return () => {
      console.warn('effect C3清除了') // 1. props.count 改变后 第一个执行
    }
  },[props.count])

  return (
    <View style={{marginTop: 10, padding: 20, backgroundColor: '#FCE4EC'}}>
      <Text style={{...styles.comCText, fontSize: 20 }}>我是C组件</Text>
      <Text style={{...styles.comCText, color: '#311B92'}}>B组件传来的数字是{props.count}</Text>
      <Text style={{...styles.comCText, color: '#33691E'}}>我的名字是{props.name}</Text>
    </View>
  )
}

const Test = ({ navigation }) => {
  const [flag, setToggle] = useState(false)
 
  // useEffect(() => {
  //   console.warn('effect App: App组件渲染了') // 每一次渲染后 执行
  //   return () => {
  //     console.warn('effect App清除了')
  //   }
  // })
 
  return (
    <View style={{ height:'100%', backgroundColor: '#F9FBE7' }}>
      <View style={{paddingHorizontal: 20}}>
        <Text style={styles.comTitle}>我是最外层的App组件，底色浅绿色</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button type="primary" style={styles.navigateBtn} onPress={() => navigation.navigate('Test1')}> navigate 去 Test1 </Button>
          <Button type="primary" style={styles.toggleBtn} onPress={() => setToggle(prev => !prev)}>切换显示{flag ? 'B组件': 'A组件' }</Button>
        </View>
      </View>
      { flag ? <ComA name="A"/> : <ComB name="B"/> }
    </View>
  )
}

export default Test