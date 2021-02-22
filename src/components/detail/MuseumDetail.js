import React, { useEffect, useState, useRef } from 'react'
import { View, Text, ScrollView, Dimensions, Pressable, ActivityIndicator } from 'react-native'
import ListItem from '@components/core/ListItem'
import ScaledImage from '@components/core/ScaledImage'
import ImageViewer from '@components/core/ImageViewer'
import { getFish } from '@api/fish'
import { getInsect } from '@api/insect'
import { getHalobios } from '@api/halobios'
import { getFossil } from '@api/fossil'
import { getArtwork } from '@api/artwork'
import styles from '@assets/style/form'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const MuseumDetail = ({ navigation, route }) => {
  const [isloading, setIsloading] = useState(false)
  const [detailInfo, setDetailInfo] = useState(null)
  const [viewer, setViewer] = useState({visible: false, images:[]})
  const { id, type } = route.params
  const count = useRef(0)

  const getApi = (type) => {
    let fun = null
    switch(type) {
      case 'fish':
        fun = getFish
        break
      case 'insect':
        fun = getInsect
        break
      case 'halobios':
        fun = getHalobios
        break
      case 'fossil':
        fun = getFossil
        break
      case 'artwork':
        fun = getArtwork
        break
    }
    return fun
  }

  const showViewer = () => {
    let images = []
    detailInfo.photoSrc.map(pic => {
      images.push({url: apiUrl + pic.src})
    })
    setViewer({
      visible: true,
      images
    })
  }

  const hideViewer = () => {
    setViewer({
      visible: false,
      images: []
    })
  }

  useEffect(() => {
    const currentCount = count.current;
    const getDetail = async () => {
      setIsloading(true)
      const apiFun = getApi(type)
      const result = await apiFun(id)
      if(count.current !== currentCount) return
      if(result.code === 200){
        setIsloading(false)  
        
        let detail = result.data
         
        if(detail.activeTime) { // 出现月份
          const northData = detail.activeTime.north
          const southData = detail.activeTime.south
          let northText = ''
          let southText = ''
          if (northData.includes('全年')) {
            northText = '全年'
          } else {
            northText = northData.join()
          }
          if (southData.includes('全年')) {
            southText = '全年'
          } else {
            southText = southData.join()
          }
          detail.north = northText
          detail.south = southText
        }      
        if(detail.elseCondition) { // 其他出现条件
          let elseData = ''
          const localeData = detail.locale
          const elseCondition = detail.elseCondition
          elseCondition.forEach((e, i) => {
            elseData += '(' + e + ')'
          })
          detail.locale = localeData.join('、') + elseData
        }
        setDetailInfo(detail)
      }
    }
    getDetail()
    return () => { count.current += 1 }  
  },[route.params.id])

  return (
    detailInfo && <ScrollView style={styles.detailContainer}>
      { isloading && <ActivityIndicator color="#9CCC65" />}
      <View style={styles.detailImgContainer}>   
        <ScaledImage
          uri={typeof detailInfo.photoSrc === 'string' ? `${apiUrl}${detailInfo.photoSrc}`: apiUrl + detailInfo.photoSrc[0].src}
          width={styles.detailImg.width}
        /> 
      </View>
      <View style={styles.detailListContainer}>
        <ListItem label="名称" icon={{ name:'pushpin', color:'#29b6f6' }}>
          { detailInfo.name }
        </ListItem> 
        { ( detailInfo.engName || detailInfo.jpnName ) && <ListItem label="其他译名" icon={{ name:'tags', color:'#673ab7' }}>
          {`${detailInfo.engName} , ${detailInfo.jpnName}`}
        </ListItem> }
        { !!detailInfo.realName && <ListItem label="真实名字" icon={{ name:'trademark', color:'#ec407a' }} >
          { detailInfo.realName }
        </ListItem> }
        { !!detailInfo.price && <ListItem label="价格" icon={{ name:'pay-circle', color:'#ffb300' }} >
          { detailInfo.price }
        </ListItem> }
        { !!detailInfo.salePrice && <ListItem label="售出价格" icon={{ name:'shopping-cart', color:'#8BC34A' }} >
          { detailInfo.salePrice }
        </ListItem> }
        { !!detailInfo.size && <ListItem label="尺寸" icon={{ name:'scan', color:'#0277BD' }} >
          { detailInfo.size }
        </ListItem> }
        { ( detailInfo.north || detailInfo.south ) && <ListItem label="出现月份" icon={{name:'calendar', color:'#8BC34A'}}>
          { `北半球  ${detailInfo.north}\n南半球  ${detailInfo.south}` }
        </ListItem> }
        { !!detailInfo.period && <ListItem label="时间段" icon={{name:'clock-circle', color:'#00bcd4'}}>
          { detailInfo.period === '1点-24点' ? '全天' : detailInfo.period }
        </ListItem> }
        { !!detailInfo.locale && <ListItem label="场所" icon={{name:'environment', color:'#cddc39'}}>
          { typeof detailInfo.locale === 'string' ? detailInfo.locale : detailInfo.locale.join('、') }
        </ListItem> }
        { !!detailInfo.shadow && <ListItem label="影子" icon={{name:'yuque', color:'#3f51b5'}}>
          { detailInfo.shadow }
        </ListItem> }
        { !!detailInfo.weatherCondition && <ListItem label="出现条件" icon={{name:'tags', color:'#1DE9B6'}}>
          { detailInfo.weatherCondition }
        </ListItem> }
        { !!detailInfo.unlockCondition &&  <ListItem label="解锁要求" icon={{name:'lock', color:'#ec407a'}}>
          { detailInfo.unlockCondition }
        </ListItem> }
        { !!detailInfo.rarity && <ListItem label="稀有度" icon={{name:'star', color:'#FDD835'}}>
          { detailInfo.rarity }
        </ListItem> }
        { !!detailInfo.introduction && <ListItem label="傅达科普" icon={{name:'book', color:'#009688'}}>
          { detailInfo.introduction }
        </ListItem> }
        { !!detailInfo.hasFake && <ListItem label="赝品鉴别方法" icon={{name:'search', color:'#009688'}}>
          { detailInfo.fakeCharacter }
        </ListItem> }
      </View>
      { type === 'artwork' && <View style={styles.morePicContainer}>
        <Text style={styles.morePicTitle}>全部图片  (长按可查看大图)</Text>
        { detailInfo.photoSrc.length !== 0 && <View style={styles.morePicCont}>
          <Pressable style={styles.morePicSin} onLongPress={showViewer} delayLongPress={200}>
            <ScaledImage uri={apiUrl + detailInfo.photoSrc[0].src} width={styles.moreImg.width}/> 
            <Text style={styles.morePicTxt}>真品</Text>  
          </Pressable>
        { !!detailInfo.hasFake && <Pressable style={styles.morePicSin} onLongPress={showViewer} delayLongPress={200}>
            <ScaledImage uri={apiUrl + detailInfo.photoSrc[1].src} width={styles.moreImg.width}/> 
            <Text style={styles.morePicTxt}>赝品</Text>  
          </Pressable> }
        </View> }
      </View> }
      <ImageViewer visible={viewer.visible} images={viewer.images} closeViewer={hideViewer}/>
    </ScrollView>
  )
}

export default MuseumDetail