import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native'
import { Icon } from '@ant-design/react-native'
import styles from '@components/museum/style'
 
const SortGroup = (props) => {
  const sortList = props.sortList
  const checkSort =  props.sortVal
  const checkKey = Object.keys(checkSort)[0] // 当前选中排序的key
  const checkVal = checkSort[checkKey] // 当前选中排序的值 1 或 -1
  const sortChange = props.sortChange
  return (
    <>
      { sortList.map( item => {
        return (
          <Pressable key={item.text + new Date().getTime()} onPress={() => sortChange(item.value)} style={styles.sortView}>
            <Text style={{color: (checkSort && checkKey === item.value) ? '#80DEEA':'#949494'}}>{item.text}</Text>
              <View style={styles.sortIcon}>
                <Icon name="caret-up" size="6" color={checkKey === item.value && checkVal ===1?'#80DEEA':'#949494'}/>
                <Icon name="caret-down" size="6" color={checkKey === item.value && checkVal ===-1?'#80DEEA':'#949494'}/>
            </View>
          </Pressable>
        )
      }
      )}
    </>
  )
}

export default SortGroup