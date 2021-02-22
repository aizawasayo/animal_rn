import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react'

import { IContextProps } from '@store/types'

import { asyncer } from '@store/middlewares'
import rootReducer, { initialState } from '@store/reducers'

const GlobalStore = createContext({} as IContextProps)

// 区分不同功能的state数据，封装hook时使用，如 utils/hook/useLogin.ts
// 避免所有组件都引入 const { state, dispatch } = useContext(GlobalStore)
export const useGlobalStore = () => useContext(GlobalStore)

export default function Provider({ children } : { children: React.ReactNode}) {
	// useReducer的功能是返回state和调度函数
	const [state, dispatchBase] = useReducer(rootReducer, initialState)

	// 调度函数将被我们用来调度actions去更新state

	// 	useCallback将返回一个记忆的回调版本,该版本仅在其中的依赖项更改时才发生更改。

	// 它接受两个参数一个回调函数和一组依赖项并且它返回该记忆版本
	// 通过传递空数组作为第二个参数,每次更改后将返回该函数
	const dispatch = useCallback(asyncer(dispatchBase, state), [])

	return (
		// 在Context传递/共享实际的state和调度函数
		<GlobalStore.Provider value={{ state, dispatch }}>
			{children}
		</GlobalStore.Provider>
	)
}
