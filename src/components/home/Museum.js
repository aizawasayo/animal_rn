import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SearchBar, Tabs } from '@ant-design/react-native';
import { useToggle } from 'ahooks'
import MuseumList from '@components/museum/MuseumList'
import Fish from '@components/museum/Fish'
import Insect from '@components/museum/Insect'
import Halobios from '@components/museum/Halobios'
import Fossil from '@components/museum/Fossil'
import Artwork from '@components/museum/Artwork'
import styles from '@components/museum/style'
import Svg from '@components/core/Svg'
import { set } from 'react-native-reanimated';

const Museum = ({ navigation, route }) => {
  const tabs = [
    { title: '鱼类', value: 'fish', },
    { title: '昆虫', value: 'insect', },
    { title: '海洋生物', value: 'halobios', },
    { title: '化石', value: 'fossil', },
    { title: '艺术品', value: 'artwork', },
  ]
 
  const nameSort =  { text: '名字', value: 'name' }
  const priceSort = { text: '价格', value: 'price' }
  const raritySort = { text: '稀有度', value: 'rarity' }
  const shadowSort = { text: '鱼影大小', value: 'shadow' }
  const sizeSort = { text: '尺寸', value: 'size' }

  const [query, setQuery] = useState('')
  const [currentTab, setCurrentTab] = useState(0) // 当前选中tab
  const [toggleShow, setToggleShow] = useState(true)
  const [position, { toggle }] = useToggle('north', 'south');
  const [sort, setSort] = useState({ name: 1 })
  const listRef = useRef(null)
  
  const listProps = { query, navigation, sort, setSort } // 几个列表组件的共同属性

  const onSearch = query => { 
    setQuery(query);   
  };

  const onCancel = () => {
    setQuery('')
  }

  const tabChange = (tab, index) => {
    if (index === 3 || index === 4) {
      setToggleShow(false)  
    } else {
      setToggleShow(true)
    }
    setCurrentTab(index)
  }

  const tabClick = (tab, index) => {
    if (index === 3 || index === 4) {
      setToggleShow(false)  
    } else {
      setToggleShow(true)
    }
  }
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {    
      e.preventDefault();
      navigation.jumpTo('Museum',{selectedTab:'fish'})
      onCancel()
      //listRef.current.onRefresh()
    });
    return unsubscribe;
  }, [navigation]);
  
  useEffect(()=> {
    if(route.params.selectedTab){
      let currentIndex = tabs.findIndex(item => item.value === route.params.selectedTab)
      setCurrentTab(currentIndex)
    } 
  },[route.params])

  return (
    <>
      <SearchBar      
        value={query}  
        placeholder="请输入名称关键字查找"    
        cancelText={query.query!== '' ? '取消' : '搜索'}   
        onSubmit={query => onSearch(query)}
        onChange={onSearch}  
        onCancel={onCancel}  
        showCancelButton   
      />
      <Tabs 
        tabs={tabs} 
        page={currentTab} 
        animated={false} 
        swipeable={false}
        tabBarActiveTextColor="#80DEEA" 
        tabBarInactiveTextColor="#949494" 
        tabBarUnderlineStyle={{borderBottomColor:'#80DEEA',borderBottomWidth:2}}
        onChange={tabChange}
        onTabClick={tabClick}
      >
        <View style={styles.tabContent}>
          <MuseumList ref={listRef} position={position} {...listProps} sortOptions={[nameSort, priceSort, raritySort]} />
        </View>
        <View style={styles.tabContent}>
          <Insect ref={listRef} position={position} {...listProps} sortOptions={[nameSort, priceSort, raritySort]} />
        </View>
        <View style={styles.tabContent}>
          <Halobios ref={listRef} position={position} {...listProps} sortOptions={[nameSort, priceSort, shadowSort]} />
        </View>
        <View style={styles.tabContent}>
          <Fossil ref={listRef} {...listProps} sortOptions={[nameSort, priceSort]} />
        </View>
        <View style={styles.tabContent}>
          <Artwork ref={listRef} {...listProps} sortOptions={[nameSort, sizeSort]} />
        </View>
      </Tabs>
      { toggleShow && <Pressable onPress={() => toggle()} style={styles.positionToggle}>
        <Svg icon="earth" size="36" style={styles.positionIcon}></Svg>
        <Text style={styles.positionText}>{position === 'north' ? '北' : '南' }</Text>
      </Pressable>
      }
    </>
  )
}

export default Museum