import { SET_LOADING } from './loading-types';

const INITIAL_STATE = {
	isLoading: false,
};

const loadingReducer = (
	state = INITIAL_STATE,
	action,
) => {
	switch (action.type) {
		case SET_LOADING: {
			return {
				...state,
				isLoading: !state.isLoading,
			};
		}
		default:
			return state;
	}
};

export default loadingReducer;
