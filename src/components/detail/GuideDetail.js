import React, { useEffect, useState } from 'react';

import { View, Text } from 'react-native';

const GuideDetail = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>攻略详情页{ route.params.id }</Text>
  </View>
  )
}

export default GuideDetail