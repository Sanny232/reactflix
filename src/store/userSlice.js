import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {config} from "../config";

const initialState = {
	nickname: null,
	email: null,
	age: null,
	loading: true,
	error: null
};

export const login = createAsyncThunk('user/login', async ({email, password}, {dispatch}) => {
		dispatch(setLoading(true));
		axios.post(config.url+'/auth/login', {email,password})
			.then((response) => {
				const user = response.data.user;
				dispatch(setLoading(false));
				dispatch(setCurrentUser({nickname: user.username, email: user.email, age: user.age}));
				localStorage.setItem('token', response.data.jwt_token);
				return response.data;
			})
			.catch(err => {
				alert(err.data.message);
			});
});

export const registration = createAsyncThunk('user/register', async ({email, password,username,age}, {dispatch}) => {
	dispatch(setLoading(true));
	const response = await axios.post(config.url+'/auth/register', {email,password,username,age});
	dispatch(setLoading(false));
	return response.data;
});

export const updateAuth = createAsyncThunk('user/updateAuth', async (token) => {
	const response = await axios.get(config.url+'/profile/me', {headers: {
			'Authorization': `Bearer ${token}`
		}});
	return response.data;
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setCurrentUser: (state, action) => {
			state.nickname = action.payload.nickname;
			state.age = action.payload.age;
			state.email = action.payload.email;
			state.authChecked = true;
		},
		removeCurrentUser: (state, action) => {
			state.nickname = null;
			state.age = null;
			state.email = null;
			state.authChecked = false;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		}
	},
	extraReducers: {
		[updateAuth.fulfilled]: (state, action) => {
			state.age = action.payload.age;
			state.email = action.payload.email;
			state.nickname = action.payload.username;
			state.loading = false;
		},
		[updateAuth.rejected]: (state) => {
			state.loading = false;
		}
	}
});

export const { setCurrentUser, removeCurrentUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
