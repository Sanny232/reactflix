import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {config} from "../config";

const initialState = {
  friends: [],
  requests: [],
  possibleFriends: [],
  loading: false,
  error: false
};

export const loadFriends = createAsyncThunk('friends/loadFriends', async (arg=null, {dispatch}) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(config.url+'/friends/mine', {headers: {
      'Authorization': `Bearer ${token}`
    }});
  dispatch(loadRequests());
  dispatch(findNewFriends());
  return response.data;
});

export const loadRequests = createAsyncThunk('friends/loadRequests', async (arg=null, {dispatch}) => {
  const token = localStorage.getItem('token');
  dispatch(startLoading());
  const response = await axios.get(config.url+'/friends/requests/toMe', {headers: {
      'Authorization': `Bearer ${token}`
    }});
  return response.data;
});

export const removeFriend = createAsyncThunk('friends/removeFriend', async (id, {dispatch}) => {
  const token = localStorage.getItem('token');
  dispatch(startLoading());
  const response = await axios.delete(config.url+`/friends/${id}`, {headers: {
      'Authorization': `Bearer ${token}`
    }});
  dispatch(loadFriends());
  return response.data;
});

export const findNewFriends = createAsyncThunk('friends/findNewFriends', async (arg=null, {dispatch}) => {
  const token = localStorage.getItem('token');
  dispatch(startLoading());
  const response = await axios.post(config.url+'/friends/search', {searchQuery: ''},{headers: {
      'Authorization': `Bearer ${token}`
    }});
  return response.data;
});

export const answerToRequest = createAsyncThunk('friends/answerToRequest', async ({id, answer}, {dispatch}) => {
  const token = localStorage.getItem('token');
  dispatch(startLoading());
  const response = await axios.put(config.url+`/friends/requests/${id}/${answer}`, {},{headers: {
      'Authorization': `Bearer ${token}`
    }});

  dispatch(loadFriends());
  return response.data;
});

export const sendRequest = createAsyncThunk('friends/sendRequest', async (id, {dispatch}) => {
  const token = localStorage.getItem('token');
  dispatch(startLoading());
  const response = await axios.post(config.url+'/friends', {toID: id},{headers: {
      'Authorization': `Bearer ${token}`
    }});
  dispatch(loadFriends());
  return response.data;
});


export const friendsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    startLoading: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    endLoading: (state, action) => {
      state.loading = false;
    }
  },
  extraReducers: {
    [loadFriends.fulfilled]: (state, action) => {
      state.loading = false;
      state.friends = action.payload;
    },
    [loadRequests.fulfilled]: (state, action) => {
      state.loading = false;
      state.requests = action.payload;
    },
    [findNewFriends.fulfilled]: (state, action) => {
      state.possibleFriends = action.payload;
      state.loading = false;
    }
  }
});

export const { setFriends, startLoading } = friendsSlice.actions;
export default friendsSlice.reducer;
