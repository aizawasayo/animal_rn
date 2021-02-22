import React from 'react';
import { View, Text } from 'react-native'
import { Icon } from '@ant-design/react-native'
import styles from '@assets/style/form'

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
        { typeof children === 'string' || typeof children === 'number' ? 
          <Text style={styles.listContentText}>{ children }</Text> : <View>{ children }</View>
        }
      </View>
      { props.arrow && <Icon style={styles.listArrow} name="right" color="#8B99A1"/>}
    </View>
  )
}

export default ListItem