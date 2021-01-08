import React , { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { Text, Image, View, FlatList, TouchableHighlight } from 'react-native';
import { Icon } from '@ant-design/react-native';
import usePrevious from '@utils/hook/usePrevious'
import { getHalobiosList } from '@api/halobios'
import { isObjectValueEqual, getMonthStr, getChangedSort } from '@utils'
import styles from '@components/museum/style'
import SortGroup from '@components/core/SortGroup'

const Halobios = (props, ref) => { 
  const apiUrl = global.baseUrl 
  const [isloading, setIsloading] = useState(false) // 列表是否正在加载
  const [page, setPage] = useState(1) // 列表请求参数
  const [data, setData] = useState({list: [], total: 0}) // 列表数据
  const pageSize = props.pageSize || 15
  const [sort, setSort] = useState({name: 1}) 
  const prevSort = usePrevious(sort);
  const sortNameArr = ['name','price','shadow']
  const { isOnMonth, isGoNextM } = getMonthStr()
  const count = useRef(0)
  
  useImperativeHandle(ref, () => ({ // 暴露给父组件的实例属性or方法
    onRefresh
  }))

  const renderItem = item => {
    return (
      <TouchableHighlight
        underlayColor="#fff"
        onPress={() => {
          // props.navigation.navigate('guideDetail', {id: item._id})
        }}>
        <View style={styles.item}>   
          <Image
            source={{uri: `${apiUrl}${item.photoSrc}`}}
            style={styles.img}
          />  
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            { 
              isOnMonth(item.activeTime[props.position]) && 
              <View style={styles.tag}>
                <Icon name="smile" size="mini" color="white" />
                <Text style={styles.tagText}>当前可捉</Text>
              </View>
            }
            { 
              isGoNextM(item.activeTime[props.position]) && 
              <View style={{...styles.tag, backgroundColor:'#f3715c'}}>
                <Text style={styles.tagText}>次月下线</Text>
              </View>
            }
          </View>
          <View style={styles.price}><Text style={styles.priceNum}>{item.price}</Text></View>
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

  const sortChange = (sortName) => { // 点击排序组按键
    const newSort = getChangedSort(sortName, sort)
    props.setSort(newSort)
  }

  useEffect(() => {    
    if(isObjectValueEqual(props.sort, sort)) return
    // 传入的props.sort和当前sort不一致时才修改本组件的sort
    const propSortKey = Object.keys(props.sort)[0]
    if(!sortNameArr.includes(propSortKey)) { // 当下传过来的sort不在列表组件筛选选项里
      const prevS = prevSort ? prevSort : {name: 1} // 保持上一次传来的sort, 如果没有上一次的sort则重置为{name: 1}
      setSort(prevS)
    }else{ 
      setSort(props.sort)
    }
  },[props.sort]) // 父组件传入的sort变化时

  useEffect(() => {
    const currentCount = count.current;
  
    const getList= async () => { // 获取攻略列表数据
      const query = props.query || ''
      const queryData = { query, page, pageSize }
      queryData['sort'] = JSON.stringify(sort) 
      setIsloading(true)

      const result = await getHalobiosList(queryData)
      if(count.current !== currentCount) return // 比如请求参数连续变化5次，那就发送了5个网络请求，我们要保证总是最后一次网络请求有效。也就是经常说的的“竞态处理”或者“时序控制”。
      setIsloading(false)
      if(page === 1){ // 第一次请求或刷新数据
        console.warn('page1')
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
    getList();
    
    return () => { count.current += 1 }  
  },[page, sort, props.query])
 
  return (
    <>
      <View style={styles.sortWrapper}>
        <SortGroup sortList={props.sortOptions} sortVal={sort} sortChange={sortChange} />
      </View>
      <FlatList
        ref={ref}
        data={data.list}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => renderItem(item)}
        ItemSeparatorComponent={() => <View style={styles.separatorLine} />} //渲染分割线
        onEndReachedThreshold={0.1} // 距离底部还有多远的时候，触发加载更多的事件
        onEndReached={loadNextPage} // 当距离不足 0.1 的时候，触发这个方法，加载下一页数据 
        ListFooterComponent={renderFooter}  
        onRefresh={onRefresh}
        refreshing={isloading}
        getItemLayout={(data, index) => (
          {length: 51, offset: 51 * index, index}
        )}
        initialNumToRender={10}
      /> 
    </>
  )
}

export default forwardRef(Halobios)