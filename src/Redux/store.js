import { configureStore } from '@reduxjs/toolkit';
import postSlice from './Features/postSlice';

export const store = configureStore({
   reducer: {
      posts: postSlice,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});
