import {combineReducers, configureStore} from '@reduxjs/toolkit';

import filter from './filterSlice';
import todos from './todoSlice';

export type RootReducer = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  todos,
  filter,
});

const preloadedState = {
  todos: {
    ids: [Date.now(), Date.now() + 1],
    entities: {
      [Date.now()]: {
        id: Date.now(),
        value: 'Buy milk',
        done: false,
      },
      [Date.now() + 1]: {
        id: Date.now() + 1,
        value: 'Play with doge',
        done: false,
      },
    },
  },
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
  preloadedState,
});

export default store;
