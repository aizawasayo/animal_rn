import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer, DefaultTheme, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabbar from '@components/core/Tabbar'
// import GuideList from '@components/demo/UseRequest'
import GuideList from '@components/home/SearchGuide'
import GuideDetail from '@components/detail/Guide'

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#81C784',
  },
};

// const myHeader = ({ scene, previous, navigation }) => {
//   const { options } = scene.descriptor;
//   const title =
//     options.headerTitle !== undefined
//       ? options.headerTitle
//       : options.title !== undefined
//       ? options.title
//       : scene.route.name;

//   return (
//     <MyHeader
//       title={title}
//       leftButton={
//         previous ? <MyBackButton onPress={navigation.goBack} /> : undefined
//       }
//       style={options.headerStyle}
//     />
//   );
// };

function MyTitle(props) { // 自定义标题文字组件，替代原来的中间文字组件
  return (
    <Text>{props.props.title}</Text>
  );
}

const setHeaderTitle = (route) => {
  let title = '动森之家'
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Guide';
  if(routeName){
    switch(routeName) {
      case 'Museum':
        title = '博物馆图鉴'
        break
      case 'Community':
        title = '社区'
        break
      case 'Archive':
        title = '图鉴'
        break
      case 'User':
        title = '我的'    
        break
    }
  }
  if(route.params && route.params.title) {
    title = route.params.title
  }
  const screenOptions={
    headerTitleAlign: 'center',
    headerTintColor: 'white',
    headerStyle: { backgroundColor: '#81C784', height: 60 },
    // header: myHeader, // 设置自定义标题栏
    headerTitle: title,
    // headerTitle: (props) => <MyTitle props={{...props, title}} /> // 设置自定义标题文字组件，比如要用到图标或者图片
  }
  return screenOptions
}

const RootStack = createStackNavigator();

const homeScreen = {
  Home: Tabbar,
  GuideList
}
const detailScreens = { // 详情页组
  GuideDetail,
  MuseumDetail: GuideDetail
}

const Routes = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <RootStack.Navigator 
        initialRouteName="Home"
        screenOptions={({ route }) => (setHeaderTitle(route))}
        headerMode="screen"
      >
        {Object.entries({
          // Use the screens normally
          ...homeScreen,
          // Use some screens conditionally based on some condition
          ...detailScreens}).map(([name, component]) => (
          <RootStack.Screen name={name} component={component} key={name} />
        ))}
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default Routes