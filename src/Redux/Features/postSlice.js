import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPost = createAsyncThunk('post/getPost', async ({ id }) => {
   return await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
});

export const deletePost = createAsyncThunk(
   'post/deletePost',
   async ({ id }) => {
      return await axios.delete(
         `https://jsonplaceholder.typicode.com/posts/${id}`
      );
   }
);

export const createPost = createAsyncThunk(
   'post/createPost',
   async ({ values }) => {
      return await axios.post('https://jsonplaceholder.typicode.com/posts/', {
         title: values.title,
         body: values.body,
      });
   }
);

export const updatePost = createAsyncThunk(
   'post/updatePost',
   async ({ id, body, title }) => {
      return await axios.put(
         `https://jsonplaceholder.typicode.com/posts/${id}`,
         {
            title,
            body,
         }
      );
   }
);

const postSlice = createSlice({
   name: 'posts',
   initialState: {
      posts: [],
      error: null,
      loading: false,
      body: '',
      edit: false,
   },
   reducers: {
      setEdit: (state, action) => {
         state.edit = action.payload.edit;
         state.body = action.payload.body;
      },
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
      [deletePost.pending]: (state) => {
         state.loading = true;
      },
      [deletePost.fulfilled]: (state, action) => {
         state.loading = false;
         state.posts = action.payload;
      },
      [deletePost]: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
      [createPost.pending]: (state) => {
         state.loading = true;
      },
      [createPost.fulfilled]: (state, action) => {
         state.loading = false;
         state.posts = [action.payload];
      },
      [createPost]: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
      [updatePost.pending]: (state) => {
         state.loading = true;
      },
      [updatePost.fulfilled]: (state, action) => {
         state.loading = false;
         state.posts = [action.payload];
      },
      [updatePost]: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
   },
});

export const { setEdit } = postSlice.actions;

export default postSlice.reducer;
