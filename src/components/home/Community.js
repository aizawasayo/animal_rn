import React, { useEffect, useState } from 'react';
import { View, Text ,Button } from 'react-native';

const Community = ({ navigation, route }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      e.preventDefault();
      console.warn(navigation, route)
      // navigation.replace('Home',{ screen: 'MuseumScreen',params: {msg:'我是博物馆'}})
      navigation.jumpTo('Community',{msg:'我是社区'})
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(()=> {
    // console.warn(route.params)
    console.warn('社区挂载')
    return () => console.warn('社区卸载')
  },[])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>你好呀{route.params.msg}页</Text>
     <Button
        title="去社区详情页"
        onPress={() => navigation.navigate('MuseumDetail', { data:'嘻嘻嘻👩‍❤️‍👩', title:'社区详情' })}
      />
    </View>
  )
}

export default Community