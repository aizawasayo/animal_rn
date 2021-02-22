import { useCallback, useState, useEffect, useRef } from 'react'
const isEqual = require('fast-deep-equal')
//import usePrevious from '@utils/hook/usePrevious'
// import { useForceUpdate } from '@utils/hook/useForceUpdate'
import useItems from '@utils/hook/useItems';
import useLogin from '@utils/hook/useLogin';
import useOptions from '@utils/hook/useOptions'

// 使用上一生命周期的状态值
const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// 强制刷新组件
const useForceUpdate = () => {
  const [_, setState] = useState(0);
  return useCallback(() => {
    setState((num: number): number => num + 1);
  }, []) 
};

interface useEffectFun {
	(): void
}

// 实现 useEffect 深比较依赖项
function useDeepEffect(fn: useEffectFun, deps: Array<any>): void {
  const isFirst = useRef(true);
  const prevDeps = useRef(deps)

  useEffect(() => {
    const isSame = prevDeps.current.every((obj: any, index: number) =>
      isEqual(obj, deps[index])
    )
    if (isFirst.current || !isSame) {
      fn()
    }
    isFirst.current = false
    prevDeps.current = deps
  }, deps)
}

export {
	usePrevious,
	useDeepEffect,
	useForceUpdate,
	useItems,
	useLogin,
	useOptions
};
