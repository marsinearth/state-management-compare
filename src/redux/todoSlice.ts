import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import {TodoProps} from 'src/components/todo';

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

export const todosSelector = todosAdapter.getSelectors(({todos}) => todos);

export const {addTodo, deleteTodo, setTodoDone} = todoSlice.actions;

export default todoSlice.reducer;
