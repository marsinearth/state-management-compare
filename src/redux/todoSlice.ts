import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import {FilterEnum} from './filterSlice';
import {RootReducer} from './store';
import {TodoProps} from 'src/components/todo';

export const TODO_FILTERS = {
  [FilterEnum.SHOW_ALL]: () => true,
  [FilterEnum.SHOW_ACTIVE]: (todo: TodoProps) => !todo.done,
  [FilterEnum.SHOW_COMPLETED]: (todo: TodoProps) => todo.done,
};

const todosAdapter = createEntityAdapter<TodoProps>();

const todoSlice = createSlice({
  name: 'todos',
  initialState: todosAdapter.getInitialState(),
  reducers: {
    addTodo: todosAdapter.addOne,
    deleteTodo: todosAdapter.removeOne,
    setTodoDone: (state, action: PayloadAction<TodoProps>) => {
      const {id, done} = action.payload;
      todosAdapter.updateOne(state, {id, changes: {done: !done}});
    },
  },
});

export const todosSelector = todosAdapter.getSelectors<RootReducer>(
  ({todos}) => todos,
);

export const {addTodo, deleteTodo, setTodoDone} = todoSlice.actions;

export default todoSlice.reducer;
