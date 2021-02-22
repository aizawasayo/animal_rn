import React, { useState } from 'react';
import { View } from 'react-native';
import Button from '@components/core/Button'
import {  InputItem, List } from '@ant-design/react-native';
import styles from '@assets/style'

const Login = (props) => {
  const [username, setUsername] = useState('aizawasayo')
  const [password, setPassword] = useState('iwnini122900')
  const [usrValid, setUsrValid] = useState({valid: true, text:''})
  const [pswValid, setPswValid] = useState({valid: true, text:''})

  const checkValid = (val, type) => {
    switch(type){
      case 'usr':
        if(val==='') return setUsrValid({valid: false, text: '用户名不能为空!'})
        setUsername(val)
        setUsrValid({valid: true, text:''})
      case 'psw':
        if(val==='') return setUsrValid({valid: false, text: '密码不能为空!'})
        setPassword(val)
        setPswValid({valid: true, text:''})
    }
  }

  return (
    <View style={styles.loginBox}>
      <List style={styles.login}>
        <InputItem
          clear 
          value={username} 
          maxLength={12}
          onChange={value => checkValid(value, 'usr')} 
          placeholder="请输入用户名" 
          error={!usrValid.valid}
          extra={usrValid.text}
          style={styles.loginItem} 
        >
          用户名
        </InputItem>
        <InputItem
          clear 
          type="password" 
          value={password} 
          maxLength={12}
          error={!pswValid.valid}
          extra={pswValid.text}
          onChange={value => checkValid(value, 'psw')} 
          placeholder="请输入密码" 
          style={styles.loginItem} 
        >
          密码
        </InputItem>
        
        <List.Item>
          <Button text="登陆"
            disabled={!pswValid.valid || !usrValid.valid}
            onPress={() => props.goLogin(username, password)}
          />
        </List.Item>
      </List>
    </View>
  )

}

export default Login