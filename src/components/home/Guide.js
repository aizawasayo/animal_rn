import React, { useEffect, useState, useRef } from 'react';
import { Carousel, Icon } from '@ant-design/react-native';
import { View, Text, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { getBannerList } from '@api/banner'
import GuideList from '@components/core/GuideList'
import styles from '@assets/style'

const Guide = (props) => {
  const navigation = props.navigation
  const [loading, setLoading] = useState(true) // 轮播图数据是否加载完成
  const [bannerData, setBannerData] = useState([]) // 轮播图数据
  const listRef = useRef(null)
  
  const getBanner =  async () => { // 获取轮播图数据
    const result = await getBannerList({state: 0})
    // const arrCopy = sourceArr.slice() // 拷贝组件副本
    // const objCopy = Object.assign({}, sourceObj) // 拷贝对象副本
    setBannerData(result.data)
    setLoading(false)
 
  }

  const goLink = (link) => {
    // console.warn(link)
    const idArr = link.split('/')
    if(idArr.includes('guide')) { // 是攻略
      const id = idArr[3]
      navigation.navigate('GuideDetail',{ id })
    }
    if(idArr.includes('halobios')){
      navigation.navigate('Museum',{ selectedTab:'halobios' })
    }
  }

  useEffect(() => {
    getBanner()
  },[]) // 仅在组件挂载时执行

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('tabPress', e => {
      e.preventDefault();
      // navigation.navigate('Museum',{msg:'我是攻略'})
      // navigation.replace('Home',{ screen: 'Guide',params: {msg:'我是攻略'}})
      props.navigation.jumpTo('Guide',{msg:'我是攻略'})
      getBanner()
      listRef.current.onRefresh()
    });
    return unsubscribe;
  });

  return (
    <>
      <TouchableOpacity style={styles.fakeSearchBar} onPress={() => props.navigation.push('GuideList', { title: '攻略' })}>
        <View style={styles.fakeInput}>
          <Icon style={styles.searchIcon} name="search" size="xxs" />
          <Text style={styles.fakeKeyWords}>请输入关键字查找</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.bannerContainer}> 
        { !loading && <Carousel style={styles.bannerWrapper} autoplay infinite autoplayInterval={5000}>
          { bannerData.map(item => {
            return (
              <View key={item._id} style={styles.banner}>
                <TouchableHighlight onPress={() => goLink(item.link)}>
                  <Image source={{uri: apiUrl + item.avatar}} style={styles.bannerImg} />
                </TouchableHighlight>
              </View>
            )
          })
        }  
        </Carousel> }
      </View>
      <GuideList ref={listRef} pageSize={4} navigation={props.navigation}></GuideList>
    </>
  )
}

export default Guide