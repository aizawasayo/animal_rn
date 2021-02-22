import { ILogin, LOGIN } from './types';


export const initialState: ILogin = {
	userId: '',
	isLoading: false,
	isLoggedIn: false,
	error: ''
}

export default function login(state = initialState, action: any) {
	switch (action.type) {
		case LOGIN.INIT:
			return {
				...state,
				error: '',
				isLoading: true
			};
		case LOGIN.SUCCESS:
			return {
				...state,
				userId: action.payload,
				isLoading: false,
				isLoggedIn: true
			};
		case LOGIN.ERROR:
			return {
				...state,
				isLoading: false,
				isLoggedIn: false,
				error: action.payload
			};
		case LOGIN.TERMINATE:
			return {
				...state,
				userId: '',
				isLoggedIn: false
			};
		default: {
			return state;
		}
	}
}
