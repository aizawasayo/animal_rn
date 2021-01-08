import React, { useEffect, useState, useRef } from 'react';
import { SearchBar } from '@ant-design/react-native';
import { View, Text, Image, FlatList, TouchableHighlight } from 'react-native';
import { getGuideList } from '@api/guide'
import styles from '@components/home/style'

const GuideList = ({ navigation, route }) => {
  const apiUrl = global.baseUrl // 一般不会变，不是state
  const [isloading, setIsloading] = useState(false) // 列表是否正在加载
  const [guideQuery, setGuideQuery] = useState({ query: '', page: 1 }) // 列表请求参数
  const [guideData, setGuideData] = useState({ list: [], total: 0 }) // 列表数据
  const pageSize = 7 
  const count = useRef(0) // 竞态处理, 在组件卸载之前都会保留我们操作后的count.current的值

  const getGuide = async (currentCount) => { // 获取攻略列表数据
    const queryData = {...guideQuery, pageSize, status: 'published'}
    const sortJson = { 'display_time': 1 }
    const sort = JSON.stringify(sortJson) 
    queryData['sort'] = sort

    setIsloading(true)

    const result = await getGuideList(queryData)
    if(count.current !== currentCount) return // 比如请求参数连续变化5次，那就发送了5个网络请求，我们要保证总是最后一次网络请求有效。也就是经常说的的“竞态处理”或者“时序控制”。
    setIsloading(false)
    setGuideData({
      list: guideData.list.concat(result.data.records),
      total: result.data.total
    })  
  }

  const renderEmpty = () => { // 列表数据为空时显示的
    return (
      <View><Text style={styles.emptyList}>未找到相关信息</Text></View>
    )
  }

  const renderFooter = () => { 
    const totalPage = Math.ceil(guideData.total / pageSize)
    if(guideData.list.length === 0) return <></>
    if(isloading) return <View><Text style={styles.emptyList}>正在加载中...</Text></View>
    const noMore = (guideQuery.page + 1 > totalPage || guideData.total < pageSize ) ? true : false
    return  ( noMore ? (<View><Text style={styles.emptyList}>没有更多了</Text></View> ) : <></> )
  }

  const onChange = query => { 
    setGuideData(prevData => { // 需要使用之前的值，就要用函数式更新
      return {...prevData ,list:[]}
    })
    setGuideQuery({query, page:1});   
  };

  const onRefresh = () => {
    setGuideData(prevData => {
      return {...prevData ,list:[]}
    })
    setGuideQuery({query:'', page:1});   
  };

  const renderItem = item => {
    return (
      <TouchableHighlight
        underlayColor="#fff"
        onPress={() => {
          // navigation.push('GuideDetail',{id: item._id});
        }}>
        <View style={styles.guideItem}>   
          <View style={styles.guideContent}>
            <Text style={styles.guideTitle}>
              <Text style={styles.guideType}>[{item.type}]</Text>{item.title}
            </Text>
            <View style={{flexDirection: "row",}}>
              <Image source={{uri: `${apiUrl}${item.author.avatar}`}} style={styles.guideAvatar} />
              <Text style={styles.guideSource}>{item.author.nickname}</Text>
            </View>
          </View>
          <Image
            source={{uri: `${apiUrl}${item.image_uri}`}}
            style={styles.guideImg}
          />
        </View>
      </TouchableHighlight>
    );
  };

  // 加载下一页
  const loadNextPage = (info) => {
    // console.warn(info.distanceFromEnd)
    if(isloading) return
    const totalPage = Math.ceil(guideData.total / pageSize)
    // 如果下一页的页码值，大于总页数了，直接return
    if (guideQuery.page + 1 > totalPage || guideData.total < pageSize ) {     
      return;
    }
    setGuideQuery(prevQuery => { 
      return {...prevQuery, page: prevQuery.page + 1,};
    });

  };

  useEffect(() => {
    const currentCount = count.current;
    getGuide(currentCount)
    return () => { count.current += 1 } // effect的清除阶段在每次重新渲染时都会执行
  },[guideQuery]) // 只有攻略请求数据变化才会执行，包括组件挂载的第一次
  // 确保数组中包含了所有外部作用域中会发生变化且在 effect 中使用的变量，否则你的代码会引用到先前渲染中的旧变量。

  return (
    <View style={{ flex: 1, height:'100%'}}>
      <SearchBar      
        value={guideQuery.query}  
        placeholder="请输入标题关键字查找"    
        cancelText={guideQuery.query!== '' ? '取消' : '搜索'}   
        onChange={onChange}
        onSubmit={keyword => onChange(keyword)}
        onCancel={onRefresh}  
        showCancelButton   
      />
      <FlatList
        data={guideData.list}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => renderItem(item)}
        ItemSeparatorComponent={() => <View style={styles.separatorLine} />} //渲染分割线
        onEndReachedThreshold={0.1} // 距离底部还有多远的时候，触发加载更多的事件
        onEndReached={loadNextPage} // 当距离不足 0.1 的时候，触发这个方法，加载下一页数据 
        ListEmptyComponent={renderEmpty}  
        ListFooterComponent={renderFooter}  
        // initialNumToRender={7}   
        onRefresh={onRefresh} // 
        refreshing={isloading}
        getItemLayout={(data, index) => (
          {length: 110, offset: 110 * index, index}
        )}
      /> 
    </View>
  )
}

export default GuideList