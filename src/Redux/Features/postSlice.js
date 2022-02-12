import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPost = createAsyncThunk('post/getPost', async ({ id }) => {
   return await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
});

const postSlice = createSlice({
   name: 'posts',
   initialState: {
      posts: [],
      error: null,
      loading: false,
   },
   extraReducers: {
      [getPost.pending]: (state) => {
         state.loading = true;
      },
      [getPost.fulfilled]: (state, action) => {
         state.loading = false;
         state.posts = [action.payload];
      },
      [getPost]: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
   },
});

export default postSlice.reducer;
