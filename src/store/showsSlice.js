import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {config} from "../config";

const initialState = {
	shows: [],
	favorites: [],
	currentShowInfo: [],
	genres: ['any'],
	status: 'any',
	error: false,
	loading: false,
};

export const fetchShows = createAsyncThunk('shows/fetchShows', async (body) => {
	const response = await axios.post(config.url+'/shows', body);
	return response.data;
});

export const addShowToFav = createAsyncThunk('shows/addShowToFav', async (body, {dispatch}) => {
	const token = localStorage.getItem('token');
	const response = await axios.post(config.url+'/shows/library', body, {headers: {
			'Authorization': `Bearer ${token}`
		}});
	dispatch(setFavoriteShows(response.data.shows));
	return response.data;
});

export const removeShowFromFav = createAsyncThunk('shows/removeShowFromFav', async (id, {dispatch}) => {
	const token = localStorage.getItem('token');
	const response = await axios.delete(config.url+'/shows/library/'+id, {headers: {
			'Authorization': `Bearer ${token}`
		}});
	dispatch(setFavoriteShows(response.data.shows));
	return response.data;
});

export const getFavShows = createAsyncThunk('shows/getFavShows', async (arg=null, {dispatch}) => {
	const token = localStorage.getItem('token');
	dispatch(setLoading(true))
	const response = await axios.get(config.url+'/shows/library', {headers: {
			'Authorization': `Bearer ${token}`
		}});
	dispatch(setFavoriteShows(response.data.shows));
	dispatch(setLoading(false))
	return response.data;
});

export const showsSlice = createSlice({
	name: 'shows',
	initialState,
	reducers: {
		setShows: (state, action) => {
			state.shows = action.payload;
		},
		setStatus: (state, action) => {
			state.status = action.payload;
		},
		setGenres: (state, action) => {
			state.genres = action.payload;
		},
		setFavoriteShows: (state, action) => {
			state.favorites = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchShows.pending, (state, action) => {
			state.loading = true;
			state.error = false;
		});
		builder.addCase(fetchShows.fulfilled, (state, action) => {
			state.shows = action.payload;
			state.loading = false;
		});
		builder.addCase(fetchShows.rejected, (state, action) => {
			state.shows = [];
			state.error = true;
			state.loading = false;
		});
	},
});

export const { setShows, setGenres, setStatus, setFavoriteShows, setLoading } = showsSlice.actions;
export default showsSlice.reducer;
