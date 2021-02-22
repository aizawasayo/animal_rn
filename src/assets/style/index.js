import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  fakeSearchBar: {
    height: 30,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: 'rgb(239, 239, 244)'
  },
  fakeInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 28,
    borderWidth: 1,
    borderColor: 'rgb(221, 221, 221)',
    backgroundColor: 'white',
    borderRadius: 5
  },
  searchIcon: {
    marginLeft: 8,
    marginRight: 8
  },
  fakeKeyWords: {
    flex: 1,
    fontSize: 14,
    color: '#999'
  },
  bannerContainer: {
    height: 180,
    margin: 15,
    // marginBottom: 0,
    overflow: 'hidden',
    borderRadius: 10,
  },
  bannerWrapper: {
    height: 180,
    backgroundColor: '#fff'
  },
  banner: {
    flexGrow: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    width: '100%',
    height: 180,
  },
  bannerImg: {
    width: '100%',
    height: 180
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
  guideItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff'
  },
  guideContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'space-between',
  },
  guideTitle: {
    fontWeight: '500',
    fontSize: 18
  },
  guideType: {
    color: '#80DEEA'
  },
  guideSource: {
    marginLeft: 10,
    color: '#BDBDBD'
  },
  guideImg: {
    width: 120,
    height: 80, 
    marginLeft: 10,
    borderRadius: 5
  },
  guideAvatar: {
    width:20,
    height: 20,
    borderRadius: 20,
  },
  board: {
    width: 300,
  },
  status: {
    width:300,
    marginBottom: 10,
    backgroundColor: 'green'
  },
  statusText: {
    textAlign:'center',
    lineHeight:50,
    fontSize: 26,
  },
  squareBox: {
    width: 300,
    flexDirection: 'row',
    backgroundColor: 'pink',
    flexWrap: 'wrap',
  },
  square: {  
    backgroundColor:'#fff',
    borderWidth:1,
    borderColor: "#ddd",
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems:'center',
  },  
  game: {
    display: 'flex',
    flexDirection: 'row'
  },
  gameInfo: {
    marginLeft: 20
  },
  base: {
    color:'red'
  },
  loginBox: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  login: {
    width: '100%',
  },
  loginItem: {
    height: 60,
    marginVertical: 10,
    paddingVertical: 10
  }
});

export default styles