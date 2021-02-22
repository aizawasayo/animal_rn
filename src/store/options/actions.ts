// 改变options状态(值)的动作/操作
import { OPTIONS } from './types'
import { getOptions } from '@utils/index'


// action 创建函数，只是简单的返回一个 action
function success(options: object) {
	return {
		type: OPTIONS.SUCCESS,
		payload: options
	};
}

function failed(error: any) {
	return {
		type: OPTIONS.ERROR,
		payload: error
	};
}

// export function getOpts(){
// 	return {
// 		type: OPTIONS.GET,
// 	};
// }

export function getOptsByApi() {
	return async function (dispatch: any) {
		try {
			const res = await getOptions();
			// 把 action 创建函数的结果传给 dispatch() 方法即可发起一次 dispatch 过程
			dispatch(success(res));
		} catch (error) {
			dispatch(failed(error));
		}
  }
}