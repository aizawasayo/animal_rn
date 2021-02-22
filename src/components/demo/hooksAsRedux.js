// 使用Hooks代替Redux，计数器示例
import React, { createContext, useContext, useReducer } from 'react';
const CounterContext = createContext()
const CounterContextProvider = props =>{
 
const initialState = { counter: 0 }
const reducer = (state, action) => {
    switch(action.type) {
      case 'ADD_TO_COUNTER': {
        return { ...state, counter: state.counter + action.payload.value }
      }
      default: return state
    }
  }
const [state, dispatch] = useReducer(reducer, initialState)
 
const isPromise = obj => {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
}
const middleware = dispatch => {
  return action => {
    if (isPromise(action.payload)) {
      action.payload.then(v => {
        dispatch({ type: action.type, payload: v });
      });
    } else {
      dispatch(action);
    }
  };
}
return (
    <CounterContext.Provider value={{state, dispatch: middleware(dispatch)}}>
      {props.children}
    </CounterContext.Provider>
  )
}
const Display = () => {
const { state } = useContext(CounterContext)
 return  <h1>{state.counter}</h1>
}
const Increment = () => {
const { dispatch } = useContext(CounterContext)
const asyncCounterInc = async ()  =>  new Promise(resolve => {
      setTimeout(() => {
        resolve({ value : 1});
      }, 1000);
    });
    return (
    <button 
      onClick={() => dispatch({ type: 'ADD_TO_COUNTER', payload: asyncCounterInc() })}>
      Increment
    </button>
  )
}
const Decrement = () => {
  const { dispatch } = useContext(CounterContext)
  return (
    <button 
      onClick={() => dispatch({ type: 'ADD_TO_COUNTER', payload: { value: -1 }})}>
      Decrement
    </button>
  )
}
const App = () => {
  return (
    <CounterContextProvider>
      <Display />
      <Increment  />
      <Decrement  />
    </CounterContextProvider>  
  )
}
export default App