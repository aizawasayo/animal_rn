import React, {useState, useEffect, useReducer} from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';
import axios from 'axios'

const fetchDataReducer = (state, action) => {
    switch(action.type){
        case 'FETCH_INIT':
            return{
                ...state,
                isLoading: true,
                isError: false
            }
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isErroe: false,
                data: action.payload,
            }
        case 'FETCH_ERROR':
            return {
                ...state,
                isLoading: false,
                isErroe: false,
                data: action.payload,
            }
        default:
            return state;
    }
}

const useDataApi = (initUrl, initData) => {
    const [url, setUrl] = useState(initUrl);
    const [state, dispatch] = useReducer(fetchDataReducer,{
        data: initData,
        isLoading: false,
        isErroe: false
    })
    // 副作用
    useEffect(() => {
        let doCancel = false;
        const fetchData = async () => {
            dispatch({type: 'FETCH_INIT'})
            try{
                const result =  await axios(url);
                if(!doCancel){
                    dispatch({type: 'FETCH_SUCCESS', payload: result.data})
                }
            }catch(error){
                if(!doCancel){
                    dispatch({type: 'FETCH_ERROR'})
                }
            }
        }
        fetchData();
        return ()=>{
            doCancel = true;
        }
    },[url]);

    return [state, setUrl];
}


const demoHooks = () => {
    const [search, setSearch] = useState('react')
    // 初始值
    const [{data, isLoading, isError}, fetchData ] = useDataApi(
        'https://hn.algolia.com/api/v1/search?query=redux',
        {hits: []});
   const _renderItem = ({item}) => {
        return(
            <View style={{height: 50, backgroundColor: '#FFF0F5', borderBottomColor: '#D8BFD8', borderBottomWidth: 1, justifyContent: 'center'}}>
              <Text style={{height: 20, width: 300}}>{item.title}</Text>
            </View>
        )
    };
    const _search = () => {
      fetchData(`https://hn.algolia.com/api/v1/search?query=${search}`)
    }
    return (
        <>
            <TouchableOpacity onPress={_search} style={{height:40}}>
                <View style={{backgroundColor: 'purple', height:40, }}>
                    <Text style={{lineHeight: 40}}>Search React</Text>
                </View>
            </TouchableOpacity>
            {
                isError && <View style={{backgroundColor: 'pink', flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: '#f00', fontSize: 30}}>网络请求出错了...</Text>
                </View>
            }
            {
                isLoading ? <View style={{backgroundColor: 'pink', flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: '#f00', fontSize: 30}}>The Data is Loading ...</Text>
                </View> : <FlatList
                data={data.hits}
                keyExtractor={(item) => item.objectID} 
                renderItem={_renderItem}
            />
            }
        </>
    );
};
export default demoHooks;
