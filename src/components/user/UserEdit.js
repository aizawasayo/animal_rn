import React, { useEffect, useState, useRef } from 'react'
import { View, Text, ScrollView, Pressable, TextInput, Alert } from 'react-native'
import ListItem from '@components/core/ListItem'
import Button from '@components/core/Button'
import { Provider, DatePicker, Picker, ActivityIndicator } from '@ant-design/react-native';
import ScaledImage from '@components/core/ScaledImage'
import ImageViewer from '@components/core/ImageViewer'
import { timestamp, standardTime, parseTime } from '@utils'
import { useGlobalStore } from 'store'; // store的直接使用和调度操作
import { useLogin } from '@utils/hook' // 我们在 utils/hook/useXxx 里封装好了
import { getUser, editUser } from '@api/user'
import styles from '@assets/style/form'

const UserEdit = ({ navigation, route }) => {
  // const { state , dispatch } = useGlobalStore(); // store的直接使用和调度操作
  // const { userInfo } = state; // 直接使用store的state解构赋值
  const { userId } = useLogin();
  const [editInfo, setEditInfo] = useState({})
  const [isloading, setIsloading] = useState(false)
  const [viewer, setViewer] = useState({visible: false, images:[]})
  const count = useRef(0)
  const countSub = useRef(0)

  const positionList = [
    { value: 'North',label: '北半球' },
    { value: 'South',label: '南半球' }
  ]
  const showViewer = () => {
    let images = []
    userInfo.photoSrc.map(pic => {
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

  const editUserInfo = (key, val) => {
    setEditInfo(prevInfo => ({ ...prevInfo, [key]: val}))
  }

  const submitEdit = () => {
    const currentCount = countSub.current;
  
    const doSubmit = async () => { 
      
        // 上传头像：如果avatar和uploadPic都没有， 那就不处理, 使用默认头像
        // 如果 uploadPic 存在表示新上传了，需要覆盖
        // 如果 uploadPic 为 null 则维持原值
        // if (this.uploadPic !== null) {
        //   this.userInfo.avatar = this.uploadPic
        // }
      setIsloading(true)
      let userInfo = { ...editInfo }
      userInfo.startDate = timestamp(editInfo.startDate) 
      const result = await editUser(userId,userInfo)
      if(result.code === 200) {   
        Alert.alert(result.message)
        // route.params.update()
        // navigation.goBack() // 还要刷新
        navigation.navigate('User',{refresh: Math.random()})
      }
      if(countSub.current !== currentCount) return    
      setIsloading(false)
    }
    doSubmit();

    return () => { countSub.current += 1 } 
  }

  useEffect(() => {
    const currentCount = count.current;

    setIsloading(true)
    getUser(userId).then(res => {
      if(count.current !== currentCount) return
      setIsloading(false)
      let info = res.data
      if(info.startDate) info.startDate = parseTime(info.startDate, '{y}-{m}-{d}')
      setEditInfo(info)
    })

    return () => { count.current += 1 }  
  },[])

  return (
    <Provider>
    { isloading ? <ActivityIndicator animating={isloading} toast size="large" text="加载中..." /> : <ScrollView style={styles.detailContainer}>
      <View style={styles.detailListContainer}>
        <ListItem label="头像" icon={{name:'camera', color:'#311B92'}} arrow>
          <ScaledImage
            uri={`${apiUrl}${editInfo.avatar}`}
            width={80}
            style={{borderRadius: 40, marginLeft: 'auto'}}
          /> 
        </ListItem>
        <ListItem label="昵称" icon={{ name:'user', color:'#ec407a' }}>
          <TextInput 
            style={styles.listInput}
            onChangeText={text => editUserInfo('nickname', text)}
            value={editInfo.nickname}
            clearButtonMode="while-editing"
            clearTextOnFocus
          />
        </ListItem> 
        <ListItem label="动森ID" icon={{ name:'key', color:'#cddc39' }}>
          <TextInput 
            style={styles.listInput}
            onChangeText={text => editUserInfo('gameId', text)}
            value={editInfo.gameId}
            keyboardType="decimal-pad"
            maxLength={17}
          />
        </ListItem> 
        <ListItem label="岛屿位置" icon={{name:'global', color:'#29b6f6'}} arrow>
          <Picker
          data={positionList}
          onChange={val => editUserInfo('position', val[0])}
          cols={1}
          value={[editInfo.position]}
          >
            <Text style={styles.listContentText}>{ editInfo.position ? (editInfo.position==='North' ? '北半球': '南半球') :'请选择'}</Text>
          </Picker>
        </ListItem> 
        <ListItem label="登岛日期" icon={{name:'calendar', color:'#8BC34A'}} arrow>
          <DatePicker
            value={editInfo.startDate ? standardTime(editInfo.startDate) : new Date()}
            mode="date"
            defaultDate={new Date()}
            minDate={new Date(2001, 4, 14)}
            maxDate={new Date()}
            onChange={date => editUserInfo('startDate', timestamp(date))}
            format="YYYY-MM-DD"
          >
            <Text style={styles.listContentText}>{parseTime(editInfo.startDate, '{y}-{m}-{d}')}</Text>
          </DatePicker>
        </ListItem> 
        <ListItem label="岛屿名称" icon={{name:'pushpin', color:'#3f51b5'}}>
          <TextInput 
            style={styles.listInput}
            onChangeText={text => editUserInfo('islandName', text)}
            value={editInfo.islandName}
          />
        </ListItem> 
        <ListItem label="个性签名" icon={{name:'pushpin', color:'#FDD835'}}>
          <TextInput 
            style={styles.listInput}
            onChangeText={text => editUserInfo('signature', text)}
            value={editInfo.signature ? editInfo.signature : ''}
            placeholder="请输入"
          />
        </ListItem> 
      </View>
      <Button text="修改" onPress={submitEdit}/>
      {/* <View style={styles.morePicContainer}>
        <Text style={styles.morePicTitle}>全部图片  (长按可查看大图)</Text>
        { userInfo.photoSrc.length !== 0 && <View style={styles.morePicCont}>
          <Pressable style={styles.morePicSin} onLongPress={showViewer} delayLongPress={200}>
            <ScaledImage uri={apiUrl + userInfo.photoSrc[0].src} width={styles.moreImg.width}/> 
            <Text style={styles.morePicTxt}>真品</Text>  
          </Pressable>
        { !!userInfo.hasFake && <Pressable style={styles.morePicSin} onLongPress={showViewer} delayLongPress={200}>
            <ScaledImage uri={apiUrl + userInfo.photoSrc[1].src} width={styles.moreImg.width}/> 
            <Text style={styles.morePicTxt}>赝品</Text>  
          </Pressable> }
        </View> }
      </View>  */}
      <ImageViewer visible={viewer.visible} images={viewer.images} closeViewer={hideViewer}/>
    </ScrollView> }
    </Provider>
  )
}

export default UserEdit