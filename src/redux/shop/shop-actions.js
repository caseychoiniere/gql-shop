import {
	FETCH_COLLECTIONS_ERROR,
	FETCH_COLLECTIONS_FAILURE,
	FETCH_COLLECTIONS_SUCCESS,
	UPDATE_COLLECTIONS,
} from './shop-types';
import { setLoading } from '../loading/loading-actions';
import {
	convertCollectionsSnapShotToMap,
	firestore,
} from '../../firebase/firebase.utils';

export const updateCollections = collectionsMap => ({
	type: UPDATE_COLLECTIONS,
	payload: collectionsMap,
});

export const fetchCollectionsSuccess = collectionsMap => ({
	type: FETCH_COLLECTIONS_SUCCESS,
	payload: collectionsMap,
});

export const fetchCollectionsFailure = errorMessage => ({
	type: FETCH_COLLECTIONS_FAILURE,
	payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
	return dispatch => {
		const collectionRef = firestore.collection(
			'collections',
		);
		dispatch(setLoading());
		collectionRef
			.get()
			.then(snapShot => {
				dispatch(
					fetchCollectionsSuccess(
						convertCollectionsSnapShotToMap(snapShot),
					),
				);
				dispatch(setLoading());
			})
			.catch(error =>
				dispatch(
					fetchCollectionsFailure(error.message),
				),
			);
	};
};

// export const
