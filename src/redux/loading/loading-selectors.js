import { createSelector } from 'reselect';

export const selectLoading = state => state.loading;

export const selectLoadingState = createSelector(
	[selectLoading],
	loading => loading.isLoading,
);
