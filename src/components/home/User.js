import React, { useEffect, useState } from 'react';
import { Button } from '@ant-design/react-native';
import { View, Text } from 'react-native';

const User = ({ navigation, route }) => {

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      e.preventDefault();
      navigation.jumpTo('User',{msg:'我是用户中心'})
    });
    return unsubscribe;
  }, );

  useEffect(()=> {
    // console.warn(route.params)
  })
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>你好呀{route.params.msg}页</Text>
    <Button
        type="primary"
        onPress={() => navigation.navigate('GuideDetail', { data:'哈哈哈😄', title:'用户详情' })}
      >去详情页</Button>
  </View>
  )
}

export default User