import { OPTIONS, IOptions } from './types';

export const initialState: IOptions = {};

// reduce属于一种高阶函数(函数式编程当中的一个术语)
// 它将其中的回调函数reducer递归应用到数组的所有元素上并返回一个独立的值。
// 它和 Array.prototype.reduce 当中传入的回调函数非常相似
// reducer可以翻译为“折叠器”

// reducer接受state和action 并返回新的state
export default function reducer(state = initialState, action: any) {
	// 根据不同的action.type对state进行不同的操作
	switch (action.type) {
    case OPTIONS.SUCCESS:
			return {
				...state,
				...action.payload,	
			};
		case OPTIONS.ERROR:
			return {
				...state,
				...action.payload
			};
		default: { // 不知道是什么action类型的话则返回默认state
			return state;
		}
	}
}

// 为数组中的每一个元素依次执行回调函数
/* 这里的callback是和reducer非常相似的函数 * arr.reduce(callback, [initialValue]) */
let sum = [0,1,2,3].reduce(function(prev, curr){
	// prev:上一次的值，没有上一次就是初始值
	// curr: 数组中当前被处理的元素
	return prev + curr;
},0);// sum = 6
/* 注意这当中的回调函数 (prev, curr) => prev + curr * 
	与我们redux当中的reducer模型 (previousState, action) => newState 看起来是不是非常相似呢 */
[0,1,2,3,4].reduce((prev, curr) => prev + curr);

// 模拟createStore的源码
const createStore = (reducer: any)=>{
	let state: any;
	let listeners:[] = [];
	
	// 用来返回当前的state
	const getState = () => state;

	// 根据action调用reducer返回新的state并触发listener
	const dispatch = (action: any)=>{
		state = reducer(state, action);
		listeners.forEach((listener: any) => listener());
	};
	/* 这里的subscribe有两个功能  
	* 调用 subscribe(listener) 会使用listeners.push(listener)注册一个listener 
	* 而调用 subscribe 的返回函数则会注销掉listener  */
	const subscribe = (listener: never) => {
		listeners.push(listener);
		return () => {
			listeners:[] = listeners.filter(l => l !== listener);
		};
	};
	return{ getState, dispatch, subscribe };
};

