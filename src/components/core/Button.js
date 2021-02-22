import React from 'react'
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
const styles = StyleSheet.create({
  submitBtnPress: {
    marginVertical: 10,
    borderRadius: 5,
    overflow: 'hidden'
  },
  submitBtn: {
    width: '100%',
  },
  submitBtnText: {
    textAlign: 'center',
  },
})
export default (props) => {
  const disabled =  props.disabled || false
  const config = props.styleConfig || {}
  const height = config.height || 50
  const backgroundColor = disabled ? '#ddd' : (config.backgroundColor || '#81C784')
  const color = config.color || 'white'
  const fontSize = config.fontSize || 18
  const underlayColor = config.underlayColor || '#2E7D32'
  
  return (
    <TouchableHighlight onPress={disabled ? null : props.onPress} style={styles.submitBtnPress} underlayColor={underlayColor}>
    <View style={{...styles.submitBtn, height: height, backgroundColor: backgroundColor}}>
      <Text style={{...styles.submitBtnText, color: color, lineHeight: height, fontSize: fontSize}}>{props.text ? props.text : '确定'}</Text>
    </View> 
  </TouchableHighlight>
  )
}