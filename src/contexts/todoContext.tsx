import {ImmerHook, useImmer} from 'use-immer';
import React, {FC, createContext} from 'react';

import {FilterEnum} from './filterContext';
import {TodoProps} from '../components/todo';

const TODO_FILTERS = {
  [FilterEnum.SHOW_ALL]: () => true,
  [FilterEnum.SHOW_ACTIVE]: (todo: TodoProps) => !todo.done,
  [FilterEnum.SHOW_COMPLETED]: (todo: TodoProps) => todo.done,
};

export type TodoMap = {[id: number]: TodoProps};

type TodoContextState = ImmerHook<TodoMap>;

export const TodoContext = createContext<TodoContextState>([{}, () => {}]);

export const TodoProvider: FC<unknown> = ({children}) => {
  const [todos, setTodos] = useImmer({
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
  });

  return (
    <TodoContext.Provider value={[todos, setTodos]}>
      {children}
    </TodoContext.Provider>
  );
};

export const todoFilter = (todos: TodoProps[], filter: FilterEnum) =>
  todos.filter(TODO_FILTERS[filter]);
