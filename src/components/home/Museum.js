import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SearchBar, Tabs } from '@ant-design/react-native';
import { useToggle } from 'ahooks'
import { useOptions } from '@utils/hook'
import { getFishes } from '@api/fish'
import { getInsects } from '@api/insect'
import { getHalobiosList } from '@api/halobios'
import { getFossils } from '@api/fossil'
import { getArtworkList } from '@api/artwork'
// import MuseumList from '@components/core/MuseumList'
import MuseumList from '@components/core/MuseumList2'
import styles from '@assets/style/museum'
import Svg from '@components/core/Svg'

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
  const { options } = useOptions()
  const [filterOptions, setFilterOptions] = useState(null)
  const listRef = useRef(null)
  const listProps = { query, navigation, sort, setSort } // 几个列表组件的共同属性

  const onSearch = query => { 
    setQuery(query)
    listRef.current.onRefresh()
  };

  const onCancel = () => {
    setQuery('')
    listRef.current.onRefresh()
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
    if(Object.keys(options).length > 0){
      setFilterOptions(options)
    }
  },[options])

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {    
      e.preventDefault();
      navigation.jumpTo('Museum',{selectedTab:'fish'})
      onCancel()
      //listRef.current.onRefresh()
    });
    return unsubscribe;
  }, [navigation])
  
  useEffect(()=> {
    if(route.params.selectedTab){
      let currentIndex = tabs.findIndex(item => item.value === route.params.selectedTab)
      setCurrentTab(currentIndex)
    } 
  },[route.params.selectedTab])

  return (
    <>
      <SearchBar      
        value={query}  
        placeholder="请输入名称关键字查找"    
        cancelText={query!== '' ? '取消' : '搜索'}   
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
          <MuseumList
            ref={listRef} 
            type="fish" 
            position={position} 
            {...listProps} 
            sortOptions={[nameSort, priceSort, raritySort]} 
            filterOptions={filterOptions && [filterOptions.fishLocale, filterOptions.shadow, filterOptions.fishUnlock, filterOptions.ownStatus]} 
            getList={getFishes} 
          />
        </View>
        <View style={styles.tabContent}>
          <MuseumList
            ref={listRef} 
            type="insect" 
            position={position} 
            {...listProps} 
            sortOptions={[nameSort, priceSort, raritySort]} 
            filterOptions={filterOptions && [filterOptions.insectLocale, filterOptions.shadow, filterOptions.insectUnlock, filterOptions.ownStatus]} 
            getList={getInsects} 
          />
        </View>
        <View style={styles.tabContent}>
          <MuseumList
            ref={listRef} 
            type="halobios" 
            position={position} 
            {...listProps} 
            sortOptions={[nameSort, priceSort, shadowSort]} getList={getHalobiosList}
            filterOptions={filterOptions && [filterOptions.halobiosLocale, filterOptions.halobiosShadow, filterOptions.halobiosUnlock]}
          />
        </View>
        <View style={styles.tabContent}>
          <MuseumList
            ref={listRef} 
            type="fossil" 
            {...listProps} 
            modalHeight={160}
            sortOptions={[nameSort, priceSort]} 
            filterOptions={filterOptions && [filterOptions.collectStatus]}
            getList={getFossils} 
          />
        </View>
        <View style={styles.tabContent}>
          <MuseumList
            ref={listRef} 
            type="artwork" 
            {...listProps} 
            modalHeight={160}
            sortOptions={[nameSort, sizeSort]} getList={getArtworkList} 
            filterOptions={filterOptions && [filterOptions.size, filterOptions.hasFake]}
          />
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