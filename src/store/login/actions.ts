import { LOGIN } from './types';

import { login, logout } from '@api/user'

function init() {
	return {
		type: LOGIN.INIT
	};
}

function success(userId: string) {
	return {
		type: LOGIN.SUCCESS,
		payload: userId
	};
}

function failed(error: string) {
	return {
		type: LOGIN.ERROR,
		payload: error
	};
}

export function handleLogin(username: string, password: string) {
	return async function (dispatch: any) {
		//dispatch(init());
		try {
			const res = await login({username, password})
			dispatch(success(res.data.user._id))
		} catch (error) {
			dispatch(failed(error.response.data))
		}
	};
}

export function handleLogout() {
	return {
		type: LOGIN.TERMINATE
	};
}
