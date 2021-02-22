import React, { useEffect, useState } from 'react';
import { View, Text ,Button } from 'react-native';

const Archive = ({ navigation, route }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      e.preventDefault();
      // navigation.replace('Home',{ screen: 'MuseumScreen',params: {msg:'我是博物馆'}})
      navigation.jumpTo('Archive',{msg:'我是图鉴'})
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(()=> {
    // console.warn(route.params)
    console.warn('图鉴挂载')
    return () => console.warn('图鉴卸载')
  },[])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>你好呀{route.params.msg}页</Text>
     <Button
        title="去图鉴详情页"
        onPress={() => navigation.navigate('MuseumDetail', { data:'嘻嘻嘻👩‍❤️‍👩', title:'图鉴详情' })}
      />
    </View>
  )
}

export default Archive