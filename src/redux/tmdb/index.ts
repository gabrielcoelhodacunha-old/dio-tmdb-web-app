import { createSlice } from '@reduxjs/toolkit';
import { TList, TMovie } from 'common/types';
import { RootState } from '../store';
import * as moviesActions from './movies';
import * as listsActions from './lists';

export interface TMDBState {
	movies: TMovie[];
	lists: TList[];
	status: 'idle' | 'loading' | 'failed';
}

export const { searchMovie } = moviesActions;
export const {
	getLists,
	createList,
	deleteList,
	addMovieToList,
	removeMovieFromList,
} = listsActions;

const initialState: TMDBState = {
	movies: [],
	lists: [],
	status: 'idle',
};

export const tmdbSlice = createSlice({
	name: 'tmdb',
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		[
			searchMovie,
			getLists,
			createList,
			deleteList,
			addMovieToList,
			removeMovieFromList,
		].forEach((action) => {
			builder
				.addCase(action.pending, (state) => {
					state.status = 'loading';
				})
				.addCase(action.rejected, (state) => {
					state.status = 'failed';
				});
		});
		[addMovieToList, removeMovieFromList].forEach((action) => {
			builder.addCase(action.fulfilled, (state) => {
				state.status = 'idle';
			});
		});
		builder
			.addCase(searchMovie.fulfilled, (state, action) => {
				state.status = 'idle';
				state.movies = action.payload;
			})
			.addCase(getLists.fulfilled, (state, action) => {
				state.status = 'idle';
				state.lists = action.payload;
			});
	},
});

export const { reset } = tmdbSlice.actions;

export const selectMovies = (state: RootState) => state.tmdb.movies;
export const selectLists = (state: RootState) => state.tmdb.lists;

export default tmdbSlice.reducer;
