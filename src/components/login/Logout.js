import React from 'react'
import { View, Button } from 'react-native'
import { useLogin } from '@utils/hook'

const Logout = (props) => {
  const { handleLogout } = useLogin()

  const logout = () => {
    handleLogout()
    props.navigation.goBack()
  } 
  return (
    <View>
      <Button title="退出登录" onPress={logout}></Button>
    </View>
  )
}

export default Logout