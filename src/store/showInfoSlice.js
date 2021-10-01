import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	info: [],
	activeSeason: 0,
	currentEpisode: {},
	error: false,
	loading: false,
};

export const fetchShowByID = createAsyncThunk(
	'shows/fetchShowByID',
	async (id) => {
		const response = await axios.get(
			`https://api.tvmaze.com/shows/${id}?embed=episodes`
		);
		return response.data;
	}
);
export const fetchEpisode = createAsyncThunk(
	'shows/fetchEpisode',
	async ({id, season, number}, {dispatch}) => {
		const response = await axios.get(
			`https://api.tvmaze.com/shows/${id}/episodebynumber?season=${season}&number=${number}`
		);
		dispatch(setEpisode(response.data));
		dispatch(setLoading(false));
	}
);

export const showInfoSlice = createSlice({
	name: 'shows',
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setInfo: (state, action) => {
			state.info = action.payload;
			state.activeSeason = 0;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
		setActiveSeason: (state, action) => {
			state.activeSeason = action.payload;
		},
		setEpisode: (state, action) => {
			state.currentEpisode = action.payload;
		}
	},
	extraReducers: {
		[fetchShowByID.fulfilled]: (state, action) => {
			state.info = action.payload
		},
	}
});

export const { setInfo, setError, setLoading, setActiveSeason, setEpisode } =
	showInfoSlice.actions;
export default showInfoSlice.reducer;
