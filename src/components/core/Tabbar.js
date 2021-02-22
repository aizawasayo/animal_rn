import React from 'react';
import { Icon } from '@ant-design/react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

import Guide from '@components/home/Guide'
import Museum from '@components/home/Museum'
import Community from '@components/home/Community'
import Archive from '@components/home/Archive'
import User from '@components/home/User'
// import User from '@components/demo/Test'

const styles = StyleSheet.create({
  tabBarStyle: { 
    position: 'absolute'
  },
  tabStyle: {
    paddingTop: 5,
    paddingBottom:5
  },
  labelStyle: {
    fontSize: 12 
  },
})

const Tab = createBottomTabNavigator();

export default function MyTabs({ navigation, route }) {
  return (
    <Tab.Navigator 
      initialRouteName="User"
      tabBarOptions={{ 
        activeTintColor: '#81C784',
        inactiveTintColor: '#949494',
        keyboardHidesTabBar: true,
        tabStyle: styles.tabStyle,
        labelStyle: styles.labelStyle,
        styles: styles.tabBar,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Guide: 'book',
            Museum: 'bank',
            Community: 'comment',
            Archive: 'picture',
            User: 'user'
          };
          return (
            <Icon name={icons[route.name]} color={color} size={size} />
          );
        },
      })}
    >
      <Tab.Screen
        name="Guide"
        component={Guide}
        options={{
          tabBarLabel: '攻略',
        }}
      />
      <Tab.Screen
        name="Museum"
        component={Museum}
        initialParams={{ title: '博物馆图鉴' }}
        options={{
          tabBarLabel: '博物馆',
        }}
      />
      <Tab.Screen
        name="Community"
        component={Community}
        initialParams={{ title: '社区' }}
        options={{
          tabBarLabel: '社区',
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Archive"
        component={Archive}
        initialParams={{ title: '其他图鉴' }}
        options={{
          tabBarLabel: '图鉴',
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        initialParams={{ title: '我的' }}
        options={{
          tabBarLabel: '我的',
        }}
      />
    </Tab.Navigator>
  );
}