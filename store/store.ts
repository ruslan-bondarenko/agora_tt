import { configureStore } from '@reduxjs/toolkit';
import {photosSlice} from './slices';

export const store = configureStore({
  reducer: {
    photos: photosSlice,
  }
}); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
