import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import showsReducer from './showsSlice';
import showInfoReducer from './showInfoSlice';
import friendsReducer from './friendsSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		shows: showsReducer,
		showInfo: showInfoReducer,
		friends: friendsReducer
	},
});
