import {
	UPDATE_COLLECTIONS,
	FETCH_COLLECTIONS_START,
	FETCH_COLLECTIONS_SUCCESS,
	FETCH_COLLECTIONS_FAILURE,
} from './shop-types';

const INITIAL_STATE = {
	collections: null,
	errorMessage: undefined,
};

const shopReducer = (
	state = INITIAL_STATE,
	action,
) => {
	switch (action.type) {
		case FETCH_COLLECTIONS_SUCCESS: {
			return {
				...state,
				collections: action.payload,
			};
		}
		case FETCH_COLLECTIONS_FAILURE: {
			return {
				...state,
				errorMessage: action.payload,
			};
		}
		default:
			return state;
	}
};

export default shopReducer;
