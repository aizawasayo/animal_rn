import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from '@ant-design/react-native';
import { View } from 'react-native';
import GuideList from '@components/core/GuideList'

const SearchGuide = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('') // 关键字
  const pageSize = 7 
  const listRef = useRef(null)

  const onSearch = query => { 
    setQuery(query);   
    listRef.current.onRefresh()
  };

  const onCancel = () => {
    setQuery('')
    listRef.current.onRefresh()
  }

  return (
    <View style={{ flex: 1, height:'100%'}}>
      <SearchBar      
        value={query}  
        placeholder="请输入标题关键字查找"    
        cancelText={query.query!== '' ? '取消' : '搜索'}   
        onSubmit={query => onSearch(query)}
        onChange={onSearch}  
        onCancel={onCancel}  
        showCancelButton   
      />
      <GuideList ref={listRef} query={query} pageSize={pageSize} navigation={navigation}></GuideList>
    </View>
  )
}

export default SearchGuide