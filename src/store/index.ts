import { combineReducers, configureStore } from '@reduxjs/toolkit';
import apiReducer from './apiSlice';
import editorReducer from './jsonSlice';

const rootReducer = combineReducers({
  api: apiReducer,
  editor: editorReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

const store = setupStore();

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
