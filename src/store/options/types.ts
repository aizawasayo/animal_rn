// options 结构类型接口
export interface IOptions {
	[key: string]: {
    list: [
      {
        text: string,
        value: any 
      }
    ],
    title: string, 
    filterKey: string,
    mulit: boolean
  };
}

// action 类型常量枚举
export enum OPTIONS {
	// GET = 'OPTIONS_GET',
	SUCCESS = 'OPTIONS_SUCCESS',
	ERROR = 'OPTIONS_ERROR',
}
