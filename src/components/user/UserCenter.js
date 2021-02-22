import React, { useEffect, useState, useRef } from 'react'
import { View, Image, Text, Pressable, ImageBackground } from 'react-native'
import { Icon, WhiteSpace, ActivityIndicator } from '@ant-design/react-native';
import { useRequest } from 'ahooks'
import { useLogin } from '@utils/hook'
import { getUser } from '@api/user'
import { parseTime } from '@utils'
import styles from '@assets/style/user'

const UserCenter = (props) => {
  const { userId } = useLogin() 
  const [isloading, setIsloading] = useState(false) 
  const [userInfo, setUserInfo] = useState({})
  const count = useRef(0) // 竞态处理 /时序控制

  // const { data, loading } = useRequest(() => getUser(userId), {
  //   refreshDeps: [userId],
  // });
  
  const updateData = () => {
    // ... 这里写更新页面的逻辑，一般是重新请求
    console.warn('更新数据')
  }

  useEffect(() => {
    const currentCount = count.current;

    setIsloading(true)
    const getUserInfo = async () => {
      // console.warn('设置了loading')
      const { data } = await getUser(userId)
      //console.warn(currentCount, count.current)
      if(count.current !== currentCount) return
      setIsloading(false)
        
      if(data.startDate) data.startDate = parseTime(data.startDate, '{y}-{m}-{d}')
      setUserInfo(data)
    
    }
    getUserInfo()
    
    return () => { count.current += 1 }  
  }, [props.isUpdate]) // 这个组件在用户登录成功之后挂载，登出后会卸载，不存在根据id变动重新渲染
  // 但有个逻辑是去信息修改页修改成功之后，跳转回User，这时需要重新请求用户数据。
  // 因此，依赖项即是User传的一个参数，在信息修改成功后那个变动的路由参数
  
  // return (
  //   <Text>我拿到了 {userId} {JSON.stringify(userInfo)}</Text>
  // )

  return (
    isloading ? 
    <ActivityIndicator animating={isloading} toast size="large" text="加载中..." /> :
    // <ActivityIndicator size="large" color="#7CB342" /> :
    <View style={styles.container}>
      <WhiteSpace size="lg"></WhiteSpace>
      <View style={styles.userTop}>
        <View style={styles.userTopInfo}>
          <Image source={{uri: `${apiUrl}${userInfo.avatar}`}} style={styles.userAvatar}/>
          <View style={styles.simpleInfo}>
            <Text style={styles.simpleName}>{userInfo.username}</Text>
            <Text style={styles.simpleIntro}>{userInfo.signature ? userInfo.signature : '这个人很懒，什么都没有留下'}</Text>
          </View>
          <Pressable 
            style={styles.editBtn} 
            onPress={() => props.navigation.navigate('UserEdit')}
            // onPress={() => props.navigation.navigate('UserEdit',{update: useForceUpdate})}
          >
              <Icon name="edit"/>
          </Pressable>
        </View>
        <WhiteSpace size="lg"></WhiteSpace>
        <View style={styles.userTopArticle}>
          <View style={styles.userArticle}>
            <Text style={styles.articleNum}>0</Text>
            <Text>已发帖</Text>
          </View>
          <View style={styles.userArticle}>
            <Text style={styles.articleNum}>0</Text>
            <Text>草稿</Text>
          </View>
          <View style={styles.userArticle}>
            <Text style={styles.articleNum}>0</Text>
            <Text>关注</Text>
          </View>
        </View>
      </View>
      <WhiteSpace size="lg"></WhiteSpace>
      <View style={styles.userBtns}>
        <View style={styles.userBtn}>
          <Icon name="star" size="lg" color="#F9A825" />
          <Text style={styles.userBtnText}>收藏</Text>
        </View>
        <View style={styles.userBtn}>
          <Icon name="like" size="lg" color="#D32F2F" />
          <Text style={styles.userBtnText}>赞过</Text>
        </View>
        <View style={styles.userBtn}>
          <Icon name="message" size="lg" color="#7CB342" />
          <Text style={styles.userBtnText}>互动</Text>
        </View>
        <Pressable style={styles.userBtn} onPress={() => props.navigation.navigate('Logout')}>
          <Icon name="setting" size="lg" color="#00ACC1" />
          <Text style={styles.userBtnText}>设置</Text>
        </Pressable>
      </View>
      <WhiteSpace size="lg"></WhiteSpace>
      <View style={styles.userInfo}>
        <ImageBackground source={require('@assets/images/main-bg.jpg')} style={styles.userCard}>
          <Text style={styles.cardSideTop}>————————  PASSPORT  ————————</Text>
          <View style={styles.cardInfoTop}>
            <Image source={{uri: `${apiUrl}${userInfo.avatar}`}} style={styles.cardAvatar}/>
            <View style={styles.cardInfoTopIsland}>
              <Icon name="idcard" color="#1B5E20" size="xs" style={styles.cardIcon}/>
              <Text style={styles.cardInfoTopText}>{userInfo.islandName}</Text>
              <Icon name="environment" color="#D81B60" size="xs" style={styles.cardIcon}/>
              <Text style={styles.cardInfoTopText}>{userInfo.position === 'North' ? '北半球' : '南半球'}</Text>
            </View>
          </View>
          <View style={styles.cardInfoBtm}>
            <Text style={styles.cardInfoIdText}>{userInfo.nickname}</Text>
            <Text style={styles.cardInfoBtmText}>{userInfo.gameId}</Text>
            <Text style={styles.cardInfoBtmText}>{userInfo.signature ? userInfo.signature : '暂无'}</Text>
          </View>
          <View style={styles.cardSideBtm}>
            <Text style={styles.cardSideBtmText}>登记日：{userInfo.startDate}</Text>
            <Text style={styles.cardSideBtmArrow}>{`<<<<<<<<<`}</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  )
}

export default UserCenter