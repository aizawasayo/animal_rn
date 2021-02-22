import { useGlobalStore } from 'store';

import bindActions from '@store/bindActions';
import optionReducer from '@store/options';

const { actions } = optionReducer;

const useOptions: any = () => {
	const { state, dispatch } = useGlobalStore();

	// List of Props
	const { options } = state;

	// List of Actions
	const {
		getOptsByApi,
	} = actions;

	// Bind Actions
	const optionsActions = bindActions({
		getOptsByApi,
	}, dispatch);

	return { options, ...optionsActions };
}

export default useOptions;
