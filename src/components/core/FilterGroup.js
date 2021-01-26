import React, { useState, useEffect } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { Button } from '@ant-design/react-native';
import styles from '@assets/style/museum'

const FilterGroup = (props) => {
  const [filterList, setFilterList] = useState([]) 
  
  const changeFilter = (key, val, mulit, i) => { // 关键值
    // console.warn(props)
    // console.warn(key, val)
    if(mulit) {// 如果允许多选
      setFilterList(prevList => {
        prevList[i].checked = !prevList[i].checked
        return [...prevList]
      })   
    }else{ // 单选则选项互斥，最多只能有一个true
      setFilterList(prevList => { 
        prevList.forEach(item => item.checked = false)
        prevList[i].checked = !prevList[i].checked
        return [...prevList]
      })    
    }

    const checkList = filterList.filter(item => item.checked)
    let checkVal = mulit ? [] : ''
    if(mulit) {
      checkList.forEach(item => {
        checkVal.push(item.value)
      })
    }else{
      checkVal = checkList[0].value 
    }
    props.filterChecked(key, checkVal, filterList)
  }

  useEffect(() => {
    setFilterList(props.list)
  },[])

  return (
    <>
      <Text style={styles.filterTitle}>{props.title}</Text>
      <View style={styles.filterGroup}>
        { filterList.map((item, i) => 
          <TouchableHighlight
            key={item.value + Math.random()}
            onPress={() => changeFilter(props.filterKey, item.value, props.mulit, i)}
            underlayColor="#E8F5E9"
            style={item.checked ? styles.filterBtnActive : styles.filterBtn}
          >
           <Text style={item.checked ? styles.filterBtnTextActive : styles.filterBtnText}>{item.text}</Text>
          </TouchableHighlight>
        )}
      </View>
    </>
  )
}

export default FilterGroup