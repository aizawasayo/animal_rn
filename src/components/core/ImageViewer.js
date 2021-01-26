import React , { useState, useEffect } from 'react'
import { Modal, Text } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'

const tipStyle = {
  position: 'absolute',
  width: '100%',
  color: '#F1F8E9', 
  textAlign:'center',
  fontSize:18, 
  lineHeight:200, 
}

const ImagePreview = (props) => {
  return (
    <Modal 
      visible={props.visible} 
      transparent={true} 
      onRequestClose={props.closeViewer}
    >
      <ImageViewer
        imageUrls={props.images} 
        enableSwipeDown={true}
        onSwipeDown={props.closeViewer}
        onDoubleClick={props.closeViewer}
        renderHeader={() => <Text style={tipStyle}>向下滑动或按下设备后退键可关闭预览</Text>}
        backgroundColor="rgba(0,0,0,0.9)"
      />
    </Modal>
  )
}

export default ImagePreview