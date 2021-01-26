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
  toolbar: {
    height: 44,
    backgroundColor: 'white',
    flexDirection:'row',
    borderBottomWidth: 1,
    borderBottomColor:'#dddddd'
  },
  sortWrapper: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-around'
  },
  sortView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sortIcon: {
    marginLeft: 2
  },
  filterView: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    marginLeft: 3,
    marginRight: 16
  },
  filterModal: {
    position: 'absolute',
    top: 44,
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  filterModalView: {
    height: 400,
    backgroundColor: "white",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5
  },
  modalScrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  modalBtnView: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    borderTopWidth: 1,
    borderTopColor:'#ddd'
  },
  modalBtn: {
    flex: 1,
    width: '50%',
    height: 50,
  },
  modalBtnText: {
    textAlign: 'center',
    lineHeight: 50,
    fontSize: 16
  },
  filterTitle: {
    width: '100%',
    paddingVertical: 10,
    lineHeight: 30,
    textAlign: 'left',
    fontSize: 18,
    color: '#333333'
  },
  filterGroup: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  filterBtn: {
    minWidth: 60,
    height: 30,
    paddingHorizontal: 5,
    marginVertical: 10,
    backgroundColor: '#f7f7f7',
    borderColor: 'transparent'
  },
  filterBtnActive: {
    minWidth: 60,
    height: 30,
    paddingHorizontal: 5,
    marginVertical: 10,
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  filterBtnText: {
    textAlign: 'center',
    lineHeight: 30,
    color: '#666666',
    fontSize: 14,
  },
  filterBtnTextActive: {
    textAlign: 'center',
    lineHeight: 30,
    color: '#43A047',
    fontSize: 14,
  },
  separator: {
    backgroundColor: '#ddd',
    width: 1,
    height: 16,
    marginRight: 16,
  },
  detailContainer: {
    margin: 15,
  },
  detailImgContainer: {
    width: '100%',
    marginBottom: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  detailImg: {
    width: 120,
  },
  detailListContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden'
  },
  listItem: {
    minHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listLabel: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  listLabelText:{
    fontSize: 18,
    color: '#8B99A1',
  },
  labelIcon:{
    marginRight: 10
  },
  listContent: {
    paddingVertical: 10,
    maxWidth: 220
  },
  listContentText: {
    color: '#8B99A1',
  },
  morePicContainer: {
    marginTop: 15,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10
  },
  morePicTitle: {
    fontSize: 18,
    color: '#666666'
  },
  morePicCont: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15
  },
  morePicSin: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  moreImg: {
    width: 150,
  },
  morePicTxt: {
    marginTop: 5,
    textAlign: 'center',
    color: '#888888',
  },
  
})

export default styles