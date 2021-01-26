import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { View, Text, Image, FlatList, TouchableHighlight } from 'react-native';
import { getGuideList } from '@api/guide'
import styles from '@assets/style'

const GuideList = (props, ref) => {
  const [isloading, setIsloading] = useState(false) // 列表是否正在加载
  const [page, setPage] = useState(1) // 列表请求参数
  const [data, setData] = useState({list: [], total: 0}) // 列表数据
  const pageSize= props.pageSize || 6
  const count = useRef(0) // 竞态处理, 在组件卸载之前都会保留我们操作后的count.current的值

  useImperativeHandle(ref, () => ({ // 暴露给父组件的实例属性or方法
    onRefresh
  }))
  const renderItem = item => {
    return (
      <TouchableHighlight
        underlayColor="#fff"
        onPress={() => {// 触发父组件的跳转方法
          props.navigation.navigate('GuideDetail',{id: item._id, title: '攻略详情'})
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

  const renderFooter = () => { 
    const totalPage = Math.ceil(data.total / pageSize)
    if(data.list.length === 0) return <View><Text style={styles.emptyList}>未找到相关信息</Text></View>
    if(isloading) return <View><Text style={styles.emptyList}>正在加载中...</Text></View>
    const noMore = (page + 1 > totalPage || data.total < pageSize ) ? true : false
    return  ( noMore ? (<View><Text style={styles.emptyList}>没有更多了</Text></View> ) : <></> )
  }
  const onRefresh = () => {
    setPage(1);   
  };

  // 加载下一页
  const loadNextPage = (info) => {
    // console.warn(info.distanceFromEnd)
    if(isloading) return
    const totalPage = Math.ceil(data.total / pageSize)
    if (page + 1 > totalPage || data.total <= pageSize ) { // 如果下一页的页码值大于总页数直接return
      return;
    }
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    const currentCount = count.current;
  
    const getGuide = async () => { // 获取攻略列表数据
      const query = props.query || ''
      const queryData = { query, page, pageSize, status: 'published'}
      const sortJson = { 'display_time': 1 }
      const sort = JSON.stringify(sortJson) 
      queryData['sort'] = sort
      setIsloading(true)

      const result = await getGuideList(queryData)
      if(count.current !== currentCount) return // 比如请求参数连续变化5次，那就发送了5个网络请求，我们要保证总是最后一次网络请求有效。也就是经常说的的“竞态处理”或者“时序控制”。
      setIsloading(false)
      
      if(page === 1){ // 第一次请求或刷新数据
        setData({
          list: result.data.records,
          total: result.data.total
        })
      }else{
        setData(prevData => ({
          list: prevData.list.concat(result.data.records),
          total: result.data.total
        }))
      }
    }
    getGuide();

    return () => { count.current += 1 } // effect的清除阶段在每次重新渲染时都会执行
  },[page, props.query]) // 只有攻略请求数据变化才会执行，包括组件挂载的第一次
  // 确保数组中包含了所有外部作用域中会发生变化且在 effect 中使用的变量，否则你的代码会引用到先前渲染中的旧变量。

  return (
    <FlatList
        ref={ref}
        data={data.list}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => renderItem(item)}
        ItemSeparatorComponent={() => <View style={styles.separatorLine} />} //渲染分割线
        onEndReachedThreshold={0.1} // 距离底部还有多远的时候，触发加载更多的事件
        onEndReached={loadNextPage} // 当距离不足 0.1 的时候，触发这个方法，加载下一页数据 
        ListFooterComponent={renderFooter}  
        // initialNumToRender={7}   
        onRefresh={onRefresh}
        refreshing={isloading}
        getItemLayout={(data, index) => (
          {length: 110, offset: 110 * index, index}
        )}
    /> 
  )
}

export default forwardRef(GuideList)