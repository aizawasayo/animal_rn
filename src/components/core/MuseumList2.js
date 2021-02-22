import React , { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { Text, Image, View, FlatList, TouchableHighlight, ScrollView } from 'react-native';
import { Button, Icon, WhiteSpace } from '@ant-design/react-native';
import { useBoolean } from 'ahooks'
import { usePrevious, useDeepEffect } from '@utils/hook'
import { isObjectValueEqual, getMonthStr, getChangedSort } from '@utils'
import styles from '@assets/style/museum'
import SortGroup from '@components/core/SortGroup'
import FilterAction from '@components/core/FilterAction'
import FilterGroup from '@components/core/FilterGroup'

const MuseumList = (props, ref) => { 
  const [isloading, setIsloading] = useState(false) // 列表是否正在加载
  const [page, setPage] = useState(1) // 列表请求参数
  const [data, setData] = useState({list: [], total: 0}) // 列表数据
  const pageSize = props.pageSize || 15
  const [sort, setSort] = useState({name: 1}) 
  const [filterOptions, setFilterOptions] = useState([])
  const [filters, setFilters] = useState({})
  const [modalHeight, setModalHeight ] = useState(0)
  const prevSort = usePrevious(sort);
  const { isOnMonth, isGoNextM } = getMonthStr()
  const [modalVisible, { toggle, setFalse }] = useBoolean(false)
  const count = useRef(0)
  
  useImperativeHandle(ref, () => ({ // 暴露给父组件的实例属性or方法
    onRefresh
  }))

  const renderItem = item => {
    return (
      <TouchableHighlight
        underlayColor="#fff"
        onPress={() => {
          props.navigation.navigate('MuseumDetail', {id: item._id, type: props.type})
        }}>
        <View style={styles.item}>   
          <Image
            source={{uri: `${apiUrl}${ typeof item.photoSrc === 'string' ? item.photoSrc : item.photoSrc[0].src}`}}
            style={styles.img}
          />  
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            { props.position && isOnMonth(item.activeTime[props.position]) && 
              <View style={styles.tag}>
                <Icon name="smile" size="mini" color="white" />
                <Text style={styles.tagText}>当前可捉</Text>
              </View>
            }
            { props.position && isGoNextM(item.activeTime[props.position]) && 
              <View style={{...styles.tag, backgroundColor:'#f3715c'}}>
                <Text style={styles.tagText}>次月下线</Text>
              </View>
            }
            {
              item.hasFake && <View style={{...styles.tag, backgroundColor:'#F44336'}}>
                <Icon name="frown" size="mini" color="white" />
              <Text style={styles.tagText}>有赝品</Text>
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

  const filterChange = () => {
    toggle()
  }

  // 加载下一页
  const loadNextPage = (info) => {
    if(isloading || info.distanceFromEnd < 0) return
    const totalPage = Math.ceil(data.total / pageSize)
    if (page + 1 > totalPage || data.total <= pageSize ) { // 如果下一页的页码值大于总页数直接return
      return;
    }
    setPage(prevPage => prevPage + 1);
  };
  
  const sortChange = (sortName) => { // 点击排序组按键
    setFalse()
    const newSort = getChangedSort(sortName, sort)
    props.setSort(newSort)
  }

  const onLayout = (event) => { // 计算自定义modal高度
    setModalHeight(event.nativeEvent.layout.height - 44)
  }

  const resetFilter = () => { // 清空筛选数据
    setFilters({})
  }
  const finishFilter = () => { //
    setFalse()
  }

  const filterChecked = (key, checkVal, list) => {
    setFilterOptions(prevOpt => {
      prevOpt.forEach(item => {
        if(item.key === key){
          item.list = list
        }
      })
      return [...prevOpt]
    })
    setFilters(prevFilter => ({...prevFilter, [key]: checkVal}))
  }

  useDeepEffect(() => {
    if(props.filterOptions && props.filterOptions !== []) {
      let newfilterOptions = props.filterOptions.map(opt => {
        opt.list.map(item => {item.checked = false})
        return {...opt}
      })
      setFilterOptions(newfilterOptions)
    }   
  },[props.filterOptions])

  useDeepEffect(() => {    
    if(isObjectValueEqual(props.sort, sort)) return
    // 传入的props.sort和当前sort不一致时才修改本组件的sort
    const propSortKey = Object.keys(props.sort)[0]
    const sortNameArr = []
    props.sortOptions.forEach(sortItem => {
      sortNameArr.push(sortItem.value)
    })
    if(!sortNameArr.includes(propSortKey)) { // 当下传过来的sort不在列表组件筛选选项里
      const prevS = prevSort ? prevSort : {name: 1} // 保持上一次传来的sort, 如果没有上一次的sort则重置为{name: 1}
      setSort(prevS)
      onRefresh()
    }else{ 
      setSort(props.sort)
      onRefresh()
    }
  },[props.sort]) // 父组件传入的sort变化时

  useDeepEffect(() => {
    const currentCount = count.current;
   
    const getList = async () => { // 获取攻略列表数据
      const query = props.query || ''
      const queryData = { query, page, pageSize, ...filters }
      queryData['sort'] = JSON.stringify(sort)  
      // console.warn(queryData)
      setIsloading(true)

      const result = await props['getList'](queryData)
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
    getList(); 
    
    return () => { count.current += 1 }  
  },[page, sort, filters, props.query])
 
  return (
    <View onLayout={onLayout}>
      <View style={styles.toolbar}>
        <SortGroup sortList={props.sortOptions} sortVal={sort} sortChange={sortChange} />
        <FilterAction name="筛选" filterChange={filterChange} modalVisible={modalVisible}/>
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
        initialNumToRender={pageSize}
      />     
      { modalVisible && <View style={{...styles.filterModal, height: modalHeight}} >
        <View style={{...styles.filterModalView, height: props.modalHeight ? props.modalHeight: 400}}>
          <ScrollView style={styles.modalScrollView}>
            { filterOptions && filterOptions.map(options => 
              <FilterGroup key={options.title + Math.random()} {...options} filterChecked={filterChecked} />   
            )}
             <WhiteSpace size="lg" />
             <WhiteSpace size="lg" />
          </ScrollView>
          <View style={styles.modalBtnView}>
            <TouchableHighlight onPress={resetFilter} style={{...styles.modalBtn}} underlayColor="#E8F5E9">
              <Text style={{...styles.modalBtnText, color:'#333333'}}>重置</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={finishFilter} style={{...styles.modalBtn, backgroundColor: '#81C784'}} underlayColor="#66BB6A">
              <Text style={{...styles.modalBtnText, color:'white'}}>完成</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View> }
      {/* <View style={{...styles.filterModal, height: modalHeight, display: modalVisible ? 'flex' : 'none'}} >
        <ScrollView style={styles.filterModalView}>
          { props.filterOptions && props.filterOptions.map(options => <FilterGroup {...options} /> )}
        </ScrollView>
      </View> */}
    </View>
  )
}

export default forwardRef(MuseumList)