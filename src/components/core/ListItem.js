import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native'
import { Icon } from '@ant-design/react-native'
import styles from '@assets/style/museum'
 
const ListItem = (props) => {
  const icon = props.icon
  const children = props.children

  if(props.unRender) return null

  return (
    <View style={styles.listItem}>
      <View style={styles.listLabel}>
        { props.icon && <Icon style={styles.labelIcon} name={icon.name} size={icon.size || 18 } color={icon.color} /> }
        <Text style={styles.listLabelText}>{props.label}</Text>
      </View>
      <View style={styles.listContent}>
        <Text style={styles.listContentText}>{ children }</Text>
      </View>
    </View>
  )
}

export default ListItem