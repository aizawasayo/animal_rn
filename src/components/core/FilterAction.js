import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Modal } from 'react-native'
import { Icon } from '@ant-design/react-native'
import styles from '@assets/style/museum'
 
const FilterAction = (props) => {
  return (
    <Pressable style={styles.filterView} onPress={props.filterChange} >
      <View style={styles.separator}></View>
      <Text style={{color: props.modalVisible ? '#80DEEA':'#949494', fontSize: 15}}>{props.name}</Text>
      <Icon name="filter" size="6" color={props.modalVisible ? '#80DEEA':'#949494'} style={styles.filterIcon}/>
    </Pressable>
  )
}

export default FilterAction