export interface ILogin {
	userId: string;
	isLoading: boolean;
	isLoggedIn: boolean;
	error: string;
}

export enum LOGIN {
	INIT = 'LOGIN_INIT',
	SUCCESS = 'LOGIN_SUCCESS',
	ERROR = 'LOGIN_ERROR',
	TERMINATE = 'LOGIN_TERMINATE'
}
