import * as React from 'react';
import { View, Text } from 'react-native';
import { Button, WhiteSpace } from '@ant-design/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation: { navigate } }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ marginBottom: 10, fontSize: 24 }}>这是App的首页</Text>
      <Button
        type="primary"
        onPress={() =>
          navigate('Profile', { names: ['布伦特', 20, '男'] })
        }
      >去布伦特的资料页</Button>
    </View>
  );
}

function ProfileScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ marginBottom: 10, fontSize: 24 }}>资料页</Text>
      <Text style={{ marginBottom: 10, fontSize: 20 }}>我的资料: </Text>
      <Text style={{ marginBottom: 10, fontSize: 16 }}>{route.params.names[0]}</Text>
      <Text style={{ marginBottom: 10, fontSize: 16 }}>{route.params.names[1]}</Text>
      <Text style={{ marginBottom: 10, fontSize: 16 }}>{route.params.names[2]}</Text>
      <Button type="ghost" onPress={() => navigation.goBack()} >返回</Button>
      <WhiteSpace />
      <Button
        type="primary"
        onPress={() =>
          navigation.replace('Settings', {
            someParam: 'Param',
          })
        }
      >Replace:用设置页替换这一屏</Button>
      <WhiteSpace />
      <Button
        type="ghost"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Settings',
                params: { someParam: 'Param1' },
              },
            ],
          })
        }
      >Reset:重置当前的导航状态为第一个push的路由为设置页</Button>
      <WhiteSpace />
      <Button type="primary" onPress={() => navigation.navigate('Home')} >去首页</Button>
      <WhiteSpace />
      <Button
        type="warning"
        onPress={() => navigation.navigate('Settings', { someParam: 'Param2' })}
      >去设置页</Button>
    </View>
  );
}

function SettingsScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ marginBottom: 10, fontSize: 24 }}>设置页</Text>
      <Text style={{ marginBottom: 10, fontSize: 20 }}>{route.params.someParam}</Text>
      <Button type="primary" onPress={() => navigation.goBack()} >返回</Button>
      <WhiteSpace />
      <Button
        type="warning"
        onPress={() =>
          navigation.navigate('Profile', {
            names: ['布伦特', 30, '女'],
          })
        }
      >去布伦特的资料页</Button>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{title: "首页"}} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{title: "资料页"}} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{title: "设置页"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
