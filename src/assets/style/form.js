import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
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
    alignItems: 'center',
    // width: 100,
  },
  listLabelText:{
    fontSize: 18,
    color: '#8B99A1',
  },
  labelIcon:{
    marginRight: 10
  },
  listContent: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 15
  },
  listArrow: {
    marginLeft: 10
  },
  listContentText: {
    color: '#8B99A1',
    marginLeft: 'auto',
  },
  listInput: {
    borderWidth: 0, 
    textAlign:'right', 
    color: '#8B99A1'
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