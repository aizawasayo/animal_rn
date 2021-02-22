import { WhiteSpace } from '@ant-design/react-native';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15
  },
  userTop: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5
  },
  userTopInfo: {
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  userTopArticle: {
    flexDirection: 'row',
  },
  userAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10
  },
  simpleInfo: {
    flex: 1
  },
  simpleName: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },
  simpleIntro: {
    color: '#999'
  },
  editBtn: {
    width: 20
  },
  userArticle: {
    flex: 1,
    alignItems: 'center'
  },
  articleNum: {
    fontSize: 22,
    lineHeight: 30
  },
  userBtns: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    paddingVertical: 20
  },
  userBtn: {
    flex: 1,
    alignItems: 'center'
  },
  userBtnText: {
    lineHeight: 30,
    color: '#666'
  },
  userInfo: {
    backgroundColor: '#aedebf',
    padding: 12,
    // resizeMode: 'cover',
    borderRadius: 10,
    elevation: 5,
    overflow: 'hidden'
  },
  userCard: {
    resizeMode: 'cover',
    borderRadius: 10,
  },
  cardSideTop: {
    backgroundColor: '#faf5dd',
    textAlign: 'center',
    color: '#33691E',
    fontSize: 12,
    lineHeight: 32
  },
  cardSideBtm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#faf5dd',
    height: 32,
    paddingHorizontal: 20,
  },
  cardSideBtmText: {
    color: '#827717',
  },
  cardSideBtmArrow: {
    color: '#827717',
  },
  cardInfoTop: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical:5,
  },
  cardInfoBtm: {
    fontSize: 14,
    paddingHorizontal: 20,
  },
  cardAvatar: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10
  },
  cardInfoTopIsland: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 34,
    borderBottomColor: '#faf5dd',
    borderBottomWidth: 2
  },
  cardInfoTopText: { 
    fontWeight: 'bold',
    fontSize: 15  
  },
  cardIcon: {
    marginLeft: 10,
    marginRight: 3, 
  },
  cardInfoIdText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#655d18',
    lineHeight: 40,
    borderBottomColor: '#faf5dd',
    borderBottomWidth: 2
  },
  cardInfoBtmText: {
    fontSize: 15,
    color: '#827717',
    lineHeight: 35,
    borderBottomColor: '#faf5dd',
    borderBottomWidth: 2
  },
})

export default styles