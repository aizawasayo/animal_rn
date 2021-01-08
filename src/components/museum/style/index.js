import { WhiteSpace } from '@ant-design/react-native';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContent: {
    height: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#fff'
  },
  emptyList: {
    textAlign: 'center', 
    lineHeight: 50, 
    color:'#BDBDBD'
  },
  separatorLine: {
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    marginLeft: 0,
    marginRight: 0,
  },
  img: {
    width: 40,
    height: 40, 
    marginRight: 10,
  },
  info: {
    flex: 1,
    lineHeight: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    marginRight: 10,
    lineHeight: 50,
    color: '#989898',
    fontSize: 16,
  },
  tag: {
    flexDirection: 'row',
    alignItems: "center",
    marginRight: 5,
    paddingLeft: 6,
    paddingRight: 6,
    height: 22,
    borderRadius: 3,
    elevation: 2,
    backgroundColor: '#FFA726',    
  },
  tagText: {
    marginLeft: 2,
    color: 'white',
    fontSize: 12,
  },
  price: {
    width: 'auto',
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
    backgroundColor: '#FFF8E1',
    borderRadius: 20,
    textAlign: 'center',
  },
  priceNum: {
    color: '#FFA726',
    lineHeight: 30,
  }, 
  positionToggle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    width: 100,
    height: 48,
    bottom: 15,
    right: 10,
    backgroundColor: '#8BC34A',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 30,
    elevation: 5,
  },
  positionIcon:{
    marginLeft: 10,
  },
  positionText:{
    // flex: 1,
    marginLeft: 6,
    lineHeight: 48,
    textAlign: 'center',
    fontSize: 24,
    color: '#fff',
    elevation: 5,
    fontWeight: '600',
  },
  sortWrapper: {
    height: 44,
    backgroundColor: 'white',
    flexDirection:'row',
    borderBottomWidth: 1,
    borderBottomColor:'#dddddd'
  },
  sortView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortIcon:{
    marginLeft: 2
  }
})

export default styles