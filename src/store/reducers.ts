import itemsReducer from '@store/items';
import loginReducer from '@store/login';
import optionsReducer from '@store/options';

import { IItems } from '@store/items/types';
import { ILogin } from '@store/login/types';
import { IOptions } from '@store/options/types';

import { logger } from '@store/middlewares';

interface IState {
	items: IItems[];
	login: ILogin;
	options: IOptions
}

export const initialState: IState = {
	items: itemsReducer.initialState,
	login: loginReducer.initialState,
	options: optionsReducer.initialState
}

export default function rootReducer(state: IState, action: object) {
	// Receiving previous state here
	const { items, login, options } = state;

	// Receiving current state here
	const currentState = {
		items: itemsReducer.reducer(items, action),
		login: loginReducer.reducer(login, action),
		options: optionsReducer.reducer(options, action)
	};

	// Middlewares
	logger(action, state, currentState);

	return currentState;
}
