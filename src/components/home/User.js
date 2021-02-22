import React, { useEffect, useState, useReducer } from 'react';
import { useLogin } from '@utils/hook'
import Login from '@components/login/Login'
import UserCenter from '@components/user/UserCenter'

const User = ({ navigation, route }) => {
  const { isLoggedIn, handleLogin, userId } = useLogin() // 返回包含登录信息和方法的一个对象
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  //const [ignored, forceUpdate] = useState(0)

  const goLogin = (username, password) => {
    handleLogin(username, password)
  }

  useEffect(() => {
    if (route.params?.refresh) {
      forceUpdate()
      // forceUpdate(prev => prev +1)
    }
  }, [route.params?.refresh])

  useEffect(() => { 
    // 再注册监听tabPress事件，手动切换到用户tab页
    const unsubscribe = navigation.addListener('tabPress', e => {
      e.preventDefault();
      navigation.jumpTo('User',{msg:'我是用户中心'})
    });
    return unsubscribe; // 每次组件重新渲染后 1.先销毁监听事件
  }); 

  // useEffect(()=> {
  //   // console.warn(isLoggedIn, userId)
  //   //if(userId) setId(userId)
  // },[isLoggedIn, userId])
  return (
   isLoggedIn ? <UserCenter navigation={navigation} isUpdate={ignored}/> : <Login goLogin={goLogin}/>
  //  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //     <Text>{userId}你好呀{route.params.msg}页</Text>
  //      <Button
  //       type="primary"
  //       onPress={() => navigation.navigate('GuideDetail', { data:'哈哈哈😄', title:'用户详情' })}
  //     >去详情页</Button>
  //   </View> 
  )
}

export default User