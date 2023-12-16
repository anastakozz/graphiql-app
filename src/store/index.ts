import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './apiSlice';
import editorReducer from './jsonSlice';

const store = configureStore({
  reducer: {
    api: apiReducer,
    editor: editorReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
